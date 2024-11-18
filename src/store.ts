import { useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";
import { ListItem } from "./api/getListData";

type State = {
	deletedIds: Set<number>;
	expandedIds: Set<number>;
};

export const useStore = create<State>()(
	persist(
		() => ({
			deletedIds: new Set<number>(), // keeping deleted ids in Set will allowing to easy manipuling/toggling store
			expandedIds: new Set<number>(),
		}),
		{
			name: "settings",
			storage: {
				getItem: name => {
					const stringValue = localStorage.getItem(name);

					if (!stringValue) return null;
					const existingValue = JSON.parse(stringValue) as StorageValue<State>;

					return {
						state: {
							expandedIds: new Set(existingValue.state.expandedIds.values()),
							deletedIds: new Set(existingValue.state.deletedIds.values()),
						},
					};
				},
				setItem: (name, newValue: StorageValue<State>) => {
					const stringValue = JSON.stringify({
						state: {
							deletedIds: [...new Set(newValue.state.deletedIds.values())],
							expandedIds: [...new Set(newValue.state.expandedIds.values())],
						},
					});

					localStorage.setItem(name, stringValue);
				},
				removeItem: name => localStorage.removeItem(name),
			},
		}
	)
);

export function useDeleteCard(id: number) {
	const queryClient = useQueryClient();

	function deleteCard() {
		queryClient.setQueryData<ListItem[]>(["list"], cards => {
			useStore.setState(store => {
				return {
					...store,
					deletedIds: new Set(store.deletedIds).add(id),
				};
			});

			return cards?.map(card => {
				if (card.id === id) {
					return {
						...card,
						isVisible: false,
					};
				}
				return card;
			});
		});
	}

	return { deleteCard };
}

export function toggleCollapse(id: number) {
	useStore.setState(state => {
		const exists = state.expandedIds.has(id);

		if (exists) {
			state.expandedIds.delete(id);
		} else {
			state.expandedIds.add(id);
		}

		return {
			...state,
		};
	});
}
