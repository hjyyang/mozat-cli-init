let isDev = process.env.NODE_ENV === "development";

// 优化打包行为 —— 移除打包后的 js.map 文件和 console 输出
const upgradeMinimizer = (webpackConfig) => {
	webpackConfig.optimization.minimizer("terser").tap((args) => {
		args[0].terserOptions.compress.drop_console = true;
		args[0].terserOptions.compress.drop_debugger = true;
		args[0].terserOptions.compress.pure_funcs = ["console.log"];
		return args;
	});
};
module.exports = {
	publicPath: "./",
	assetsDir: "public",
	productionSourceMap: false,
	css: {
		sourceMap: isDev,
	},
	lintOnSave: true,
	chainWebpack: (config) => {
		if (!isDev) {
			upgradeMinimizer(config);
		}
	},
};
