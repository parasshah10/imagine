export default function PromptInput() {
  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#141414] text-base font-medium leading-normal pb-2">Prompt</p>
        <textarea
          placeholder="Type your prompt here"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#ededed] focus:border-none min-h-36 placeholder:text-neutral-500 p-4 text-base font-normal leading-normal"
        ></textarea>
      </label>
    </div>
  );
}