const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	context: path.resolve(__dirname, '../src'),
	entry: {
		main: ['@babel/polyfill', './index.tsx'],
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, '../build'),
	},
	resolve: {
		extensions: ['.js', '.ts','.tsx', '.json', '.scss'],
		alias: {},
	},
	devServer: {
		port: 4200,
		hot: true,
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-typescript',
							]
						}
					},
					'eslint-loader'
				]
			},
			{
				test: /\.tsx$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								'@babel/preset-typescript',
							]
						}
					},
					'eslint-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			}
		]
	},
};
