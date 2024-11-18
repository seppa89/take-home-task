import { useEffect, useState } from "react";
import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";
import { Card } from "./List";
import { Spinner } from "./Spinner";
import { DeletedCard } from "./DeletedCard";

export const Entrypoint = () => {
	const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
	const listQuery = useGetListData();

	const deletedCards: DeletedListItem[] =
		listQuery.data?.filter(card => !card.isVisible) ?? [];

	useEffect(() => {
		if (listQuery.isLoading) {
			return;
		}
		setVisibleCards(listQuery.data?.filter(item => item.isVisible) ?? []);
	}, [listQuery.data, listQuery.isLoading]);

	if (listQuery.isLoading) {
		return <Spinner />;
	}

	return (
		<div className="flex gap-x-16 w-6/12">
			<div className="w-full max-w-xl">
				<h1 className="mb-1 font-medium text-lg">
					My Awesome List ({visibleCards.length})
				</h1>
				<div className="flex flex-col gap-y-3">
					{visibleCards.map(card => (
						<Card
							key={card.id}
							title={card.title}
							description={card.description}
						/>
					))}
				</div>
			</div>
			<div className="w-full max-w-xl">
				<div className="flex items-center justify-between">
					<h1 className="mb-1 font-medium text-lg">
						Deleted Cards ({deletedCards.length})
					</h1>
					<button
						disabled
						className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
					>
						Reveal
					</button>
				</div>
				<div className="flex flex-col gap-y-3">
					{deletedCards.map(card => (
						<DeletedCard key={card.id} title={card.title} />
					))}
				</div>
			</div>
		</div>
	);
};
