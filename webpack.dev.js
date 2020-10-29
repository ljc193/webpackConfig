const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(config,{
	mode: 'development',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),  // 热加载
		new webpack.NamedModulesPlugin(),  // 热加载以便更容易查看要修补(patch)的依赖
		new webpack.NamedModulesPlugin()
	],
	devtool: 'inline-source-map',  //映射打包代码为源码
	devServer: {                        // 本地服务
	    contentBase: path.join(__dirname, 'dist'),
		publicPath: '',
		compress: true,
		hot: true,
		host:'localhost',  // 可以通过localhost访问
		port: 8080,
		overlay:{
			errors:true // 出现错误之后会在页面中出现遮罩层提示
		},
		open:false
	}
	
})