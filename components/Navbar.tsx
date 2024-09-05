import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#ededed] dark:border-b-gray-800 px-10 py-3 bg-white dark:bg-amoled-black text-[#141414] dark:text-white">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Imagine</h2>
      </div>
      <ThemeToggle />
    </header>
  );
}
