const goodreads = require("goodreads-api-node");

const goodreadsKey = process.env.goodreadsKey;
const goodreadsSecret = process.env.goodreadsSecret;

const credentials = {
  key: goodreadsKey,
  secret: goodreadsSecret,
};
// modern JS style - encouraged
exports.handler = async (event, context) => {
  console.log("credentials", credentials);
  //   const gr = goodreads(myCredentials);
  const query = event.queryStringParameters.query || "world";
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const gr = goodreads(credentials);
    console.log("gr", gr);
    console.log("credentials", credentials);
    const response = await gr.searchBooks({
      q: query,
      page: 1,
      // field: "title",
    });
    console.log("resp");
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
