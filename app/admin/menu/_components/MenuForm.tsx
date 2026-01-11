"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Textarea,
  Card,
  CardBody,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/admin/ui/ImageUploader";
import MultiImageUploader from "@/components/admin/ui/MultiImageUploader";
import { toast } from "sonner";

// Simple UUID generator for client-side ID creation
function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

interface MenuFormProps {
  initialData?: any;
  initialGallery?: string[];
}

export default function MenuForm({
  initialData,
  initialGallery = [],
}: MenuFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    category: initialData?.category || "classic",
    status: initialData?.status || "available",
    image_url: initialData?.image_url || "",
    tags: initialData?.tags?.join(", ") || "",
  });
  const [galleryImages, setGalleryImages] = useState<string[]>(initialGallery);

  // Generate ID for new items immediately so we can use it for folders
  const menuId = useMemo(
    () => initialData?.id || generateUUID(),
    [initialData],
  );

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price) || 0,
        category: formData.category,
        status: formData.status,
        image_url: formData.image_url,
        tags: formData.tags
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
        // For new items, we MUST enforce the ID we generated
        ...(initialData?.id ? {} : { id: menuId }),
      };

      let error;

      if (initialData?.id) {
        // Update Menu
        const { error: updateError } = await supabase
          .from("menus")
          .update(payload)
          .eq("id", menuId);

        error = updateError;
      } else {
        // Create Menu with specific ID
        const { error: insertError } = await supabase
          .from("menus")
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      // Handle Gallery Sync
      // 1. Delete existing gallery images for this menu (simpler than syncing diffs for now)
      // Only delete type 'gallery', preserve 'review' if any
      // Note: For create, this does nothing. For update, it clears and re-adds.
      await supabase
        .from("gallery")
        .delete()
        .eq("menu_id", menuId)
        .eq("type", "gallery");

      // 2. Insert new images
      if (galleryImages.length > 0) {
        const galleryPayload = galleryImages.map((url) => ({
          menu_id: menuId,
          image_url: url,
          type: "gallery",
          title: formData.name, // optional
          created_at: new Date().toISOString(),
        }));

        const { error: galleryError } = await supabase
          .from("gallery")
          .insert(galleryPayload);

        if (galleryError) {
          console.error("Gallery sync error:", galleryError);
          toast.error("Menu saved but gallery upload failed.");
        }
      }

      toast.success(initialData?.id ? "Menu updated!" : "Menu created!");
      router.push("/admin/menu");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving menu:", err);
      toast.error(err.message || "Failed to save menu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardBody className="gap-4 p-6">
            <Tabs aria-label="Menu Options">
              <Tab key="basic" title="Basic Info">
                <div className="space-y-4 pt-4">
                  <Input
                    label="Product Name"
                    placeholder="e.g. Classic Chocolate Chip"
                    value={formData.name}
                    onValueChange={(v) => handleChange("name", v)}
                    isRequired
                  />
                  <Textarea
                    label="Description"
                    placeholder="Describe the taste and texture..."
                    value={formData.description}
                    onValueChange={(v) => handleChange("description", v)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Price (฿)"
                      type="number"
                      placeholder="0.00"
                      value={formData.price.toString()}
                      onValueChange={(v) => handleChange("price", v)}
                      isRequired
                      startContent={<span className="text-default-400">฿</span>}
                    />
                    <Select
                      label="Category"
                      defaultSelectedKeys={[formData.category]}
                      onChange={(e) => handleChange("category", e.target.value)}
                    >
                      <SelectItem key="classic" value="classic">
                        Classic
                      </SelectItem>
                      <SelectItem key="premium" value="premium">
                        Premium
                      </SelectItem>
                      <SelectItem key="filled" value="filled">
                        Filled (Sod Sai)
                      </SelectItem>
                      <SelectItem key="special" value="special">
                        Special
                      </SelectItem>
                      <SelectItem key="brownie" value="brownie">
                        Brownie
                      </SelectItem>
                      <SelectItem key="set" value="set">
                        Gift Set
                      </SelectItem>
                    </Select>
                  </div>
                  <Input
                    label="SEO Tags (Keywords)"
                    placeholder="soft cookie, chocolate, gift, bakery (comma separated)"
                    value={formData.tags}
                    onValueChange={(v) => handleChange("tags", v)}
                    description="These tags will be used for SEO keywords."
                  />
                </div>
              </Tab>
              <Tab key="gallery" title="Gallery & Media">
                <div className="space-y-4 pt-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-600 mb-4">
                    Upload additional images here. These will show on the
                    product details page and the main gallery.
                  </div>
                  <MultiImageUploader
                    images={galleryImages}
                    onChange={setGalleryImages}
                    folder={`menu/${menuId}/gallery`}
                    fileNamePrefix={slugify(formData.name)}
                  />
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardBody className="gap-4 p-6">
            <h3 className="font-bold text-lg mb-2">Main Image</h3>
            <div className="text-xs text-gray-400 mb-2">ID: {menuId}</div>
            <Select
              label="Status"
              defaultSelectedKeys={[formData.status]}
              onChange={(e) => handleChange("status", e.target.value)}
              color={
                formData.status === "available"
                  ? "success"
                  : formData.status === "out_of_stock"
                  ? "danger"
                  : "warning"
              }
            >
              <SelectItem key="available" value="available">
                Available
              </SelectItem>
              <SelectItem key="out_of_stock" value="out_of_stock">
                Out of Stock
              </SelectItem>
              <SelectItem key="hidden" value="hidden">
                Hidden
              </SelectItem>
            </Select>

            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">
                Primary Thumbnail
              </label>
              <ImageUploader
                value={formData.image_url}
                onChange={(url) => handleChange("image_url", url)}
                folder={`menu/${menuId}`}
                fileNamePrefix={slugify(formData.name)}
              />
            </div>
          </CardBody>
        </Card>

        <Button
          type="submit"
          color="primary"
          fullWidth
          size="lg"
          isLoading={loading}
          className="font-bold shadow-soft"
        >
          {initialData ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
