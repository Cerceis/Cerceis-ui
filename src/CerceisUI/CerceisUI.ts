import { provide } from 'vue';
import Icon from "./ui/Icon/Icon.vue"
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
import FloatPanel from "./ui/FloatPanel/FloatPanel.vue"
import Sidebar from "./ui/Sidebar.vue"
import Dialog from "./ui/Dialog/Dialog.vue"
import ChipGroup from "./ui/ChipGroup/ChipGroup.vue"
import * as notification from "./ui/Notification/NotificationService"
import Notification from "./ui/Notification/Notification.vue"
import DatePicker from "./ui/DatePicker/DatePicker.vue"
import TimePicker from "./ui/TimePicker/TimePicker.vue"
import Editor from "./ui/Editor/Editor.vue"
import Window from "./ui/Window/Window.vue"
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
		app.component("c-chip-group", ChipGroup);
		app.component("c-notification", Notification);
		app.provide('notificationService', notification);
		app.component("c-date-picker", DatePicker);
		app.component("c-time-picker", TimePicker);
		app.component("c-editor", Editor);
		app.component("c-window", Window);
	}
}