const Notification = require('../models/Notification');

let ioInstance = null;

// Called once from server.js after Socket.io initializes
function attachIO(io) {
  ioInstance = io;
}

/**
 * Creates a notification in the DB and, if the user has an active socket
 * connection, pushes it to them in real time.
 */
async function notify({ userId, type, title, body = '', relatedTask = null, channel = 'in_app' }) {
  const notification = await Notification.create({
    user: userId,
    type,
    title,
    body,
    relatedTask,
    channel,
  });

  if (ioInstance) {
    ioInstance.to(`user:${userId}`).emit('notification', notification);
  }

  return notification;
}

module.exports = { attachIO, notify };
