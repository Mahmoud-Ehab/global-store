const config = {
  headers: {'Content-Type': 'application/json'},
  proxy: {
      protocol: 'http',
      host: 'localhost',
      port: 5000
  },
  validateStatus: null,
}

exports.default = config;