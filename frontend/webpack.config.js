const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.js"),
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        exclude: /node_modules/,
      },
      {
        test: /.*\.(gif|png|jpg?g)$/i,
        use: { loader: "file-loader" },
      },
    ],
  },
};
