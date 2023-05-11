const express = require('express');

const sqlController = require('../controllers/sqlController');

const router = express.Router();

// get db schema
router.get('/schema',
  sqlController.createConnection,
  sqlController.getDBName,
  sqlController.getTables,
  sqlController.getOIDS,
  sqlController.getFields,
  sqlController.normalizeSchema,
  (req, res) => res.status(200).json(res.locals.schema)
);

// get query results
router.get('/query',
  sqlController.createConnection,
  sqlController.runQuery,
  (req, res) => res.status(200).json(res.locals.queryResults)
);

module.exports = router;