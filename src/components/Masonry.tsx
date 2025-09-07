// MasonryGallery.js
import Image from 'next/image';
export default function MasonryHorizontal({ images, columns = 4 }) {
  // Distribute images into N columns roughly evenly
  const cols = Array.from({ length: columns }, () => []);

  images.forEach((img, idx) => {
    cols[idx % columns].push(img);
  });

  return (
    <div className="masonry-horizontal">
      {cols.map((colImages, colIdx) => (
        <div key={colIdx} className="masonry-column">
          {colImages.map((img, idx) => (
            <div key={idx} className="masonry-item">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width || 200}
                height={img.height || 300}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
