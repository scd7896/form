module.exports = function(env) {
	return {
		mode: env.production ? "production" : "development",
		target: "web",
		entry: "./index.js",
		module: {
			rules: [
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['@babel/preset-env', { targets: "defaults" }]
							]
						}
					}
				}
			]
		},
		output: {
			path: __dirname + '/dist',
			filename: "form.min.js",
			library: "Form"
		}
	};
}