import HeroRight from "./heroRight";
import HeroLeft from "./heroleft";

function Hero() {
    return (
        <div className="mt-10 flex h-[calc(100vh-100px)]">
            <HeroLeft />
            <HeroRight />
        </div>
    )
}

export default Hero;