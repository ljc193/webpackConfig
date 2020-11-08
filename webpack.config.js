const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');  // 压缩重新生成html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 分离css
const webpack = require('webpack');
const menuList = require('./src/assets/js/menu.js');
const isProd = (process.env.NODE_ENV === 'prod');
const autoprefixer = require('autoprefixer');

let entry = {};  // 入口文件
let plugins = [];  // 插件
menuList.forEach(page=>{
	entry[page.url] = path.resolve(__dirname, `./src/pages/${page.url}/index.js`);  // 配置每页的入口文件
	let chunks = [page.url];
	if(isProd) {
		 chunks.splice(0, 0, 'assets');
		 chunks.splice(0, 0, 'vendors');
	}
	plugins.push(
		new HtmlPlugin({   // 打包html
			favicon: path.resolve(__dirname, `./src/assets/img/favicon.png`),  // 打包每页的图标
			filename: path.resolve(__dirname, `./dist/${page.url}.html`),  // 生成模板名字
			template: path.resolve(__dirname, `./src/pages/${page.url}/index.html`),  // 模板来源
			chunks: chunks,       // 引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，不设置默认全部引用
			chunksSortMode: 'auto',  // 插入chunk排序
			minify: isProd ? {         // 开发环境不配置压缩
			    collapseWhitespace: true, // 去除空格
			    removeComments: true  // 去除注释
			} : false
		}),
	)
})

/*
*  分离css配置
* */
plugins.push(
	new MiniCssExtractPlugin({
		filename: 'css/' + (isProd ? '[name].[contenthash:8].min.css' : '[name].css'), // contenthash 同一个模块只有修改了这个文件hash才会变
		chunkFilename: 'css/' + (isProd ? '[name].chunk.[contenthash:8].min.css' : '[name].chunk.css'),
	})
);


module.exports = {     // 导出配置
	entry: entry,
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'js/' + (isProd ? '[name].[chunkhash:8].min.js' : '[name].js'),
		chunkFilename: 'js/' + (isProd ? '[name].chunk.[chunkhash:8].min.js' : '[name].chunk.js'),
	},
	performance: {       // 打包性能提示
		hints:false
	},
	plugins: [
		 ...plugins
	],
	module: {
	    rules: [
			{       // 映射jquery
			    test: require.resolve('jquery'),
			    use: [{
			        loader: 'expose-loader',
			        options: 'jQuery'
			    }, {
			        loader: 'expose-loader',
			        options: '$'
			    }]
			},
			{ 
			    test: /\.html$/,          // 打包html图片资源
			    use: ['html-withimg-loader']
			},
			{
			    test: /\.(css)$/,
			    use: [isProd ? ({
			        loader: MiniCssExtractPlugin.loader,
			        options: {
			            publicPath: '../'
			        }
			    }) : 'style-loader', 'css-loader']
			},
			{
			    test: /\.(scss)$/,
			    use: [isProd ? ({
			        loader: MiniCssExtractPlugin.loader,
			        options: {
			            publicPath: '../'
			        }
			    }) : 'style-loader', 'css-loader', {
			        loader: 'postcss-loader',
			        options: {
			            plugins: [autoprefixer()]
			        }
			    }, 'sass-loader']
			},
		   {
				test:/\.js$/,//正则匹配所有以.js结尾的文件
				exclude: /(node_modules)/,
				use: {
				    loader: 'babel-loader',
				    options: {
				        presets: ['es2015-nostrict'],
				        plugins: ['transform-runtime']
				    }
				}
			},
		   {
				test: /\.(png|jpg|jpe?g|gif)$/,
				use:[{
					loader: 'url-loader',
					    options: {
					       outputPath: 'img/',
						   publicPath: './img',
						   esModule: false, // 该项默认为true，改为false即可
					       limit: 20*1024
					    }  
				}]    
		   },
		   {
		       test: /\.(webp)$/,
		       use: ['file-loader?&name=[name]' + (isProd ? '.[hash:8]' : '') + '.[ext]&outputPath=img/']
		   },
		   {
		       test: /\.(svg|woff|woff2|ttf|eot|otf)(\?.*$|$)/,
		       loader: 'file-loader?name=font/[name].[hash:8].[ext]'
		   }
		   
	    ]
	}
}