import { FC } from "react";
import { useGetListData } from "../api/getListData";
import { useDeleteCard } from "../store";
import { RevertIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<button
			className="hover:text-gray-700 transition-colors flex items-center justify-center"
			{...props}
		>
			{children}
		</button>
	);
};

export const DeleteButton: FC<
	Omit<ButtonProps, "children" | "id"> & { id: number }
> = ({ id, ...props }) => {
	const { deleteCard } = useDeleteCard(id);
	return (
		<button
			className="hover:text-gray-700 transition-colors flex items-center justify-center"
			onClick={deleteCard}
			{...props}
		>
			<XMarkIcon />
		</button>
	);
};

export const ToggleButton: FC<ButtonProps> = ({ ...props }) => {
	return (
		<button
			className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1 w-20"
			{...props}
		>
			{props.children}
		</button>
	);
};

export const RefreshButton: FC<ButtonProps> = () => {
	const { refetch, fetchStatus } = useGetListData();

	async function handleRefresh() {
		await refetch();
	}

	return (
		<button
			className="hover:text-gray-200 hover:bg-gray-800 transition-colors bg-black text-white rounded-lg py-1 px-1.5 mt-5 ml-5 text-sm w-20"
			onClick={handleRefresh}
			disabled={fetchStatus === "fetching"}
		>
			{fetchStatus === "fetching" ? "Wait" : "Refresh"}
		</button>
	);
};

type RevertButtonProps = Omit<ButtonProps, "children">;

export const RevertButton: FC<RevertButtonProps> = ({ ...props }) => {
	return (
		<button
			className="hover:text-gray-700 transition-colors flex items-center justify-center"
			{...props}
		>
			<RevertIcon />
		</button>
	);
};
