import { Card, CardDescription, CardTitle } from "@/components/ui/card";

type CreateBoardCardProps = {
	onclick?: () => void;
};

export const CreateBoardCard = ({ onclick }: CreateBoardCardProps) => {
	return (
		<Card
			className="border-dashed border-2 border-muted-foreground/50 hover:border-primary/55 transition-colors"
			onClick={onclick}
		>
			<CardDescription className="flex flex-col items-center justify-center h-full">
				<CardTitle className="text-center select-none">Create Board</CardTitle>
			</CardDescription>
		</Card>
	);
};
