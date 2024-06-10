import Image from 'next/image'
import logo from "../../public/logo.png"
import Tweet from './tweet'

function HeroRight() {
    return (
        <div className='w-1/2'>
            <Tweet />
        </div>
    )
}

export default HeroRight