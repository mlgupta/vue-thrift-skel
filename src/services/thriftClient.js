import * as thrift from 'thrift';
// import { APIServiceClient as ApiServiceClient } from '@/gen-es6/ApiService.js';
// import { GetDataRequest } from '@/gen-es6/api_types.js'; // Import the types generated from Thrift
// import { APIServiceClient  as ApiServiceClient } from '../../gen-nodejs/APIService.js'; 
// import { GetDataRequest } from '../../gen-nodejs/api_types.js'; // Import the types generated from Thrift
import { Client  as ApiServiceClient } from '../../gen-esm/APIService.mjs'; 
import { GetDataRequest } from '../../gen-esm/api_types.mjs'; // Import the types generated from Thrift


console.log('Imports successful');

var host = 'localhost';
var port = 9092;
var options = {
  protocol: thrift.TJsonProtocol,
  path: '/',
  headers: {
    'Content-Type': 'application/vnd.apache.thrift.json',
  },
  useCORS: true,
}
let connectionError = null;


// Create a Thrift connection and client
function createThriftClient() {
  const connection = thrift.createXHRConnection(host, port, options);
  const client = thrift.createXHRClient(ApiServiceClient, connection);

  console.log('Client created');

  // Handle connection errors
  connection.on('error', (error) => {
    console.error('Thrift connection error:', error);
    connectionError = error;
  });


  return client;
}

const thriftClient = {
  client: createThriftClient(),

  // Method to call GetData
  async getData(id) {
    if (!id) {
      throw new Error('ID is required to call GetData');
    }

    const req = new GetDataRequest({
      ID: id, // Assuming ID is a string
    });
    console.log('Request object for GetData:', req);

    const timeout = new Promise((_, reject) => {
      setTimeout(() => {
        if (connectionError) {
          reject(new Error(`GetData request timed out. Connection error: ${connectionError.message}`));
        } else {
          reject(new Error(`GetData request timed out for ID: ${id}`));
        }
      }, 5000); // Set timeout to 5 seconds
    });
  
    // Wrap the Q.defer().promise in a native Promise
    const getDataPromise = new Promise((resolve, reject) => {
      this.client.GetData(req)
        .then(resolve)
        .catch(reject);
    });

    // Use Promise.race to handle timeout
    return Promise.race([getDataPromise, timeout]);
  },  
};

export default thriftClient;