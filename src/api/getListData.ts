import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";
import { useStore } from "../store";

export type ListItem = {
	id: number;
	title: string;
	description: string;
	isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

export const useGetListData = () => {
	const query = useQuery({
		queryKey: ["list"],
		queryFn: async () => {
			await sleep(1000);

			if (getRandom() > 85) {
				console.error("An unexpected error occurred!");
				throw new Error("👀");
			}

			const mockData = mockJson as Omit<ListItem, "isVisible">[];

			const existingDeletedIds = useStore.getState().deletedIds;

			if (existingDeletedIds.size > 0) {
				return mockData.map(item => {
					return existingDeletedIds.has(item.id)
						? { ...item, isVisible: false }
						: { ...item, isVisible: true };
				});
			}

			const freshDeletedIds = new Set<number>();
			const list = shuffle(mockData).map(item => {
				const isVisible = getRandom() > 50 ? true : false;

				if (!isVisible) {
					freshDeletedIds.add(item.id);
				}

				return { ...item, isVisible };
			});

			useStore.setState(store => ({
				...store,
				deletedIds: new Set(freshDeletedIds),
			}));

			return list;
		},
	});

	return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shuffle = <T extends any[]>(array: T): T => {
	for (let i = array.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
};
