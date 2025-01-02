import { useState, useCallback, useEffect } from "react";
import { Buffer } from "buffer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarkDown } from "../MarkDown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DragEvent, ChangeEvent } from "react";

const LANGUAGES = [
  { value: "html", label: "HTML/CSS" },
  { value: "react", label: "React" },
  { value: "flutter", label: "Flutter" },
  { value: "nextjs", label: "Next.js" },
] as const;

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const Image2CodePage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (selectedImage) URL.revokeObjectURL(URL.createObjectURL(selectedImage));
    };
  }, [selectedImage]);

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
      setSelectedImage(file);
      setError("");
    } else {
      setError("Please upload a valid image file (max 10MB).");
    }
  }, []);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/") && file.size <= 10 * 1024 * 1024) {
      setSelectedImage(file);
      setError("");
    } else {
      setError("Please upload a valid image file (max 10MB).");
    }
  };

  const fileToGenerativePart = async (file: File) => {
    const data = await file.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(data).toString("base64"),
        mimeType: file.type,
      },
    };
  };

  const generateCode = async () => {
    if (!selectedImage) return;
    setError("");
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
      const imagePart = await fileToGenerativePart(selectedImage);
      const prompt = `Generate ${selectedLanguage.toUpperCase()} code for this image.`;
      const result = await model.generateContent([prompt, imagePart]);
      setGeneratedCode(await result.response.text());
    } catch (error) {
      setError("Error generating code. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setGeneratedCode("");
    setError("");
  };

  return (
    <div className="bg-transparent md:mb-0">
      <div className="top-12 absolute left-0 right-0 mx-0 px-4 py-8">
        <h1 className="text-3xl p-1 font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-800 to-blue-800 dark:from-blue-500 dark:via-blue-400 dark:to-blue-500">
          Image to Code Converter
        </h1>

        <div className="grid lg:grid-cols-[35%_60%] gap-8">
          <Card className="bg-slate-200/50 dark:bg-slate-900/50  border-2 border-slate-900/30 dark:border-slate-300/50 h-fit w-full">
            <CardHeader>
              <CardTitle className="text-gray-700 dark:text-gray-300 text-2xl">
                Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Platform
                </label>
                <Select
                  onValueChange={setSelectedLanguage}
                  defaultValue={selectedLanguage}
                >
                  <SelectTrigger className="w-full bg-slate-300/50 hover:bg-slate-400/50 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 border-2 border-slate-900/30 dark:border-slate-300/50">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div> 
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2 ">
                  Upload Image
                </h3>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                    isDragging
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                      : "border-gray-600 dark:border-gray-400 hover:border-blue-400"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload image"
                  />

                  {selectedImage ? (
                    <div className="flex flex-col items-center space-y-4">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        className="max-w-full max-h-48 rounded-lg shadow-lg"
                      />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedImage.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-4">
                      <Upload className="w-12 h-12 text-blue-500" />
                      <div className="text-center">
                        <p className="font-medium text-blue-500">
                          Click to upload
                          <span className="text-gray-500 dark:text-gray-400">
                            {" "}
                            or drag and drop
                          </span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>
                )}
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={generateCode}
                  disabled={!selectedImage || loading}
                  className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? "Generating..." : "Generate Code"}
                </button>
                <button
                  onClick={resetAll}
                  className="px-6 py-2.5 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  Reset
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full bg-slate-300/20 dark:bg-slate-900/80 shadow-lg border-2 border-slate-900/30 dark:border-slate-300/50">
            <CardHeader>
              <CardTitle className="font-medium text-xl text-gray-900 dark:text-gray-100">
                Generated Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-[450px] overflow-y-auto rounded-lg">
                <MarkDown>
                  {generatedCode
                    ? generatedCode
                    : selectedImage
                    ? loading
                      ? "Generating..."
                      : "No code generated yet."
                    : "Upload an image to generate code."}
                </MarkDown>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Image2CodePage;