const merge = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(config,{
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),  // 热加载
		new webpack.NamedModulesPlugin(),  // 热加载以便更容易查看要修补(patch)的依赖
	],
	devtool: 'inline-source-map',  //映射打包代码为源码
	devServer: {                        // 本地服务
	    open: false, // 自动打开浏览器
	    contentBase: path.join(__dirname, 'dist'),
	    host: 'localhost', // 0.0.0.0 localhost
	    port: 8080,
	    overlay: {
	        warnings: false,
	        errors: true
	    }
	}
	
})