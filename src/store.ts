import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";

type State = {
	deletedIds: Set<number>;
};

export const useStore = create<State>()(
	persist(
		() => ({
			deletedIds: new Set<number>(), // keeping deleted ids in Set will allowing to easy manipuling/toggling store
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
							deletedIds: new Set(existingValue.state.deletedIds.values()),
						},
					};
				},
				setItem: (name, newValue: StorageValue<State>) => {
					const stringValue = JSON.stringify({
						state: {
							deletedIds: [...new Set(newValue.state.deletedIds.values())],
						},
					});

					localStorage.setItem(name, stringValue);
				},
				removeItem: name => localStorage.removeItem(name),
			},
		}
	)
);
