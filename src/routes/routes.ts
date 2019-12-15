import express from 'express';
import { getAllConfigurations, getConfiguration, saveNewConfiguration, updateConfiguration } from '../state/stateUpdaters';
import { Configuration } from './../models/configuration';

export const router = express.Router();

/* GET default */
router.get('/', (req, res, next) => {
  res.json(getAllConfigurations());
});

/* GET specific configuration */
router.get('/:id', (req, res, next) => {
  res.json(getConfiguration(req.params.id));
});

/* POST configuration */
router.post('/:id', (req, res, next) => {
  const config = new Configuration();
  config.id = req.body.id;
  config.name = req.body.name;
  config.value = req.body.value;

  saveNewConfiguration(config);

  res.json(config);
});

/* PUT configuration */
router.put('/:id', (req, res, next) => {

  const config = new Configuration();
  config.id = req.body.id;
  config.name = req.body.name;
  config.value = req.body.value;

  updateConfiguration(config);

  res.json(config);
});
