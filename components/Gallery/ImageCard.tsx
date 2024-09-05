interface Image {
  url: string;
}

export default function ImageCard({ image }: { image: Image }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
        style={{backgroundImage: `url("${image.url}")`}}
      ></div>
    </div>
  );
}