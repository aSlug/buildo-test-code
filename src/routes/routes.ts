import express from 'express';

export const router = express.Router();

/* GET default */
router.get('/', (req, res, next) => {
  res.json({ message: 'welcome'});
});

/* GET specific configuration */
router.get('/:id', (req, res, next) => {
  res.json({ resource: req.params.id });
});
