const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'product-connector',
  service: 'your-service-id',
  location: 'asia-southeast2'
};
exports.connectorConfig = connectorConfig;

