import { useQueryClient } from "@tanstack/react-query";
import { useStore } from "zustand";
import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";
import { useStore as store } from "../store";
import { useEffect } from "react";

export const useCards = () => {
	const listQuery = useGetListData();
	const deletedIds = useStore(store, store => store.deletedIds);
	const queryClient = useQueryClient();

	let visibleCards: ListItem[] = [];
	let deletedCards: DeletedListItem[];

	if (deletedIds.size > 0) {
		deletedCards =
			listQuery.data?.filter(item => deletedIds.has(item.id)) ?? [];
	} else {
		deletedCards = listQuery.data?.filter(item => !item.isVisible) ?? [];
	}

	visibleCards =
		listQuery.data?.filter(item => !deletedCards.includes(item)) ?? [];

	useEffect(() => {
		queryClient.setQueryData<ListItem[]>(["list"], cards => {
			return cards?.map(card => {
				if (deletedIds.has(card.id)) {
					return {
						...card,
						isVisible: false,
					};
				} else {
					return {
						...card,
						isVisible: true,
					};
				}
			});
		});
	}, [queryClient, deletedIds]);

	return { listQuery, deletedCards, visibleCards };
};
