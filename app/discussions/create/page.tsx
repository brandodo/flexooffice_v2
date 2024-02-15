"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useCreateDiscussion } from "./useCreateDiscussion";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

const Create = () => {
  const {
    title,
    setTitle,
    body,
    setBody,
    handleCreateDiscussion,
    getRootProps,
    getInputProps,
    imagePreview,
    loading,
  } = useCreateDiscussion();

  return (
    <main className="h-full flex">
      <form
        onSubmit={handleCreateDiscussion}
        className="flex flex-col gap-6 p-6 w-full"
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
            disabled={loading}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="body">Body</Label>
          <Textarea
            id="body"
            placeholder="Enter the body of the discussion"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex flex-col w-full max-w-md gap-1.5">
          <Label htmlFor="image">Image</Label>

          <div
            {...getRootProps()}
            className="transition-all ease-in-out border border-dashed border-2 rounded-lg p-2 flex flex-col justify-center items-center hover:cursor-pointer hover:bg-gray-100"
          >
            <input
              {...getInputProps()}
              id="image"
              accept="image/*"
              className="w-24 h-24"
              disabled={loading}
            />
            <div>
              {imagePreview?.length > 0 && (
                <img
                  src={imagePreview}
                  alt="image to upload"
                  className="w-24 h-24 object-cover object-center"
                />
              )}
            </div>
            Upload or drag {imagePreview ? "a different" : "an"} image!
          </div>
        </div>

        <div className="flex gap-2 items-center absolute bottom-6 right-6 sm:relative sm:w-full sm:bottom-0 sm:right-0 sm:justify-end">
          <Link href="/discussions" className="border px-4 py-2 rounded">
            Back
          </Link>
          <Button type="submit" disabled={!title || !body || loading}>
            Create Discussion
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Create;
