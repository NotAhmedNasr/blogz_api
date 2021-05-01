const express = require('express');

const app = express();






const { PORT } = process.env;

app.listen(PORT, () => {
	console.log(`app is now listening on http://localhost:${PORT}`);
});