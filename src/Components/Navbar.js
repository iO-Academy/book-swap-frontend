import { Link, NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="flex flex-col sm:flex-row flex-no-wrap justify-between items-center w-full bg-green-400 p-3">
            <Link to="/">
                <h1 className="text-2xl font-semibold">
                    Book Swap
                </h1>
            </Link>
            <div className="flex flex-row flex-wrap gap-3">
                <NavLink className={({isActive, isPending}) => isActive ? 'font-semibold' : 'hover:text-slate-500 transition-colors'} to="/">Available books</NavLink>
                <NavLink className={({isActive, isPending}) => isActive ? 'font-semibold' : 'hover:text-slate-500 transition-colors'} to="/claimed">Claimed books</NavLink>
            </div>
        </nav>
    )
}

export default Navbar