import Image from "next/image";
import Hero from "@/Sections/Header";

export default function Home() {
  return (
    <div>
      <section className="relative w-full h-screen overflow-hidden">
      <Hero />
        <div className="absolute inset-0 w-full h-full z-[-1]">
          <Image
            src="/cover.png"
            alt="Cover Image"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        {/* Overlay Text */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col p-10 mix-blend-difference filter grayscale">
          <h1 className="text-6xl font-serif tracking-widest text-white">koys</h1>
          <h1 className="text-9xl font-serif tracking-widest text-white">Photography</h1>
        </div>
      </section>
      {/* Next Section (shows on scroll) */}
      <section className="relative z-10 flex items-center justify-center w-full h-screen bg-black/80">
        <h1 className="text-white">hello</h1>
      </section>
    </div>
  );
}
