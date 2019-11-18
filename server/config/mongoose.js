const mongoose = require('mongoose')

// database mongodb atlas
const MONGODB_URI = `mongodb+srv://mongodbatlas:mongodbatlas@myfirstcluster-6alcw.gcp.mongodb.net/e-commerce-${process.env.NODE_ENV}?retryWrites=true&w=majority`

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DATABASE MONGODB CONNECT'))
  .catch(err => {
    console.log('FAILED TO CONNECT DATABASE')
    console.log(err)
  })
