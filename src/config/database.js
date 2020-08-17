const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch((error) => {
    console.log(`Cannot connet to database ${error}`);
  });
