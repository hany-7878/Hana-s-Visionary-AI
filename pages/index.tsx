"use client";

import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { Zap, Aperture } from "lucide-react";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { isLoading, responseData, generatedImages, fetchData } =
    useFetchData<any, { prompt: string }>();

  const handleGenerateImage = () => {
    if (!prompt.trim()) return;
    fetchData("/api/generate-image", { prompt });
  };

  useEffect(() => {
    if (!isLoading) {
      setImageUrl(responseData?.message);
    }
  }, [isLoading, responseData]);

  const promptSuggestions = [
    "A majestic lion in watercolor style",
    "Cyberpunk city at night with neon lights",
    "Cute baby cat wearing sunglasses",
    "Modern house surrounded by trees, photorealistic",
    "Beautiful African queen portrait, ultra detailed",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col items-center px-4 py-12">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-2xl mb-12 p-6 rounded-3xl 
        bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent 
          bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 drop-shadow-lg">
          Hana’s Visionary AI
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mt-2 tracking-wide">
          Turn imagination into stunning visuals — instantly.
        </p>
      </motion.div>

      {/* Main Generated Image */}
      {responseData?.message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 w-full max-w-xl"
        >
          <ImageCard
            action={() => setImageUrl(imageUrl)}
            imageUrl={imageUrl}
            prompt={prompt}
            width="w-full"
            height="h-64 sm:h-80 md:h-96"
          />
        </motion.div>
      )}

      {/* Prompt Input + Generator */}
      <div className="w-full max-w-lg bg-white/5 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10">
        
        {/* Input Field */}
        <div className="relative mb-4">
          <Aperture className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 w-6 h-6" />

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe something magical..."
            className="w-full pl-14 pr-4 py-4 rounded-2xl bg-gray-900/60 text-white
              border border-gray-700 focus:border-purple-500 focus:ring-2 
              focus:ring-purple-500/40 outline-none transition-all duration-300 
              placeholder-gray-500 shadow-inner"
          />
        </div>

        {/* Suggestion Pills */}
        <div className="flex overflow-x-auto gap-3 pb-3 mb-4 custom-scrollbar">
          {promptSuggestions.map((item, i) => (
            <motion.button
              whileTap={{ scale: 0.9 }}
              key={i}
              onClick={() => setPrompt(item)}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 
                text-gray-200 hover:bg-white/20 hover:text-white transition 
                backdrop-blur-xl shadow-lg whitespace-nowrap"
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateImage}
          className="w-full py-4 rounded-2xl font-semibold bg-gradient-to-r 
            from-purple-600 to-pink-600 text-white shadow-lg 
            shadow-purple-500/40 hover:shadow-purple-600/60 transition-all"
        >
          {isLoading ? "Creating Magic..." : "Generate Image"}
        </motion.button>
      </div>

      {/* Gallery Section */}
      {generatedImages.length > 0 && (
        <div className="mt-12 w-full max-w-6xl px-2 sm:px-4">
          <h3 className="text-3xl font-bold mb-6 text-center text-gray-300 
            border-b border-white/10 pb-3">
            Gallery & History
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            lg:grid-cols-4 gap-6 p-6 bg-white/5 backdrop-blur-xl 
            rounded-3xl border border-white/10 shadow-xl">
            {generatedImages.map(({ imageUrl, prompt }: ImageProps, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-xl overflow-hidden shadow-lg shadow-black/40"
              >
                <ImageCard
                  action={() => setImageUrl(imageUrl)}
                  imageUrl={imageUrl}
                  prompt={prompt}
                  width="w-full"
                  height="h-56 sm:h-60"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
