const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const appRouter = require('./Routes');
const { errorHandler } = require('./Middlewares/Error');

const app = express();

app.use(cors());
app.use(express.json());

const { MONGO_URI, PORT } = process.env;


app.use('/api', appRouter);

app.use(errorHandler);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false})
	.then(() => {
		console.log('DB connected successfully!');

		// start listening for requests
		app.listen(PORT, () => {
			console.log(`app is now listening on http://localhost:${PORT}`);
		});
	})
	.catch(console.log);