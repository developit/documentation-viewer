var webpack = require('webpack'),
	ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/index.js',
	output: {
		path: './build',
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: [
			'./src/lib',
			'node_modules'
		]
	},
	module: {
		// preLoaders: [
		// 	{ loader: 'source-map' }
		// ],
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.(less|css)$/,
				loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
			}
		]
	},
	plugins: ([
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin(),
		new ExtractTextPlugin('style.css', { allChunks: true })
	]).concat(process.env.WEBPACK_ENV==='dev' ? [] : [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			output: { comments: false },
			exclude: [/\.min\.js$/gi]
		})
	]),
	stats: { colors: true },
	devtool: 'source-map',
	devServer: {
		port: process.env.PORT || 8080,
		contentBase: './src',
		historyApiFallback: true
	}
};
