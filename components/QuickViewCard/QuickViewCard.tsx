import React from "react";
import { Card, CardContent } from "../ui/card";
import { DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const QuickViewCard = ({ title, scheduledDate, onClick, className }) => {
  return (
    <Card className={className}>
      <CardContent className="flex justify-between items-center py-5">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-slate-300">
            {new Date(scheduledDate).toDateString()}
          </p>
        </div>
        <DialogTrigger>
          <Button size="icon" variant="ghost" onClick={onClick}>
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </DialogTrigger>
      </CardContent>
    </Card>
  );
};

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

export default QuickViewCard;
