const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(`mongodb+srv://edwinsatya:Dotalovers20@cluster0-dipcn.gcp.mongodb.net/test?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, err => {
        if (err) console.log('Failed To Connect DB');
        else console.log(`Connected To DB`);
    })
}