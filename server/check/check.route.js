const express = require('express');
const router = express.Router();

const checkService = require('./service');

router.post('/api/check', (req, res) => {
	let msg = checkService.check(req);
	res.json(msg);
});

module.exports = router;
