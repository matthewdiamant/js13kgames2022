const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const zlib = require("zlib");

const prod = {
  devtool: "",
  mode: "production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            passes: 10,
            keep_fargs: false,
            pure_getters: true,
            unsafe: true,
            unsafe_arrows: true,
            unsafe_comps: true,
            unsafe_math: true,
            unsafe_methods: true,
            unsafe_symbols: true,
          },
          mangle: {
            properties: {
              keep_quoted: true,
            },
          },
        },
      }),
    ],
  },
};

const dev = {
  mode: "development",
  optimization: {},
  devtool: "cheap-source-map",
};

const { optimization, mode, devtool } =
  process.env.NODE_ENV === "production" ? prod : dev;

module.exports = {
  entry: "./src/index.js",
  bail: false,
  mode,
  output: {
    path: path.resolve(__dirname, "docs"),
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: "worker-loader",
          options: { inline: true, fallback: false },
        },
      },
    ],
  },
  devtool,
  optimization,
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: "./src/index.html",
      inlineSource: ".js$",
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
