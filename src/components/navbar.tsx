import { NavigationMenuDemo } from "./navbar-menu"
import { ModeToggle } from "./toggleTheme"
import { Button } from "./ui/button"

function Navbar() {
    return (
        <div className="border border-sky-500 mt-2 md:flex justify-between">
            <div className="text-2xl font-medium leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">recall</div>

            <NavigationMenuDemo />

            <div className="flex justify-between">
                <ModeToggle/>
                <Button variant="outline" className="ml-2">Get started</Button>
            </div>

        </div>
    )
}

export default Navbar