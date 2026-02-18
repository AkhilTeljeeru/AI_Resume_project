import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle, AlertCircle, Loader2, MoreHorizontal, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

export default function ResumeUploader({ onUpload, isProcessing }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      return "Only PDF and DOCX files are allowed";
    }
    if (file.size > maxSize) {
      return "File size must be less than 10MB";
    }
    return null;
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileInput = (e) => {
    setError(null);
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const processFiles = (newFiles) => {
    const validFiles = [];
    for (const file of newFiles) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      validFiles.push({
        file,
        id: Math.random().toString(36).substring(7),
        status: "pending",
      });
    }
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    for (const fileItem of files) {
      if (fileItem.status === "pending") {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id ? { ...f, status: "uploading" } : f
          )
        );
        
        await onUpload(fileItem.file, (status) => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileItem.id ? { ...f, status } : f
            )
          );
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300
          ${dragActive 
            ? "border-cyan-500 bg-cyan-500/10" 
            : "border-slate-600 hover:border-slate-500 bg-slate-900/50"
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.docx,.doc"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="flex flex-col items-center gap-4">
          <div className={`
            p-4 rounded-full transition-colors
            ${dragActive ? "bg-cyan-500/20" : "bg-slate-800"}
          `}>
            <Upload className={`w-8 h-8 ${dragActive ? "text-cyan-400" : "text-slate-500"}`} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-white">
              Drop resumes here or click to upload
            </p>
            <p className="text-sm text-slate-400 mt-1">
              Supports PDF and DOCX files up to 10MB
            </p>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-4 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            {files.map((fileItem) => (
              <motion.div
                key={fileItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-4 p-4 bg-slate-900/50 border border-slate-700 rounded-xl"
              >
                <div className="p-2 bg-slate-800 rounded-lg">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    {fileItem.file.name}
                  </p>
                  <p className="text-sm text-slate-500">
                    {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {fileItem.status === "uploading" && (
                    <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
                  )}
                  
                  {fileItem.status === "processing" && (
                    <div className="flex items-center gap-2 text-amber-400">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="text-sm font-medium">Analyzing...</span>
                    </div>
                  )}
                  
                  {fileItem.status === "complete" && (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  )}
                  
                  {fileItem.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-rose-400" />
                  )}

                  {(fileItem.status === "pending" || fileItem.status === "complete") && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        {/* @ts-ignore */}
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="w-4 h-4 text-slate-500" />
                        </Button>
                      </DropdownMenuTrigger>
                      {/* @ts-ignore */}
                      <DropdownMenuContent align="end">
                        {/* @ts-ignore */}
                        <DropdownMenuItem
                          onClick={() => {
                            const url = URL.createObjectURL(fileItem.file);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = fileItem.file.name;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        {/* @ts-ignore */}
                        <DropdownMenuItem
                          onClick={() => removeFile(fileItem.id)}
                          className="text-rose-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="flex justify-end gap-3 pt-4">
              {/* @ts-ignore */}
              <Button
                variant="outline"
                onClick={() => setFiles([])}
                disabled={isProcessing}
                className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Clear All
              </Button>
              {/* @ts-ignore */}
              <Button
                onClick={handleUpload}
                disabled={isProcessing || files.every(f => f.status !== "pending")}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload & Analyze
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}