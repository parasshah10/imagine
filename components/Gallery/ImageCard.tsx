import { useEffect } from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface Image {
  url: string;
}

interface ImageCardProps {
  image: Image;
  batchImages: Image[];
  batchId: number;
}

export default function ImageCard({ image, batchImages, batchId }: ImageCardProps) {
  useEffect(() => {
    Fancybox.bind(`[data-fancybox="gallery-${batchId}"]`, {
      contentClick: "iterateZoom",
      Images: {
        Panzoom: {
          maxScale: 4,
        },
      },
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: [],
          right: ["iterateZoom", "fullscreen", "download", "thumbs", "close"],
        }
      },
      Thumbs: {
        type: "classic",
      },
    });

    return () => {
      Fancybox.destroy();
    };
  }, [batchId]);

  return (
    <a
      href={image.url}
      data-fancybox={`gallery-${batchId}`}
      data-src={image.url}
      className="block aspect-square"
    >
      <div
        className="w-full h-full bg-center bg-no-repeat bg-cover rounded-xl cursor-pointer"
        style={{backgroundImage: `url("${image.url}")`}}
      ></div>
    </a>
  );
}
