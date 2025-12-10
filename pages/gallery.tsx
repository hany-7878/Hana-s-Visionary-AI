import React, { useEffect, useState } from "react";
import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";

const LOCAL_KEY = "imagegen_generated_images_v1";

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<ImageProps[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      setImages(raw ? JSON.parse(raw) : []);
    } catch {
      setImages([]);
    }
  }, []);

  const handleView = (url: string) => {
    // open in new tab
    window.open(url, "_blank");
  };

  const clearGallery = () => {
    localStorage.removeItem(LOCAL_KEY);
    setImages([]);
  };

  return (
   
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Gallery</h1>
          <div>
            <button onClick={clearGallery} className="px-3 py-1 bg-red-500 text-white rounded">
              Clear Gallery
            </button>
          </div>
        </div>

        {images.length === 0 ? (
          <p className="text-gray-600">No generated images yet. Generate one from the home page.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <ImageCard key={idx} imageUrl={img.imageUrl} prompt={img.prompt} action={handleView} width="w-full" />
            ))}
          </div>
        )}
      </div>
  
  );
};

export default GalleryPage;
