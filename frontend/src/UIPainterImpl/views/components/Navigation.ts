import { ConstructiveView, StateManager } from "sfawd";
import { HTMLView } from "@sfawd/html";

import { GlobalDrawers } from "../../GlobalDrawers";
import { Button } from "../mini-components/Button";

import { getLabels } from "../../static/strings/labels";
import { getPaths } from "../../static/strings/paths";
import { getNavStyle } from "../../static/styles/NavigationStyle";



export class Navigation extends ConstructiveView<HTMLView> {
  	constructor() {
		const mq = StateManager.get("mediaQuery").toObject().value;
		super(new HTMLView(
			{
				id: "navigation", 
				parentId: "", 
			}, 
			getNavStyle(mq).body, 
			GlobalDrawers.div()
		));
		const lang = this.myView().lang;

		const createNavBtn = (data: {
			name: string,
			label: string,
			iconPath: string,
			color?: string,
		}) => {
			const btn = new Button(
				"nav_btn_" + data.name, "",
				getNavStyle(mq).button(data.color || "#718093")
			);
		
			btn.setText(
				data.name + "_btn_text", 
				data.label, 
				{color: "inheret"}
			);
			btn.setIcon(data.name + "_btn_icon", data.iconPath);
			btn.setHover({
				color: "#f1f1f1",
				backgroundColor: (data.color || "#718093") + "88",
				transition: "250ms"
			});
					
			return btn;
		}
		
		this.addViews(
			createNavBtn({
				name: "explore",
				label: getLabels(lang).buttons.explore,
				iconPath: getPaths().explore_icon,
			}),
			createNavBtn({
				name: "favorite",
				label: getLabels(lang).buttons.favorites,
				iconPath: getPaths().favorites_icon,
				color: "#FF7675",
			}),
			createNavBtn({
				name: "dashboard",
				label: getLabels(lang).buttons.dashboard,
				iconPath: getPaths().dashboard_icon,
				color: "#545454",
			}),
			createNavBtn({
				name: "Polls",
				label: getLabels(lang).buttons.polls,
				iconPath: getPaths().polls_icon,
				color: "#718093",
			}),
			createNavBtn({
				name: "Settings",
				label: getLabels(lang).buttons.settings,
				iconPath: getPaths().settings_icon,
				color: "#36C0C8",
			})
		);
  	}
}
