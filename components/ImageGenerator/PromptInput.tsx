import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '../ui/button';

export default function PromptInput({ value, onChange }) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const enhancePrompt = async () => {
    setIsEnhancing(true);
    try {
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: value }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to enhance prompt');
      }

      const data = await response.json();
      onChange(data.enhancedPrompt);
    } catch (error) {
      console.error('Error enhancing prompt:', error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#141414] dark:text-white text-base font-medium leading-normal pb-2">Prompt</p>
        <div className="relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your prompt here"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#ededed] dark:bg-gray-900 focus:border-none min-h-36 placeholder:text-neutral-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal pr-12"
          ></textarea>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-2"
            onClick={enhancePrompt}
            disabled={isEnhancing || !value.trim()}
          >
            <Wand2 className={`h-4 w-4 ${isEnhancing ? 'animate-pulse' : ''}`} />
          </Button>
        </div>
      </label>
    </div>
  );
}
