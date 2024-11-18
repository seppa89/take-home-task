import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

type CardProps = {
	title: ListItem["title"];
	description: ListItem["description"];
};

export const Card: FC<CardProps> = ({ title, description }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	function handleExpand() {
		setIsExpanded(e => !e);
	}

	return (
		<div className="border border-black px-2 py-1.5">
			<div className="flex justify-between mb-0.5">
				<h1 className="font-medium">{title}</h1>
				<div className="flex">
					<ExpandButton onClick={handleExpand}>
						{isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
					</ExpandButton>
					<DeleteButton />
				</div>
			</div>
			{isExpanded && <p className="text-sm">{description}</p>}
		</div>
	);
};
