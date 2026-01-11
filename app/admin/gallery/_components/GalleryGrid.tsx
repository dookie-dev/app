"use client";

import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Chip,
} from "@nextui-org/react";
import { Trash2, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function GalleryGrid({ initialData }: { initialData: any[] }) {
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Deleted");
      router.refresh();
    }
  };

  if (initialData.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        No images or reviews found. Upload one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {initialData.map((item) => (
        <Card key={item.id} className="shadow-sm border border-gray-100">
          <CardBody className="p-0 aspect-square relative overflow-hidden group">
            <Image
              src={item.image_url}
              alt={item.title || "Gallery Image"}
              classNames={{
                wrapper: "w-full h-full",
                img: "w-full h-full object-cover",
              }}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                isIconOnly
                color="danger"
                variant="flat"
                onPress={() => handleDelete(item.id)}
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </CardBody>
          <CardFooter className="flex-col items-start gap-1 p-3">
            <div className="flex justify-between w-full items-center">
              <Chip
                size="sm"
                color={item.type === "review" ? "secondary" : "primary"}
                variant="flat"
                className="capitalize"
              >
                {item.type}
              </Chip>
              {item.rating && (
                <div className="flex items-center text-xs text-yellow-500 font-bold gap-1">
                  <Star size={12} fill="currentColor" /> {item.rating}
                </div>
              )}
            </div>
            {item.caption && (
              <p className="text-xs text-gray-500 line-clamp-2">
                {item.caption}
              </p>
            )}
            {item.customer_name && (
              <p className="text-xs font-bold text-gray-700">
                - {item.customer_name}
              </p>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
