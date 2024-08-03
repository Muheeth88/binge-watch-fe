import React from "react";
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
    DialogFooter,
	DialogTrigger,
} from "@/components/ui/dialog";

const LoginPopup = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button type="submit">Login</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LoginPopup
