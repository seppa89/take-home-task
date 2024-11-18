import { FC } from "react";
import { XMarkIcon } from "./icons";
import { useDeleteCard } from "../store";

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
