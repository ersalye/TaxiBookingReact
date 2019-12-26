const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// var path = require("path");

// const APP_DIR = path.resolve(__dirname, "../src");
// let PUBLIC_PATH;

module.exports = env => {
  const { PLATFORM, VERSION, API_URL } = env;
  return merge([
    common,
    {
      mode: "development",
      devtool: "inline-source-map",
      devServer: {
        historyApiFallback: true,
        contentBase: "./dist",
        hot: true
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          {
            test: /\.s(a|c)ss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ["file-loader"]
          }
        ]
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          title: "example",
          template: "./dist/index.html",
          filename: "index.html",
          inject: true,
          minify: {
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true,
            minifyCSS: true,
            minifyURLs: true,
            minifyJS: true,
            removeComments: true,
            removeRedundantAttributes: true
          }
        }),
        new webpack.DefinePlugin({
          "process.env.VERSION": JSON.stringify(VERSION),
          "process.env.PLATFORM": JSON.stringify(PLATFORM),
          "process.env.API_URL": JSON.stringify(API_URL)
        })
      ]
    }
  ]);
};
