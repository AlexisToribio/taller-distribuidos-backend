const app = require('./base/app');
require('./base/database');

const server = app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});

module.exports = server;
