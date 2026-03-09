import { Router } from 'express';
import { TutorAgent } from '../agents/TutorAgent';
import { HomeworkAgent } from '../agents/HomeworkAgent';

const router = Router();
const tutor = new TutorAgent();
const homework = new HomeworkAgent();

// POST /api/agent/tutor/chat
router.post('/tutor/chat', async (req, res) => {
  try {
    const response = await tutor.chat(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Tutor Agent error' });
  }
});

// POST /api/agent/homework/assist
router.post('/homework/assist', async (req, res) => {
  try {
    const response = await homework.assist(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Homework Agent error' });
  }
});

export default router;
