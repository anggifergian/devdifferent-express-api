const express = require('express');
const router = express.Router();
const multer = require('multer');

const { generateUploadUrl, generateDownloadUrl } = require('../services/dms.service');
const File = require('../models/File');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images are allowed!'), false);
    }
    cb(null, true);
  },
});

router.post('/upload', upload.single('file'), async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file provided' });

    const { originalname: filename, mimetype } = file;

    const { url, key } = await generateUploadUrl(filename, mimetype);

    // Save metadata to MongoDB
    const newFile = new File({ filename, s3Key: key });
    await newFile.save();

    res.json({ url, fileId: newFile._id });
  } catch (err) {
    next(err);
  }
});

router.get('/download', async (req, res, next) => {
  try {
    const file = await File.findById(req.query.id);
    if (!file) return res.status(404).send('File not found');

    const downloadUrl = await generateDownloadUrl(file.s3Key);
    res.json({ downloadUrl });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
