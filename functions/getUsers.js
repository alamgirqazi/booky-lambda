export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,GET,PUT,OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Credentials": "true",
    },
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`,
    }),
  };
}
