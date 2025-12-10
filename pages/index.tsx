"use client";

import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { Zap, Aperture, Loader2 } from "lucide-react"; 
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { isLoading, responseData, generatedImages, fetchData } =
    useFetchData<any, { prompt: string }>();

  const handleGenerateImage = () => {
    if (!prompt.trim() || isLoading) return;
    fetchData("/api/generate-image", { prompt });
  };

  useEffect(() => {
    if (!isLoading && responseData?.message) {
      setImageUrl(responseData.message);
    }
  }, [isLoading, responseData]);

  const promptSuggestions = [
    "A majestic lion in watercolor style",
    "Cyberpunk city at night with neon lights",
    "Cute baby cat wearing sunglasses",
    "Modern house surrounded by trees, photorealistic",
    "Beautiful African queen portrait, ultra detailed",
  ];
  
  const MainImageOrPlaceholder = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full max-w-xl bg-gray-700/50 rounded-2xl h-64 sm:h-80 md:h-96 shadow-xl border border-purple-500/30">
          <Loader2 className="animate-spin h-10 w-10 text-purple-400" />
          <p className="ml-4 text-xl font-medium text-gray-300">
            Hana is creating your vision...
          </p>
        </div>
      );
    }

    if (imageUrl) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          <ImageCard
            action={() => setImageUrl(imageUrl)} // 
            imageUrl={imageUrl}
            prompt={prompt}
            width="w-full"
            height="h-64 sm:h-80 md:h-96"
          />
        </motion.div>
      );
    }
    
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-xl bg-gray-900/40 rounded-3xl h-64 sm:h-80 md:h-96 border border-purple-500/20 text-gray-400 p-6 shadow-2xl">
        <Zap className="h-12 w-12 text-purple-500 mb-3" />
        <p className="text-xl font-semibold">Start creating!</p>
        <p className="text-sm text-center mt-1">Enter a prompt below to generate your first AI masterpiece.</p>
      </div>
    );
  };


  return (
    <div className="min-h-screen w-full bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mb-12 p-8 rounded-[40px] 
        bg-white/5 backdrop-blur-md border border-purple-500/10 shadow-3xl"
      >
        <h1 className="text-5xl sm:text-6xl font-black text-transparent 
          bg-clip-text bg-gradient-to-r from-teal-400 to-sky-500 drop-shadow-neon">
          Hana’s Visionary AI
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mt-4 tracking-tight font-light">
          Unleash your creativity. Turn imagination into stunning, unique visuals.
        </p>
      </motion.div>

      {/* Main Image Area */}
      <div className="mb-8 w-full max-w-xl flex justify-center">
        <MainImageOrPlaceholder />
      </div>

      {/* Prompt Input + Generator */}
      <div className="w-full max-w-xl bg-gray-900/60 backdrop-blur-md p-6 rounded-3xl shadow-4xl border border-purple-500/20">
        
        {/* Input Field */}
        <div className="relative mb-4">
          <Aperture className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 w-6 h-6" />

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateImage()}
            placeholder="Describe your masterpiece..."
            disabled={isLoading}
            className="w-full pl-14 pr-4 py-4 rounded-2xl bg-gray-800/80 text-white
              border border-gray-700 focus:border-sky-500 focus:ring-4 
              focus:ring-sky-500/30 outline-none transition-all duration-300 
              placeholder-gray-500 shadow-inner disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>

        {/* Suggestion Pills */}
        <div className="flex overflow-x-auto gap-3 pb-3 mb-4 custom-scrollbar">
          {promptSuggestions.map((item, i) => (
            <motion.button
              whileTap={{ scale: 0.95 }}
              key={i}
              onClick={() => {
                setPrompt(item);
                
              }}
              disabled={isLoading}
              className="px-4 py-2 rounded-full bg-sky-600/10 border border-sky-600/30 
                text-sky-300 text-sm hover:bg-sky-600/30 hover:text-white transition 
                backdrop-blur-sm whitespace-nowrap disabled:opacity-50"
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerateImage}
          disabled={isLoading || !prompt.trim()}
          className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-xl transition-all duration-300 
            ${isLoading || !prompt.trim()
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-sky-600 shadow-purple-500/40 hover:shadow-sky-500/60"
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Creating Vision...
            </span>
          ) : (
            "Generate Image"
          )}
        </motion.button>
      </div>

      {/* Gallery Section */}
      {generatedImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 w-full max-w-6xl px-2 sm:px-4"
        >
          <h3 className="text-4xl font-extrabold mb-8 text-center text-transparent 
            bg-clip-text bg-gradient-to-r from-sky-400 to-teal-400">
            <Zap className="inline-block mr-3 h-8 w-8 text-sky-400 align-text-bottom" />
            Gallery & History
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 
            lg:grid-cols-5 gap-6 p-8 bg-gray-900/60 backdrop-blur-md 
            rounded-[3rem] border border-purple-500/20 shadow-4xl">
            {generatedImages.map(({ imageUrl, prompt }: ImageProps, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: index * 0.05 }}
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl overflow-hidden shadow-2xl shadow-black/60 cursor-pointer"
                onClick={() => setImageUrl(imageUrl)} // Set as main image on click
              >
                <ImageCard
                  action={() => setImageUrl(imageUrl)}
                  imageUrl={imageUrl}
                  prompt={prompt}
                  width="w-full"
                  height="h-32 sm:h-40 lg:h-48"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;