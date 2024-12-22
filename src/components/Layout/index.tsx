import { FC, ReactNode, useEffect } from "react";
import { Titlebar } from "../Titlebar";

const { ipcRenderer } = window.require("electron");

export interface ILayout {
	children: ReactNode;
}

export const Layout: FC<ILayout> = ({ children }) => {
	return (
		<>
			<Titlebar />
			<div className="select-none">{children}</div>
		</>
	);
};
