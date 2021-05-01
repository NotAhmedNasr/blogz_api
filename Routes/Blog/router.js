const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.end('blog get all');
});
router.get('/:id', (req, res) => {
	res.end('blog get id');
});
router.post('/', (req, res) => {
	res.end('blog post');
});
router.patch('/:id', (req, res) => {
	res.end('blog patch');
});
router.delete('/:id', (req, res) => {
	res.end('blog delete');
});

module.exports = router;