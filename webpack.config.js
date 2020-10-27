const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // 压缩重新生成html，会自动匹配对应的js
const webpack = require('webpack');
module.exports = {
	entry: {
		main: './src/index.js',
		vender:[
			'lodash',
			'jquery'
		]
		
	},
	output: {
		filename: "[name].[chunkhash].js",  // 入口文件名称
		// chunkFilename: '[name].chunk.js', // 非入口 chunk 的名称
		path:path.resolve(__dirname,"./dist")
	},
	 performance: {
		hints:false
	},
	optimization: {       // 代码分离配置
		splitChunks: {
			cacheGroups: {
				lodash: {
					name: "lodash",
					chunks: "initial",  // 有三个可选值，”initial”, “async” 和 “all”. 分别对应优化时只选择初始的chunks，所需要的chunks 还是所有chunks 。
					minChunks: 2  // 是split前，有共享模块的chunks的最小数目 ，默认值是1
				},
				jquery: {
					name: "jquery",
					chunks: "initial",  // 有三个可选值，”initial”, “async” 和 “all”. 分别对应优化时只选择初始的chunks，所需要的chunks 还是所有chunks 。
					minChunks: 2  // 是split前，有共享模块的chunks的最小数目 ，默认值是1
				},
			}
		}
	},
    plugins: [
		new HtmlWebpackPlugin({   // 重载html
		  title: 'Output Management'
		}),
		new webpack.ProvidePlugin({   // 全局变量
		   _: 'lodash',
		   $:'jquery',
		   jQuery:'jquery'
		})
    ],
	 module: {
	    rules: [
	       {
				 test: /\.css$/,  // 处理css
				 use: [
				   'style-loader',
				   'css-loader'
				 ]
	       },
		   {
				 test: /\.less$/,  // 处理less
				 use: [
				   'style-loader',
				   'css-loader',
				   'less-loader'
				 ]
		   },
		   {
				test:/\.js$/,//正则匹配所有以.js结尾的文件
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader"
				}
			},
		   {
				 test:/\.(png|svg|jpg|gif)$/,  // 处理图片
				 use: [
					 'file-loader'
				 ]
		   },
		   {
				test: /\.(woff|woff2|eot|ttf|otf)$/,  // 处理字体文件
				use: [
				  'file-loader'
				]
		    }
		   
	    ]
	},
	mode: "production"
}