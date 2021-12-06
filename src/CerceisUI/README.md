@Prerequisition
	- Vue 3 
	- Typescript
	- scss

@Summary descriptions
	- All component is written in composition api

@How to use
	/* main.ts */
	import CerceisUI from '<path-to>/cerceis-ui/src/CerceisUI/CerceisUI'
	const app = createApp(App);
	app.use(CerceisUI)

	/* vue.config.js */
	add the following option
	chainWebpack(config) {
		config.resolve.symlinks(false)
		config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue'))    
	},  

	/* Now you should define your theme with a global stylesheet */
	The following are the default theme
	:root {
		--bg: #ffffff;
		--text: #000000;
		--primary: #779ecb;
		--secondary: #C98686;
		--accent: #F2B880;
		--success: #03c03c;
		--error: #ff6961;
		--warning: #FFB449;
	}

	[data-theme="dark"] {
		--bg: #373737;
		--text: #ffffff;
		--primary: #779ecb;
		--secondary: #C98686;
		--accent: #F2B880;
		--success: #03c03c;
		--error: #ff6961;
		--warning: #FFB449;
	}




@FAQ
	- How to add more icon ?
		drop your icon files(svg format only) into the "icons" folder and use it.

	
