const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(config,{
	plugins: [
		new webpack.NamedModulesPlugin(),  // 热加载以便更容易查看要修补(patch)的依赖
		new webpack.HotModuleReplacementPlugin(),  // 热加载
		new webpack.DefinePlugin({
		    'process.env.NODE_ENV': JSON.stringify('dev')
		})
	],
	devtool: 'inline-source-map',  //映射打包代码为源码
	devServer: {                        // 本地服务
	    contentBase: './dist'
	}
	
})