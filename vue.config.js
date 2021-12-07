const path = require("path")

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				"lib": "/Users/haur/Desktop/Dev/LIB"
			},
		}
	},
	chainWebpack(config) {
		config.resolve.symlinks(false)
		config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue'))    
	},  
};