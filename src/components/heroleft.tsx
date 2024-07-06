import { Button } from "./ui/button";
import { Heart } from 'lucide-react';
import Link from 'next/link'

function HeroLeft() {
    return (
        <div className="w-1/2 flex items-center">
            <div>
                <div className="mb-4 flex text-4xl font-bold leading-none tracking-tight md:text-5xl lg:text-5xl">
                    Remember

                    <div className="pt-3 px-3"><Heart color="#ff0000" strokeWidth={2.25} absoluteStrokeWidth size={35}/></div>
                    ones
                </div>


                <div className="font-semibold">
                Designed to help individuals with Alzheimer&apos;s recall loved ones, our user-friendly interface and personalized features make it easy to navigate and meaningfully engage with their past.
                </div>

                <Link href="/playground">
                    <Button variant="secondary" className="rounded-3xl bg-blue-600 hover:bg-blue-900 mt-5 text-white">Try it now</Button>
                </Link>
            </div>
        </div>
    )
}

export default HeroLeft;