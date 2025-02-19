// routes/comics.js
const express = require('express');
const router = express.Router();
const comicsController = require('../controllers/comicsController');

// GET list of comics
router.get('/', comicsController.getComics);

// GET comic details
router.get('/:comicId', comicsController.getComicById);

// GET chapters for a comic
router.get('/:comicId/chapters', comicsController.getChaptersForComic);

// GET pages for a chapter (assuming chapter ID is unique)
router.get('/chapters/:chapterId/pages', comicsController.getPagesForChapter);

module.exports = router;

