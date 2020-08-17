const app = require('./server');
require('./config/database');

app.listen(() => {
  console.log('server started at port 3333');
});
