const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清除dist文件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(config,{
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true
		}),  // 压缩js
		new webpack.HashedModuleIdsPlugin(),  // 打包的时候控制文件名
		new CleanWebpackPlugin(),  // 清除dist
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': JSON.stringify('production')
		})
	]
})