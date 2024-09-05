import GeneratorForm from './components/ImageGenerator/GeneratorForm';
import ImageGrid from './components/Gallery/ImageGrid';

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
    <div className="gap-1 px-6 flex flex-1 justify-center py-5">
      <GeneratorForm />
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <ImageGrid title="Generated Images" images={sampleImages} />
        <ImageGrid title="Previously Generated" images={previousImages} />
      </div>
    </div>
  );
}
