"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { convertImageToWebP } from "@/lib/imageUtils";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  folder?: string;
  fileNamePrefix?: string;
}

export default function ImageUploader({
  value,
  onChange,
  disabled,
  folder = "menu",
  fileNamePrefix = "image",
}: ImageUploaderProps) {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Optimize & Convert to WebP
      const webpFile = await convertImageToWebP(file);

      // SEO-friendly filename: prefix-random.webp
      const uniqueSuffix = Math.random().toString(36).substring(7);
      const cleanPrefix = fileNamePrefix
        .replace(/[^a-z0-9-]/gi, "-")
        .toLowerCase();
      const fileName = `${cleanPrefix}-${uniqueSuffix}.webp`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("images") // Bucket name
        .upload(filePath, webpFile);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage.from("images").getPublicUrl(filePath);

      onChange(data.publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(
        'Error uploading image. Make sure your Storage Bucket "images" is created and public.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center overflow-hidden hover:bg-gray-100 transition-colors">
        {value ? (
          <>
            <Image src={value} alt="Preview" fill className="object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50 text-red-500"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500 font-medium">
              Click to upload image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={loading || disabled}
            />
          </label>
        )}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <span className="text-sm font-medium text-brand-primary">
              Uploading...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
