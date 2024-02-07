import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const DeleteDialog = ({ handleDelete }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={handleDelete} variant="destructive">
            Delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteDialog;
