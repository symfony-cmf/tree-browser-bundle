var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  debug : true,
  context : path.join(__dirname, 'Resources/assets/'),
  entry : {
    fancytree : './js/jquery.cmf_tree.js'
  },
  output : {
    path : path.join(__dirname, 'Resources/public/js'),
    filename : 'cmf_tree_browser.[name].js'
  },
  externals : {
    'jquery' : 'jQuery'
  },
  module : {
    loaders : [
      {
        test : /\.css$/i,
        loader : ExtractTextPlugin.extract('style', 'css', {publicPath : '../js/'})
      },
      {
        test : /(assets|Tests).+?\.js$/i, loader : 'babel-loader', query : {presets : ['es2015']}
      },
      {
        test : /\.(jpe?g|png|gif|svg)$/i, loader : 'file?name=../img/[hash].[ext]'
      }
    ]
  },
  resolve : {
    root : __dirname,
    alias : {
      jquery : path.join(__dirname, 'bower_components/jquery/dist/jquery.js'),
      'jquery-ui' : path.join(__dirname, 'bower_components/jquery-ui/jquery-ui.js'),
      fancytree : path.join(__dirname, 'bower_components/fancytree/dist'),
      'core-js' : path.join(__dirname, 'node_modules/core-js')
    }
  },
  resolveLoader : {
    modulesDirectories : [path.join(__dirname, 'node_modules')]
  },
  plugins : [
    // required once multiple entry files are used (e.g. for different adapters)
    //new webpack.optimize.CommonsChunkPlugin('common.cmf_tree_browser.js')
    new ExtractTextPlugin('../css/cmf_tree_browser.[name].css')
  ]
};
