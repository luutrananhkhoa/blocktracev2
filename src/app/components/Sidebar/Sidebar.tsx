'use client';
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";

interface SidebarProps {
    
}
 
const Sidebar: FC<SidebarProps> = () => {

    const inactiveLink = 'flex items-center gap-2';
    const activeLink = inactiveLink+ ' bg-[#9252FE] p-2 rounded-xl text-white';
    const router = usePathname();
    return ( 
        <aside className="text-black p-8 border-r-1 bg-white">
            <div className="flex items-center gap-1 mb-8">
                <img src="/logo.svg" className="w-[72px] mr-4" alt="Logo" />
                <p className="text-4xl font-bold text-[#09003C]">BLOCKTRACE</p>
            </div>
            <nav className="flex flex-col gap-4">
                <p className="font-bold text-[#ccc] mb-2">Menu</p>
                <Link href={'/dashboard'} className={router.includes('/dashboard') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p className="text-xl">Dashboard</p>
                </Link>
                <Link href={'/products'} className={router.includes('/products') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p className="text-xl">Products</p>
                </Link>
            </nav>
        </aside>
     );
}
 
export default Sidebar;