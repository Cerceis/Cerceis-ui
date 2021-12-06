const path = require("path")

module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				"lib": "/Users/haurucerceis/LocalData/LIB",
				"vlib": "/Users/haurucerceis/LocalData/VUE/cerceislib/modules"
			},
		}
	},
	chainWebpack(config) {
		config.resolve.symlinks(false)
		config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue'))    
	},  
};