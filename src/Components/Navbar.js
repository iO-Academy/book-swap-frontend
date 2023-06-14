import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="w-full bg-green-400 p-3">
            <Link to="/">
                <h1 className="text-2xl font-semibold">
                    Book Swap
                </h1>
            </Link>
        </nav>
    )
}

export default Navbar