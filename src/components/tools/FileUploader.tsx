import React, { useState, useRef } from 'react';
import { FileUp, FileText, Image, X, Upload } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
}

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      progress: 0,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach(file => {
      const interval = setInterval(() => {
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, progress: Math.min(f.progress + 10, 100) } 
              : f
          )
        );
        
        const updatedFile = files.find(f => f.id === file.id);
        if (updatedFile && updatedFile.progress >= 100) {
          clearInterval(interval);
        }
      }, 300);
    });
  };
  
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };
  
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image size={16} />;
    }
    return <FileText size={16} />;
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };
  
  return (
    <div className="h-full flex flex-col">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 mb-4 text-center transition-colors duration-200 ${
          isDragging
            ? isDark 
              ? 'border-blue-500 bg-gray-700' 
              : 'border-blue-500 bg-blue-50'
            : isDark 
              ? 'border-gray-600 hover:border-gray-500' 
              : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <FileUp 
          size={24} 
          className={`mx-auto mb-2 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} 
        />
        
        <p className={`text-sm mb-1 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Drag and drop files here
        </p>
        
        <p className={`text-xs mb-3 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Supports PDF, DOCX, JPG, PNG
        </p>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`text-xs px-3 py-1.5 rounded ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          Browse files
        </button>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          multiple
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <h3 className={`text-sm font-medium mb-2 ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {files.length > 0 ? 'Uploaded Files' : 'No files uploaded'}
        </h3>
        
        <div className="space-y-2">
          {files.map(file => (
            <div 
              key={file.id}
              className={`p-2 rounded-md ${
                isDark ? 'bg-gray-700' : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded flex items-center justify-center mr-2 ${
                    isDark ? 'bg-gray-600 text-blue-400' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      isDark ? 'text-gray-200' : 'text-gray-900'
                    }`}>
                      {file.name}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(file.id)}
                  className={`p-1 rounded-md ${
                    isDark 
                      ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <X size={14} />
                </button>
              </div>
              
              <div className="flex items-center text-xs">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                  {formatFileSize(file.size)}
                </span>
                <span className={`mx-1 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                <span className={
                  file.progress < 100 
                    ? isDark ? 'text-blue-400' : 'text-blue-600' 
                    : isDark ? 'text-green-400' : 'text-green-600'
                }>
                  {file.progress < 100 ? `Uploading ${file.progress}%` : 'Uploaded'}
                </span>
              </div>
              
              {file.progress < 100 && (
                <div className={`mt-1 h-1 rounded-full overflow-hidden ${
                  isDark ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  <div 
                    className={`h-full ${
                      isDark ? 'bg-blue-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;