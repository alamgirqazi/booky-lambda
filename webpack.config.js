const Dotenv = require("dotenv-webpack");
var nodeExternals = require("webpack-node-externals");

module.exports = {
  // this fixed mongoose issues with webpack
  target: "node", // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [new Dotenv()],
};
