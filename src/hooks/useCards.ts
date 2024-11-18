import { useEffect, useMemo } from "react";
import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";
import { useStore } from "../store";

export const useCards = () => {
	const listQuery = useGetListData();

	const deletedCards: DeletedListItem[] = useMemo(
		() => listQuery.data?.filter(card => !card.isVisible) ?? [],
		[listQuery.data]
	);

	const visibleCards: ListItem[] =
		listQuery.data?.filter(item => item.isVisible) ?? [];

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
	}, [deletedCards, listQuery.isLoading]);

	return { listQuery, deletedCards, visibleCards };
};
