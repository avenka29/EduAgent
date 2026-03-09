import { Router } from 'express';
import { TextbookService } from '../services/TextbookService';

const router = Router();
const service = new TextbookService();

// GET /api/textbook/list
router.get('/list', async (req, res) => {
  try {
    const list = await service.listTextbooks();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to list textbooks' });
  }
});

// GET /api/textbook/toc/:slug
router.get('/toc/:slug', async (req, res) => {
  try {
    const toc = await service.getTOC(req.params.slug);
    res.json(toc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch TOC' });
  }
});

// GET /api/textbook/module/:id
router.get('/module/:id', async (req, res) => {
  try {
    const data = await service.getModule(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch module' });
  }
});

// GET /api/textbook/media/:name
router.get('/media/:name', async (req, res) => {
  try {
    const path = await service.getImagePath(req.params.name);
    if (path) res.sendFile(path);
    else res.status(404).json({ error: 'Media not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch media' });
  }
});

export default router;
