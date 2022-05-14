import Navbar from "./Navbar"

const Layout = ({children}) => {
    return (
        <div className="pt-16 pb-5 overflow-x-hidden bg-black text-white">
            <Navbar />
            {children}
        </div>
    )
}

export default Layout