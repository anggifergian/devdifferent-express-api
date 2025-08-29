const express = require('express');
const router = express.Router();
const multer = require('multer');

const { generateUploadUrl, generateDownloadUrl } = require('../services/dms.service');
const File = require('../models/File');
const CustomError = require('../utils/customError');

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

    const reqUpload = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': file.mimetype },
      body: file.buffer,
    });

    const statusCode = reqUpload.status;

    if (statusCode === 200) {
      const newFile = new File({ filename, s3Key: key });
      await newFile.save();

      res.json({ uploadUrl: url, fileId: newFile._id });
    } else {
      let errMessage = '';

      switch (statusCode) {
        case 413:
          errMessage = 'FILE_TOO_LARGE';
          break;
        case 415:
          errMessage = 'INVALID_FILE_TYPE';
          break;
        default:
          errMessage = 'Internal server error';
          break;
      }

      throw new CustomError(errMessage, statusCode);
    }
  } catch (err) {
    next(err);
  }
});

router.get('/get-all', async (req, res, next) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });

    const result = await Promise.all(
      files.map(async (file) => {
        const downloadUrl = await generateDownloadUrl(file.s3Key);

        return {
          fileId: file._id,
          filename: file.filename,
          s3Key: file.s3Key,
          uploadDate: file.uploadedAt,
          downloadUrl,
        };
      })
    );

    res.json({ data: result });
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
