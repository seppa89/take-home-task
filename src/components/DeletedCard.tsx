import { FC } from "react";
import { ListItem } from "../api/getListData";

type CardProps = {
	title: ListItem["title"];
};

export const DeletedCard: FC<CardProps> = ({ title }) => {
	return (
		<div className="border border-black px-2 py-1.5">
			<div className="flex justify-between mb-0.5">
				<h1 className="font-medium">{title}</h1>
			</div>
		</div>
	);
};
