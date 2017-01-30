var context = require.context('./js', true, /.+Spec\.js$/);
context.keys().forEach(context);
module.exports = context;
