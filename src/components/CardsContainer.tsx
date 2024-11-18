import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRef, useState } from "react";
import { useCards } from "../hooks/useCards";
import { ToggleButton } from "./Buttons";
import { DeletedCard } from "./DeletedCard";
import { Card } from "./List";
import { Spinner } from "./Spinner";

export const CardsContainer = () => {
	const { listQuery, deletedCards, visibleCards } = useCards();

	const [revealed, setRevealed] = useState(false);

	const visibleParentRef = useRef();
	const unvisibleParentRef = useRef();

	const [visibleParent] = useAutoAnimate(visibleParentRef.current);
	const [unvisibleParent] = useAutoAnimate(unvisibleParentRef.current);

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
					{deletedCards.length > 0 && (
						<ToggleButton
							disabled={deletedCards.length === 0}
							onClick={handleReveal}
						>
							{revealed ? "Hide" : "Reveal"}
						</ToggleButton>
					)}
				</div>
				<div className="flex flex-col gap-y-3" ref={unvisibleParent}>
					{revealed &&
						deletedCards.map(card => (
							<DeletedCard key={card.id} title={card.title} id={card.id} />
						))}
				</div>
			</div>
		</div>
	);
};
