/**
 * Crunches an image file to WebP format using the browser's Canvas API.
 * This runs entirely on the client side before upload.
 * 
 * @param file - The original File object (jpg, png, etc.)
 * @param quality - Quality of the WebP image (0.0 to 1.0), default 0.8
 * @returns Promise<File> - The converted WebP file
 */
export async function convertImageToWebP(file: File, quality = 0.8): Promise<File> {
    // If it's already WebP, return as is (or re-compress if you really want)
    if (file.type === "image/webp") {
        return file;
    }

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                reject(new Error("Canvas context is not available"));
                return;
            }

            // Draw image to canvas
            ctx.drawImage(img, 0, 0);

            // Convert to WebP blob
            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        reject(new Error("Canvas to Blob conversion failed"));
                        return;
                    }

                    // Create new File from Blob
                    const fileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                    const webpFile = new File([blob], fileName, {
                        type: "image/webp",
                        lastModified: Date.now(),
                    });

                    resolve(webpFile);
                    URL.revokeObjectURL(img.src); // Cleanup
                },
                "image/webp",
                quality
            );
        };

        img.onerror = (err) => {
            URL.revokeObjectURL(img.src);
            reject(err);
        };
    });
}