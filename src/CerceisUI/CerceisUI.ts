import Icon from "./ui/Icon.vue"
import Container from "./ui/Container.vue"
import Button from "./ui/Button.vue"
import Input from "./ui/Input.vue"
import Avatar from "./ui/Avatar.vue"
import Divider from "./ui/Divider.vue"
import LoaderCircular from "./ui/LoaderCircular.vue"
import Switch from "./ui/Switch.vue"
import Checkbox from "./ui/Checkbox.vue"
import Table from "./ui/Table/Table.vue"
import Select from "./ui/Select.vue"
import LoaderLinear from "./ui/LoaderLinear.vue"
import FloatPanel from "./ui/FloatPanel.vue"
import Sidebar from "./ui/Sidebar.vue"
import Dialog from "./ui/Dialog.vue"
//Styles
import "./css/globalStyle.css"
import "./css/theme.css"
/* 
options:{
	iconAssetPath: <String>: Should be absolute path to icon folder
}
*/
export interface CerceisUIOptions {
	iconAssetPath?: String
}

export default {
	install: (app: any, options: CerceisUIOptions = {}) => {
		app.config.globalProperties.cIconAssetPath = options.iconAssetPath ? options.iconAssetPath : "";
		app.component("c-icon", Icon);
		app.component("c-container", Container);
		app.component("c-btn", Button);
		app.component("c-input", Input);
		app.component("c-avatar", Avatar);
		app.component("c-divider", Divider);
		app.component("c-loader-circular", LoaderCircular);
		app.component("c-switch", Switch);
		app.component("c-checkbox", Checkbox);
		app.component("c-table", Table);
		app.component("c-select", Select);
		app.component("c-loader-linear", LoaderLinear);
		app.component("c-float", FloatPanel);
		app.component("c-sidebar", Sidebar);
		app.component("c-dialog", Dialog);
	}
}