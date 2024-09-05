import GeneratorForm from '../components/ImageGenerator/GeneratorForm';
import ImageGrid from '../components/Gallery/ImageGrid';

// Sample image data
const sampleImages = [
  { url: "https://cdn.usegalileo.ai/stability/01f4939b-b0b4-4a14-ba61-a2f049aa4cde.png" },
  { url: "https://cdn.usegalileo.ai/stability/43b6ac61-1427-4ddf-8c99-ab43c5cb8746.png" },
  { url: "https://cdn.usegalileo.ai/stability/84b80f3d-decd-468c-ae69-6deabde1c7b2.png" },
];

const previousImages = [
  { url: "https://cdn.usegalileo.ai/stability/318d9396-efa7-485d-8433-2e2de66d869b.png" },
  { url: "https://cdn.usegalileo.ai/stability/3a91c59c-6f67-4624-b28b-ebba9aea7a60.png" },
  { url: "https://cdn.usegalileo.ai/stability/aa91a32b-9d69-4382-afdf-f9ca99cef62a.png" },
];

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row flex-1 justify-start py-5">
      <div className="w-full md:w-80 px-6 mb-6 md:mb-0">
        <GeneratorForm />
      </div>
      <div className="flex-1 px-6 overflow-x-auto">
        <div className="layout-content-container flex flex-col max-w-[960px]">
          <ImageGrid title="Generated Images" images={sampleImages} />
          <ImageGrid title="Previously Generated" images={previousImages} />
        </div>
      </div>
    </div>
  );
}
