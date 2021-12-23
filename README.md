# CerceisUI
UI component library made for Vue3, written in Typescript. Nothing is being built, which means everything is the original source code, which can be changed easily.

# Prerequisition
- Vue 3 
- Typescript

# How to use

## Installation
Clone and place on anywhere in your project directory. (In src or in a ***separate*** project directory)  

## Usage
**This imports the entire UI library automatically, if you want to import a single component, check on the README.md on each ui folder and its dependencies.**

	/* main.ts */
	import CerceisUI from '<path-to>/cerceis-ui/src/CerceisUI/CerceisUI'
	const app = createApp(App);
	app.use(CerceisUI)

Vue runs in singleton, if you are importing directly from another project, you will need to add the following lines to your ***vue.config.js***  

	/* vue.config.js */
	add the following option
	chainWebpack(config) {
		config.resolve.symlinks(false)
		config.resolve.alias.set( 'vue', path.resolve('./node_modules/vue'))    
	},  

The entire library runs on a theme system. Which allow more consistency and easier dark mode support. If you have used the method above to import the library, it also automaically imports the default themes which you can find in ***"CerceisUI/css/theme.css"***.

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
Above are the default colors, you can change as you wish.

# Components
|Name|Status|Documentation|
|--|--|--|
|Alert|In Progress|x|
|Avatar|Completed|x|
|Button|Completed|x|
|Checkbox|Completed|x|
|ChipGroup|Completed|x|
|Container|Completed|x|
|DatePicker|Completed|x|
|Dialog|Completed|x|
|Divider|Completed|x|
|FloatPanel (tooltip)|Completed|x|
|Icon|Completed|o|
|Input|Completed|x|
|LoaderCircular|Completed|x|
|LoaderLinear|Completed|x|
|Notification|Completed|o|
|Select|Completed|x|
|Sidebar|Completed|x|
|Switch|Completed|x|
|Table/DataTable|Completed|o|
|TimePicker|Completed|o|

# Dark mode implementations
This library provides an extremly easy way to implement dark mode.
Code below shows a trigger that toggle between "light" & "dark" theme.  
*Example written with TypeScript in Composition api.
```
//This could be a v-model of any input (Ex. Check box/Switch)
const checked: Ref<boolean> = ref(false);
const toggleDarkMode = (mode: ThemeMode = null): void => {
	const body = document.querySelector("body");
	if(mode) 
		body!.dataset.theme = mode
	else
		body!.dataset.theme = checked.value ? "dark" : "light";
	//To persist dark mode on reload, we save it on localStoage.
	window.localStorage.setItem("theme", body!.dataset.theme)
};
//Automatically switch mode on reload.
onMounted(()=>{
	//Check theme settings
	const currentTheme: string | null = window.localStorage.getItem("theme");
	if(currentTheme && (currentTheme === "dark" || currentTheme === "light")){
		toggleDarkMode(currentTheme);
		checked.value = currentTheme === "dark" ? true : false;
	}
})
```

# Versions
|Name|Release Date|Changelog|
|--|--|--|
|v1.1|2021-12-23| Added **TimePicker**, **DatePicker**, **Notification**. Updated documentation. Updated **Table**'s **ApiMode**. Added **Dark mode** documentation.|
|v1.0|2021-12-17| First release. Changed documentation format. Minor bug fixed.|
|v0.5|2021-11-30| Alpha release.

# FAQ
- How to add/use icon ?  

	drop your icon files (svg format only) into the "icons" folder located in ***"CerceisUI/icons"*** and you can then use it by refering to its filename **without file extension**.
	### Example
	```
    //If your icon name is "001-folderIcon.svg"

    <c-icon name="001-folderIcon"/>
	```
	
