// added default because otherwise It wouldn't work

const goodreads = require("goodreads-api-node").default;

const goodreadsKey = process.env.goodreadsKey;
const goodreadsSecret = process.env.goodreadsSecret;

const credentials = {
  key: goodreadsKey,
  secret: goodreadsSecret,
};
exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query || "world";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
      headers: headers,
      body: "This was a preflight call!",
    };
  }

  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const gr = goodreads(credentials);
    const response = await gr.searchBooks({
      q: query,
      page: 1,
      // field: "title",
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.search),
    };
  } catch (error) {
    console.log("err", error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
