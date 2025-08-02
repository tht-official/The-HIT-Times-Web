export default async function uploadFile(data: any) {
  try {
    // Extract the uploaded image from the file input
    const image = data[0];

    // Compress the image using canvas before uploading
    const compressedImage = await compressImage(image);

    // Create an instance of FormData
    const formData = new FormData();

    // Append the compressed image to the FormData
    formData.append("file", compressedImage, image.name);

    // Bind the upload preset "recruitment" (Cloudinary) to the FormData
    formData.append("upload_preset", "recruitment");

    // Make an API request to the_hit_times Cloudinary upload endpoint
    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dvw5qhccb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    // Parse the response data
    const uploadedImageData = await uploadResponse.json();

    // Extract the secure URL of the uploaded image
    const imageUrl = uploadedImageData.secure_url;

    // Print the URL on console
    console.log(imageUrl);

    // Return the secure image URL
    return imageUrl;
  } catch (e) {
    console.log(e);
  }
}

// Helper function to compress an image using canvas before uploading
async function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    // Load file as data URL for image preview and canvas drawing
    reader.onload = () => {
      img.src = reader.result as string;
    };

    // Once image is loaded, draw to canvas and compress to JPEG
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match original image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx?.drawImage(img, 0, 0);

      // Convert canvas to compressed JPEG Blob (quality = 70%)
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject("Compression failed");
        },
        "image/jpeg",
        0.7 // Adjust this value (0–1) to control compression quality
      );
    };

    // Handle errors in file reading
    reader.onerror = reject;

    // Start reading the image file
    reader.readAsDataURL(file);
  });
}
