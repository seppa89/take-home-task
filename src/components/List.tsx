import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FC } from "react";
import { useStore } from "zustand";
import { ListItem } from "../api/getListData";
import { useStore as store, toggleCollapse } from "../store";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CardProps = {
	title: ListItem["title"];
	description: ListItem["description"];
	id: ListItem["id"];
};

export const Card: FC<CardProps> = ({ title, description, id }) => {
	const isExpanded = useStore(store, store => store.expandedIds.has(id));
	const [cardParrent] = useAutoAnimate();

	function handleExpand() {
		toggleCollapse(id);
	}

	return (
		<div className="border border-black px-2 py-1.5" ref={cardParrent}>
			<div className="flex justify-between mb-0.5">
				<h1 className="font-medium">{title}</h1>
				<div className="flex">
					<ExpandButton onClick={handleExpand}>
						{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
					</ExpandButton>
					<DeleteButton id={id} />
				</div>
			</div>
			{isExpanded && <p className="text-sm">{description}</p>}
		</div>
	);
};
