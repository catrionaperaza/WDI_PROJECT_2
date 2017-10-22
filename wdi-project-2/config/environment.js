module.exports = {
  port: process.env.PORT || 4000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/traveldreams',
  sessionSecret: process.env.SESSION_SECRET || 'YghT5s617/1{%sDt'
};
