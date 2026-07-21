const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');
const Task = require('../models/Task');
const Message = require('../models/Message');

/**
 * Socket.io namespaces/rooms used:
 *  - `user:<userId>`  -> personal room for direct notifications
 *  - `task:<taskId>`  -> per-task collaborative workspace room (chat + presence)
 */
function initSocket(io) {
  // Authenticate socket connections using the same JWT as REST
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
      if (!token) return next(new Error('Authentication required'));
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error('User not found'));
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    const userId = String(socket.user._id);
    socket.join(`user:${userId}`);

    // Join a task workspace room
    socket.on('workspace:join', async ({ taskId }) => {
      const task = await Task.findById(taskId);
      if (!task) return socket.emit('error', { message: 'Task not found' });

      const isParticipant =
        String(task.poster) === userId || String(task.assignedFreelancer) === userId;
      if (!isParticipant && socket.user.role !== 'admin') {
        return socket.emit('error', { message: 'Not authorized to join this workspace' });
      }

      socket.join(`task:${taskId}`);
      socket.to(`task:${taskId}`).emit('workspace:presence', {
        userId,
        name: socket.user.name,
        status: 'online',
      });
    });

    socket.on('workspace:leave', ({ taskId }) => {
      socket.leave(`task:${taskId}`);
      socket.to(`task:${taskId}`).emit('workspace:presence', {
        userId,
        name: socket.user.name,
        status: 'offline',
      });
    });

    // Real-time chat message (persists to DB, then broadcasts)
    socket.on('workspace:message', async ({ taskId, content, attachments }) => {
      try {
        const task = await Task.findById(taskId);
        if (!task) return socket.emit('error', { message: 'Task not found' });

        const isParticipant =
          String(task.poster) === userId || String(task.assignedFreelancer) === userId;
        if (!isParticipant) return socket.emit('error', { message: 'Not authorized' });

        const message = await Message.create({
          task: taskId,
          sender: userId,
          content: content || '',
          attachments: attachments || [],
          readBy: [userId],
        });
        const populated = await message.populate('sender', 'name avatarUrl');

        io.to(`task:${taskId}`).emit('workspace:message', populated);

        // Notify the other participant if they're not in the room (offline push)
        const recipientId = String(task.poster) === userId ? task.assignedFreelancer : task.poster;
        if (recipientId) {
          io.to(`user:${recipientId}`).emit('notification:preview', {
            type: 'new_message',
            taskId,
            preview: content ? content.slice(0, 120) : 'Sent an attachment',
          });
        }
      } catch (err) {
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Typing indicator
    socket.on('workspace:typing', ({ taskId, isTyping }) => {
      socket.to(`task:${taskId}`).emit('workspace:typing', {
        userId,
        name: socket.user.name,
        isTyping,
      });
    });

    socket.on('disconnect', () => {
      // Presence cleanup happens naturally as rooms are left on disconnect
    });
  });
}

module.exports = initSocket;
