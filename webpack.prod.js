const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除dist文件
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config.js');
const merge = require('webpack-merge');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const HashOutput = require('webpack-plugin-hash-output');
const path = require('path');

module.exports = merge(config,{
	mode: 'production',
	optimization: {
	    minimize: true,
	    splitChunks: {
	        minSize: 0,
	        minChunks: 1,
	        maxAsyncRequests: 50,
	        maxInitialRequests: 30,
	        name: true,
	        cacheGroups: {
	            vendors: {
	                test: /[\\/]node_modules[\\/]/,
	                priority: -1,
	                chunks: 'all',
	                name: 'vendors'
	            },
	            assets: {
	                test: path.resolve(__dirname, './src/assets'),
	                priority: -10,
	                chunks: 'all',
	                name: 'assets'
	            }
	        }
	    }
	},
	plugins: [
		new CleanWebpackPlugin(),  // 清除dist
		new OptimizeCssAssetsPlugin(),  // 压缩css
		// new UglifyJSPlugin(),  // 压缩js
		// new HashOutput(),
		new webpack.BannerPlugin('LJC is the world best man!!!!!!!!!!!!!!!!!!!!!!!!')
	]
})