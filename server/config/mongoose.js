const mongoose = require("mongoose"),
    db = process.env.URL_DB + '-' + process.env.NODE_ENV;

mongoose.connect(`${db}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    err => {
        if (err) console.log("mongoose connect failed");
        else console.log("e-commerce successfully connect to mongodb");
    }
)