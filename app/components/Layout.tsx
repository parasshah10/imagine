import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-neutral-50 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {/* You can add a Footer component here if needed */}
    </div>
  );
}