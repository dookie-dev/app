"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { convertImageToWebP } from "@/lib/imageUtils";

interface MultiImageUploaderProps {
  images: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
  folder?: string;
  fileNamePrefix?: string;
}

export default function MultiImageUploader({
  images = [],
  onChange,
  disabled,
  folder = "gallery",
  fileNamePrefix = "image",
}: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Optimize & Convert to WebP
        const webpFile = await convertImageToWebP(file);

        const uniqueSuffix = Math.random().toString(36).substring(7);
        const cleanPrefix = fileNamePrefix
          .replace(/[^a-z0-9-]/gi, "-")
          .toLowerCase();
        const fileName = `${cleanPrefix}-${uniqueSuffix}.webp`;
        const filePath = `${folder}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("images")
          .upload(filePath, webpFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("images").getPublicUrl(filePath);
        newUrls.push(data.publicUrl);
      }

      onChange([...images, ...newUrls]);
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload some images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group"
          >
            <Image
              src={url}
              alt={`Gallery ${index}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur rounded-full shadow-sm text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <label className="relative aspect-square rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors hover:border-brand-primary/50">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading || disabled}
          />
          {uploading ? (
            <div className="animate-spin text-brand-primary">
              <Upload size={24} />
            </div>
          ) : (
            <>
              <ImageIcon className="text-gray-400 mb-2" size={24} />
              <span className="text-xs text-center font-medium text-gray-500 px-2">
                Add Images
              </span>
            </>
          )}
        </label>
      </div>
      <p className="text-xs text-gray-400">
        Supported: JPG, PNG, WEBP. Recommended size: 1000x1000.
      </p>
    </div>
  );
}
