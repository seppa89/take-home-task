import { FC } from "react";
import { ListItem } from "../api/getListData";
import { RevertButton } from "./Buttons";
import { useRevertCard } from "../store";

type CardProps = {
	title: ListItem["title"];
	id: ListItem["id"];
};

export const DeletedCard: FC<CardProps> = ({ title, id }) => {
	const { revertCard } = useRevertCard(id);
	return (
		<div className="border border-black px-2 py-1.5">
			<div className="flex justify-between mb-0.5">
				<h1 className="font-medium">{title}</h1>
				<RevertButton onClick={revertCard} />
			</div>
		</div>
	);
};
