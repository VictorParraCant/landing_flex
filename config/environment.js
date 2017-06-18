'use strict';

module.exports = function(environment) {

  // Datos de desarrollo
  var ENV = {
    environment: 'development',
    port: 3000,
    ip: '127.0.0.1'
  };

  // Datos de production
  if (environment === 'production') {
    ENV.environment = 'production';
    ENV.port = process.env.PORT || 8080;
    ENV.ip = process.env.IP || '127.0.0.1';
  }

  return ENV;

};
