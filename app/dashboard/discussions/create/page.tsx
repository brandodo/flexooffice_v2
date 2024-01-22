"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useCreateDiscussion } from "./useCreateDiscussion";

const Create = () => {
  const { title, setTitle, body, setBody, handleCreateDiscussion } =
    useCreateDiscussion();

  return (
    <main className="flex justify-center">
      <form
        onSubmit={handleCreateDiscussion}
        className="flex flex-col gap-6 p-4 md:p-6 w-3/4"
      >
        <h1 className="text-2xl font-bold">Create Discussion</h1>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter the title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="body">Body</Label>
          <Textarea
            id="body"
            placeholder="Enter the body of the discussion"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-md items-center gap-1.5">
          <Label htmlFor="images">Images</Label>
          <Input id="images" multiple type="file" />
        </div>
        <Button className="w-full md:w-auto" type="submit">
          Create Discussion
        </Button>
      </form>
    </main>
  );
};

export default Create;
