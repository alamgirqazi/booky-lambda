const goodreads = require('goodreads-api-node');

// const { GOODREADS_KEY, GOODREADS_SECRET } = process.env;
const GOODREADS_KEY = 'test';
const GOODREADS_SECRET = 'test';


// modern JS style - encouraged
exports.handler = async (event, context) => {
//   console.log('GOODREADS_KEY', GOODREADS_KEY);
//   console.log('GOODREADS_SECRET', GOODREADS_SECRET);
const myCredentials = {
    key: GOODREADS_KEY,
    secret: GOODREADS_SECRET,
  };
//   const gr = goodreads(myCredentials);
  const name = event.queryStringParameters.name || 'World';

//   console.log('gr',gr);
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  return {
            statusCode: 200,
            body: 'helloa',
          };

//   gr.getBooksByAuthor('175417')
//     .then(res => {
//       console.log('res', res);
//       return {
//         statusCode: 200,
//         // body: JSON.stringify(res),
//       };
//     })
    // .catch((err) => {
    //   console.log('err');
    // });
};
