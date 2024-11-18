import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";
import { useStore } from "../store";
import { ToggleButton } from "./Buttons";
import { DeletedCard } from "./DeletedCard";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const Entrypoint = () => {
	const [visibleCards, setVisibleCards] = useState<ListItem[]>([]);
	const listQuery = useGetListData();

	const [revealed, setRevealed] = useState(false);

	const visibleParentRef = useRef();
	const unvisibleParentRef = useRef();

	const [visibleParent] = useAutoAnimate(visibleParentRef.current);
	const [unvisibleParent] = useAutoAnimate(unvisibleParentRef.current);

	const deletedCards: DeletedListItem[] = useMemo(
		() => listQuery.data?.filter(card => !card.isVisible) ?? [],
		[listQuery.data]
	);

	useEffect(() => {
		if (listQuery.isLoading) {
			return;
		}

		useStore.setState(store => {
			return {
				...store,
				deletedIds: new Set(deletedCards.map(card => card.id)),
			};
		});

		setVisibleCards(listQuery.data?.filter(item => item.isVisible) ?? []);
	}, [listQuery.data, listQuery.isLoading, deletedCards]);

	if (listQuery.isLoading) {
		return <Spinner />;
	}

	function handleReveal() {
		setRevealed(r => !r);
	}

	return (
		<div className="flex gap-x-16 w-6/12">
			<div className="w-full max-w-xl">
				<h1 className="mb-1 font-medium text-lg">
					My Awesome List ({visibleCards.length})
				</h1>
				<div className="flex flex-col gap-y-3" ref={visibleParent}>
					{visibleCards.map(card => (
						<Card
							key={card.id}
							title={card.title}
							description={card.description}
							id={card.id}
						/>
					))}
				</div>
			</div>
			<div className="w-full max-w-xl">
				<div className="flex items-center justify-between">
					<h1 className="mb-1 font-medium text-lg">
						Deleted Cards ({deletedCards.length})
					</h1>
					<ToggleButton
						disabled={deletedCards.length === 0}
						onClick={handleReveal}
					>
						{revealed ? "Hide" : "Reveal"}
					</ToggleButton>
				</div>
				<div className="flex flex-col gap-y-3" ref={unvisibleParent}>
					{revealed &&
						deletedCards.map(card => (
							<DeletedCard key={card.id} title={card.title} />
						))}
				</div>
			</div>
		</div>
	);
};
