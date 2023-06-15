import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Link from "next/link";

interface LayoutProps {
    children: ReactNode
}
 
const Layout: FC<LayoutProps> = ({children}) => {
    return ( 
        <div className="min-h-screen flex">
            <Sidebar /> 
            <div className="bg-[#EFEFEF] text-black flex-grow min-h-screen">
                <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
                    <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
                        <span className="sr-only">Menu</span>
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>
                    <div className="flex flex-shrink-0 items-center ml-auto">
                        <div className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
                            <span className="sr-only">User Menu</span>
                            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                                <span className="font-semibold">Byte Webster</span>
                            </div>
                        </div>
                        <div className="border-l pl-3 ml-3 space-x-1">
                            <Link href={'/login'} onClick={()=>{
                                localStorage.removeItem('isLogin')
                                localStorage.removeItem('user_data')}} className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                                <span className="sr-only">Log out</span>
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </header>
                <div className="bg-[#EFEFEF] text-black flex-grow">
                    {children}
                </div>
            </div>
        </div>
     );
}
 
export default Layout;