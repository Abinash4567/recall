import HeroRight from "./heroRight";
import HeroLeft from "./heroleft";

function Hero() {
    return (
        <div className="border-2 border-green-600 mt-10 flex h-[calc(100vh-100px)]">
            <HeroLeft />
            <HeroRight />
        </div>
    )
}

export default Hero;