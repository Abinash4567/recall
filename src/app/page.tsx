import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="border-2 border-red-500 mx-20 h-screen">
      <Navbar />
      <Hero/>
    </div>
  );
}
