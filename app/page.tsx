import Image from "next/image";
import Hero from "@/Sections/Header";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="fixed inset-x-0 bottom-0 flex flex-col p-10 mix-blend-difference filter grayscale">
        <h1 className="text-6xl font-serif tracking-widest text-white">koys</h1>
        <h1 className="text-9xl font-serif tracking-widest text-white">Photography</h1>
      </div>
      <div className="fixed inset-0 w-screen h-screen z-[-1]">
        <Image
          src="/cover.png"
          alt="Cover Image"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
