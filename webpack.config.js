const path = require("path");

module.exports = {
  entry: ["./src/index.ts", "./scss/main.scss"],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'raw-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: []
};
