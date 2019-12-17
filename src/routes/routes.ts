import express from 'express';
import * as stateAccess from '../state/stateAccess';
import { Configuration } from './../models/configuration';

export const router = express.Router();

/* GET default */
router.get('/', (req, res, next) => {

  res.status(200);
  res.json(stateAccess.getAllConfigurations());

});

/* GET specific configuration */
router.get('/:id', (req, res, next) => {

  if (!stateAccess.existsConfiguration(req.params.id)) {

    // the resource doesn't exists
    res.sendStatus(404);

  } else {

    // everything ok
    res.status(200);
    res.json(stateAccess.getConfiguration(req.params.id));

  }

});

/* POST configuration */
router.post('/:id', (req, res, next) => {

  if (!req.body.name || !req.body.value
    || typeof req.body.name !== 'string'
    || typeof req.body.value !== 'string') {

    // the payload is missing mandatory data
    res.sendStatus(400);

  } else if (req.body.id && req.body.id !== req.params.id) {

    // the id field of the configuration object is
    // explicitely defined but does not match the name of resource
    res.sendStatus(422);

  } else if (stateAccess.existsConfiguration(req.params.id)) {

    // this resource already exists
    res.sendStatus(409);

  } else {

    // everything ok
    const config = new Configuration();
    config.id = req.params.id;
    config.name = req.body.name;
    config.value = req.body.value;
    stateAccess.saveNewConfiguration(config);
    res.sendStatus(201);

  }

});

/* PUT configuration */
router.put('/:id', (req, res, next) => {

  if (!req.body.name || !req.body.value
    || typeof req.body.name !== 'string'
    || typeof req.body.value !== 'string') {

    // the payload is missing mandatory data
    res.sendStatus(400);

  } else if (req.body.id && req.body.id !== req.params.id) {

    // the id field of the configuration object is
    // explicitely defined but does non match the name of resource
    res.sendStatus(422);

  } else if (!stateAccess.existsConfiguration(req.params.id)) {

    // this resource does not exists exists
    res.sendStatus(404);

  } else {

    // everything ok
    const config = new Configuration();
    config.id = req.params.id;
    config.name = req.body.name;
    config.value = req.body.value;
    stateAccess.updateConfiguration(config);
    res.sendStatus(200);

  }

});

/* DELETE configuration */
router.delete('/:id', (req, res, next) => {

  if (!stateAccess.existsConfiguration(req.params.id)) {

    // the resource does not exists
    res.sendStatus(404);

  } else {

    // everything ok
    stateAccess.deleteConfiguration(req.params.id);
    res.sendStatus(204);

  }

});
