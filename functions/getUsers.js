export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({
      message: `Hello world ${Math.floor(Math.random() * 10)}`,
    }),
  };
}
