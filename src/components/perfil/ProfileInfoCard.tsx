"use client";

interface ProfileInfoCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  gradient: string;
  borderColor: string;
  titleColor: string;
}

export default function ProfileInfoCard({ 
  title, 
  description, 
  children, 
  gradient, 
  borderColor, 
  titleColor 
}: ProfileInfoCardProps) {
  return (
    <div className={`${gradient} backdrop-blur border ${borderColor} rounded-lg p-6 hover:border-opacity-70 transition-colors`}>
      <div className="mb-4">
        <h3 className={`text-lg font-semibold ${titleColor} mb-1`}>{title}</h3>
        {description && (
          <p className="text-gray-400 text-sm">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}