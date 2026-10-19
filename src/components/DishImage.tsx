import React, { useState } from 'react';

interface DishImageProps {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}

export const DishImage: React.FC<DishImageProps> = ({
  src,
  alt,
  className = '',
  aspect = 'aspect-[4/3]',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`${aspect} w-full bg-[#131519] border border-white/5 flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
        aria-label={alt}
      >
        <span className="text-sm font-medium text-slate-200">{alt}</span>
        <span className="text-xs text-slate-400 mt-1 font-mono tracking-wide">
          [COMPLETAR FOTO REAL · 4:3]
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${aspect} w-full bg-[#131519] overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
