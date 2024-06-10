import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="mx-20 h-screen boder-2 border-gray-100">
      <Navbar />
      <Hero/>
    </div>
  );
}
