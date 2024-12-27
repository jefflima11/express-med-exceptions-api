const express = require('express');
const router = express.Router();
const { getRepasse, getRepasseId } = require('../controllers/repasse-controller');

router.get('/', getRepasse);
router.get('/:id', getRepasseId);

module.exports = router;