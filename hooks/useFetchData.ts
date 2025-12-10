import { ImageProps } from "@/interfaces";
import { useEffect, useState } from "react";

const LOCAL_KEY = "imagegen_generated_images_v1";

const useFetchData = <T, R>() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(generatedImages));
    } catch (err) {
      // ignore localStorage errors
    }
  }, [generatedImages]);

  const fetchData = async (endpoint: string, body: R) => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!resp.ok) throw new Error("Failed to fetch data");

      const result = await resp.json();
      setResponseData(result);

      // add to generatedImages and persist via useEffect
      setGeneratedImages((prev) => [
        ...prev,
        { imageUrl: result?.message, prompt: (body as any)?.prompt || "" },
      ]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    responseData,
    error,
    fetchData,
    generatedImages,
    setGeneratedImages,
  };
};

export default useFetchData;
