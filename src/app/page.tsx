import Hero from "@/components/hero";
import Login from "@/components/login";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="mx-20">
      <Navbar />
      <Hero />
    </div>
  );
}