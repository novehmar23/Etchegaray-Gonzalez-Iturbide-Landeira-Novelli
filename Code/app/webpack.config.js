const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" },
                           { from: "./src/exchange/exchange.html", to: "exchange.html" },
                           { from: "./src/exchange/exchange.js", to: "exchange.js" },
                           {from: "./src/assets", to :"assets"},
                           {from: "./src/vendor", to :"vendor"}]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
  module: {
    rules: [
      {
        test: /\.(min.css|.css)$/i,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
      },
      {
        test: /\.(png|jpg|gif|eot|woff|ttf|svg|webp|PNG|woff2)(\?\S*)?$/,
        use: ["file-loader"],
      },
    ],
  },

};
