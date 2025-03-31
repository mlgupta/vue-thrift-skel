import * as thrift from 'thrift';
// import { APIServiceClient as ApiServiceClient } from '@/gen-es6/ApiService.js';
// import { GetDataRequest } from '@/gen-es6/api_types.js'; // Import the types generated from Thrift
import { APIServiceClient  as ApiServiceClient } from '../../gen-nodejs/APIService.js'; 
import { GetDataRequest } from '../../gen-nodejs/api_types.js'; // Import the types generated from Thrift


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


// var connection = thrift.createXHRConnection(host, port, options);
// var client =  thrift.createXHRClient(ApiServiceClient, connection);
// var connection = thrift.createHttpConnection(host, port, options);
// var client =  thrift.createHttpClient(ApiServiceClient, connection);
// console.log('Client created');

// connection.on('error', function(error) {
//   console.log(error);
// });

// var req = new GetDataRequest({ID: 'Hello'});
// console.log('Request created');
// client.GetData(req, function(error, response) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(response);
//   }
// });

// export default client ;

// Create a Thrift connection and client
function createThriftClient() {
  const connection = thrift.createXHRConnection(host, port, options);
  const client = thrift.createXHRClient(ApiServiceClient, connection);

  console.log('Client created');

  // Handle connection errors
  connection.on('error', function (error) {
    console.error('Thrift connection error:', error);
    connectionError = error;
  });

  return client;
}

// Create a common object to encapsulate API methods
// const thriftClient = {
//   client: createThriftClient(),

//   // Method to call GetData
//   async getData(id) {
//     if (!id) {
//       throw new Error('ID is required to call GetData');
//     }

//     const req = new GetDataRequest({
//       ID: id, // Assuming ID is a string
//     });
//     console.log('Request object for GetData:', req);
//     // Call the GetData method on the Thrift client
//     return new Promise((resolve, reject) => {
//       this.client.GetData(req, function (error, response) {
//         if (error) {
//           console.error('Error in GetData:', error);
//           reject(error);
//         } else {
//           console.log('Response from GetData:', response);
//           resolve(response);
//         }
//       });
//     });
//   },

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
    
      // Call the GetData method on the Thrift client
      try {
        const response = await Promise.race([this.client.GetData(req), timeout]);
        console.log('Response from GetData:', response);
        return response;
      } catch (error) {
        console.error('Error in GetData:', error);
        throw error;
      }
    },
  
  // Add other API methods here as needed
  // Example:
  // async anotherMethod(args) {
  //   return new Promise((resolve, reject) => {
  //     this.client.AnotherMethod(args, function (error, response) {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(response);
  //       }
  //     });
  //   });
  // },
};

export default thriftClient;