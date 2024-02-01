import { toast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react/hooks";
import { redirect, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

export const useCreateDiscussion = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader");

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const handleCreateDiscussion = async (e) => {
    e.preventDefault();

    toast({
      title: "Creating discussion...",
    });

    setLoading(true);

    let imageUploadRes:
      | {
          name: string;
          size: number;
          key: string;
          serverData: {
            uploadedBy: string;
          };
          url: string;
        }[]
      | undefined;

    try {
      if (selectedImage) {
        imageUploadRes = await startUpload(selectedImage);
      }

      const response = await fetch("/api/discussions", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          image: imageUploadRes?.[0]?.url ?? "",
        }),
      });

      if (response.ok) {
        toast({
          title: "Discussion created!",
          variant: "success",
        });

        router.replace("/discussions");
        router.refresh();
      }
    } catch (err: any) {
      toast({
        title: "Error creating discussion",
        variant: "destructive",
        description: err.message,
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const imagePreview = useMemo(() => {
    return selectedImage ? URL.createObjectURL(selectedImage[0]) : "";
  }, [selectedImage]);

  return {
    title,
    setTitle,
    body,
    setBody,
    handleCreateDiscussion,
    getRootProps,
    getInputProps,
    imagePreview,
    loading,
  };
};
