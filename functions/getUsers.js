const goodreads = require('goodreads-api-node');


// exports.handler = function(event,context,callback){

//     // const myCredentials = {
//     //     key: 'MY_GOODREADS_KEY',
//     //     secret: 'MY_GOODREADS_SECRET'
//     //   };
       
//     //   const gr = goodreads(myCredentials);
      
// callback(null,
//     {statusCode: 200,
//     body:"Hello World"})
// }

// modern JS style - encouraged
export async function handler(event, context) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello world ${Math.floor(Math.random() * 10)}` })
    };
  }