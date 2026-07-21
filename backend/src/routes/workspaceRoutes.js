const express = require('express');
const workspaceController = require('../controllers/workspaceController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/multer');

const router = express.Router();

router.get('/tasks/:taskId/messages', protect, workspaceController.getMessages);
router.post('/tasks/:taskId/messages', protect, workspaceController.sendMessage);
router.patch('/messages/:messageId/read', protect, workspaceController.markMessageRead);

router.post('/tasks/:taskId/files', protect, upload.single('file'), workspaceController.uploadFile);
router.get('/tasks/:taskId/files', protect, workspaceController.listFiles);
router.get('/files/:fileId/download', protect, workspaceController.downloadFile);

router.patch('/tasks/:taskId/archive', protect, workspaceController.archiveWorkspace);

module.exports = router;
