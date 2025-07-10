"use client";

import { useState, useRef } from 'react';

interface ProfilePictureUploadProps {
  currentImage?: string;
  onImageChange?: (file: File) => void;
}

export default function ProfilePictureUpload({ 
  currentImage = "/api/placeholder/150/150", 
  onImageChange 
}: ProfilePictureUploadProps) {
  const [previewImage, setPreviewImage] = useState(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe ser menor a 5MB');
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Simular upload
    setIsUploading(true);
    try {
      // Aquí iría la llamada real para subir la imagen
      await new Promise(resolve => setTimeout(resolve, 2000));
      onImageChange?.(file);
      console.log('Imagen subida exitosamente');
    } catch (error) {
      console.error('Error al subir imagen:', error);
      setPreviewImage(currentImage); // Revertir preview en caso de error
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 hover:border-purple-400/50 transition-colors">
          <img 
            src={previewImage}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay con icono de cámara */}
        <div 
          onClick={handleImageClick}
          className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {isUploading ? (
            <svg className="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleImageClick}
        disabled={isUploading}
        className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 border border-purple-500/30 hover:border-purple-400 rounded-lg transition-colors disabled:opacity-50"
      >
        {isUploading ? 'Subiendo...' : 'Cambiar Foto'}
      </button>
      
      <p className="text-xs text-gray-500 text-center max-w-xs">
        Formatos: JPG, PNG, GIF. Máximo 5MB. Recomendado: 300x300px
      </p>
    </div>
  );
}