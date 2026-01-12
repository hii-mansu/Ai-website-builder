import { useState } from "react";

const images = [
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png",
  "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png",
];

const Gallery = () => {
  const [mainImage, setMainImage] = useState<string>(images[0]);

  return (
    <div className="flex flex-col scale-[1.3] items-center space-y-4 w-full">
      <div className="w-full max-w-3xl">
        <img
          src={mainImage}
          className="w-full rounded-lg"
          alt="Main"
        />
      </div>


      <div className="grid grid-cols-4 scale-[.95] max-w-full gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            onClick={() => setMainImage(img)}
            className="rounded-lg md:h-24 h-14 object-cover cursor-pointer hover:opacity-80"
            alt={`Thumb ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
