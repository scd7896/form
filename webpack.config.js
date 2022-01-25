module.exports = function(env) {
	return {
		mode: env.production ? "production" : "development",
		target: ["web", "es5"],
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
								['@babel/preset-env', { 
									targets: {
										ie: "11"
									}
								}]
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