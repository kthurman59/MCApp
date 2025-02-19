// controllers/comicsController.js

// Dummy data example
const comics = [
  { id: '1', title: 'Martian Adventures', summary: 'An epic journey on Mars' },
  // ... more comics
];

exports.getComics = (req, res) => {
  res.json({ comics });
};

exports.getComicById = (req, res) => {
  const { comicId } = req.params;
  const comic = comics.find(c => c.id === comicId);
  if (!comic) return res.status(404).json({ message: 'Comic not found' });
  res.json(comic);
};

exports.getChaptersForComic = (req, res) => {
  // Replace with actual DB call
  res.json({ chapters: [{ id: 'ch1', title: 'Chapter 1' }] });
};

exports.getPagesForChapter = (req, res) => {
  const { chapterId } = req.params;
  // Replace with actual logic
  res.json({ pages: ['url_to_page1', 'url_to_page2'] });
};

