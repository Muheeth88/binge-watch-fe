import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const CustomDialog = (props) => {
	const { triggerBtnText, heading, desc, handleCancel, cancelBtnText, handleContinue, continueBtnText } = props;
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="outline" size="sm">
					{triggerBtnText}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{heading}</AlertDialogTitle>
					<AlertDialogDescription>{desc}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={handleCancel}>{cancelBtnText || "Cancel"}</AlertDialogCancel>
					<AlertDialogAction onClick={handleContinue}>{continueBtnText || "Continue"}</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default CustomDialog;
