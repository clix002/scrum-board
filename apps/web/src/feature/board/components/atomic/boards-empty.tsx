import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";

type BoardsEmptyProps = {
	onCreate: () => void;
};

export const BoardsEmpty = ({ onCreate }: BoardsEmptyProps) => {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No boards yet</EmptyTitle>
				<EmptyDescription>
					Create your first board to get started.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button onClick={onCreate}>Create Board</Button>
			</EmptyContent>
		</Empty>
	);
};
