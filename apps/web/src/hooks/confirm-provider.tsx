import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Opts = { title: string; message?: string; confirmText?: string };
type Ctx = (o: Opts) => Promise<boolean>;

const ConfirmCtx = createContext<Ctx>(() => Promise.resolve(false));
export const useConfirm = () => useContext(ConfirmCtx);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [opts, setOpts] = useState<Opts>({ title: "" });
	const resolver = useRef<(v: boolean) => void>(null);

	const confirm = useCallback((o: Opts) => {
		setOpts(o);
		setOpen(true);
		return new Promise<boolean>((res) => {
			resolver.current = res;
		});
	}, []);

	const close = (v: boolean) => {
		setOpen(false);
		resolver.current?.(v);
	};

	return (
		<ConfirmCtx.Provider value={confirm}>
			{children}
			<AlertDialog open={open} onOpenChange={(o) => !o && close(false)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{opts.title}</AlertDialogTitle>
						<AlertDialogDescription>{opts.message}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => close(false)}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={() => close(true)}>
							{opts.confirmText ?? "Confirm"}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</ConfirmCtx.Provider>
	);
};
