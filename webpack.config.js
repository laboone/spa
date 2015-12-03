var webpack = require('webpack');

module.exports = {  
  entry: './js/app.ts',
  output: {
    filename: './release/bundle.js'
  },
  // Turn on sourcemaps
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: "jquery",
    //         jQuery: "jquery",
    //         "window.jQuery": "jquery"
    //     })
    // ],
  // Add minification
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin()
  // ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
}
