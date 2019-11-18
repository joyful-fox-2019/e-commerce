if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const routes = require('./routes/index.js');
const errorHandler = require('./helpers/errorhandler.js');

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})
	.then(() => {
	    console.log('mongoose connected')
	})
	.catch(function (err) {
	    console.log('mongoose fail to connect');
	})

app.use(cors());
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.use('/', routes);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})

module.exports = app