export default function MainContent() {
  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#141414] text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">
          Fantasy castle on a hilltop, surrounded by rolling hills and a beautiful sunset, magical, serene, high details, romantic, stylized
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        <div className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/01f4939b-b0b4-4a14-ba61-a2f049aa4cde.png")'}}
          ></div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/43b6ac61-1427-4ddf-8c99-ab43c5cb8746.png")'}}
          ></div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/84b80f3d-decd-468c-ae69-6deabde1c7b2.png")'}}
          ></div>
        </div>
      </div>
      <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Previously Generated</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        <div className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/318d9396-efa7-485d-8433-2e2de66d869b.png")'}}
          ></div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/3a91c59c-6f67-4624-b28b-ebba9aea7a60.png")'}}
          ></div>
        </div>
        <div className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{backgroundImage: 'url("https://cdn.usegalileo.ai/stability/aa91a32b-9d69-4382-afdf-f9ca99cef62a.png")'}}
          ></div>
        </div>
      </div>
    </div>
  );
}