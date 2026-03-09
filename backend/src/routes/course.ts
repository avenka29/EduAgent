import { Router } from 'express';
import { LocalJSONProvider } from '../services/LocalJSONProvider';

const router = Router();
const provider = new LocalJSONProvider();

// GET /api/course/toc
router.get('/toc', async (req, res) => {
  try {
    const toc = await provider.getTOC();
    res.json(toc);
  } catch (error) {
    console.error('Error fetching TOC:', error);
    res.status(500).json({ error: 'Failed to fetch course structure' });
  }
});

// GET /api/course/node/:id
router.get('/node/:id', async (req, res) => {
  try {
    const node = await provider.getNodeContent(req.params.id);
    if (!node) {
      return res.status(404).json({ error: 'Node not found' });
    }
    res.json(node);
  } catch (error) {
    console.error('Error fetching node content:', error);
    res.status(500).json({ error: 'Failed to fetch node content' });
  }
});

export default router;
