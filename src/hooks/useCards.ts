import { DeletedListItem, ListItem, useGetListData } from "../api/getListData";

export const useCards = () => {
	const listQuery = useGetListData();

	const visibleCards: ListItem[] =
		listQuery.data?.filter(item => item.isVisible) ?? [];
	const deletedCards: DeletedListItem[] =
		listQuery.data?.filter(item => !item.isVisible) ?? [];

	return { listQuery, deletedCards, visibleCards };
};
