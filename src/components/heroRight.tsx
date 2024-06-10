import Image from 'next/image'
import logo from "../../public/logo.png"

function HeroRight() {
    return (
        <div className='border-2 border-amber-300 w-1/2'>
            <Image 
                src={logo}
                alt="Picture of the author"
                width={500}
                height={500}
                />
        </div>
    )
}

export default HeroRight