import React, { useState } from "react";
import { GeneratedImageProps } from "@/interfaces";
import { Download, Copy, Eye, Check } from 'lucide-react';

const ImageCard: React.FC<GeneratedImageProps> = ({ imageUrl, prompt, width, height, action }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(imageUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `generated-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Corrected View function: open image in new tab
  const handleView = () => {
    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`group relative bg-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:shadow-2xl hover:scale-[1.02] ${width || 'w-full'} ${height || 'h-72'}`}>
      
      {/* Image Container */}
      <div className={`relative ${height || 'h-full'}`}>
        <img
          src={imageUrl}
          alt={prompt}
          className="w-full h-full object-cover transition duration-500 group-hover:opacity-80"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center space-x-4">
          {/* View Button */}
          <button
            onClick={handleView}
            title="View Image"
            className="p-3 bg-white/20 text-white rounded-full backdrop-blur-sm hover:bg-purple-500 transition shadow-lg"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            title="Download Image"
            className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition shadow-lg"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer: Prompt & Copy URL */}
      <div className="p-4 bg-gray-800 flex items-center justify-between">
        <div className="flex-1 min-w-0 pr-4">
          <p className={`${width ? "text-xs" : "text-sm"} text-gray-400 truncate`}>
            {prompt}
          </p>
        </div>

        <button
          onClick={handleCopy}
          title="Copy Image URL"
          className={`flex items-center text-xs p-2 rounded-full transition ${
            isCopied
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
