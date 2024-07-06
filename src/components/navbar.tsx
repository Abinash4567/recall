import Login from "./login"
import { NavigationMenuDemo } from "./navbar-menu"
import { ModeToggle } from "./toggleTheme"
import Link from 'next/link'

function Navbar() {
    return (
        <div className="mt-2 md:flex justify-between">
            <div className="text-2xl font-medium leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white"><Link href='/'>recall</Link></div>

            {/* <NavigationMenuDemo /> */}

            <div className="flex justify-between">
                <ModeToggle/>
                <Login />
            </div>
            
        </div>
    )
}

export default Navbar