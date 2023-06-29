'use client';
import Link from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarCustomerProps {
    
}
 
const SidebarCustomer: FC<SidebarCustomerProps> = () => {

    const inactiveLink = 'flex items-center gap-6 p-2';
    const activeLink = inactiveLink+ ' bg-[#EAE8F6] p-3 rounded-xl text-[#403686] font-bold';
    const router = usePathname();
    return ( 
        <aside className="text-[#9295A1] px-10 py-8 border-r-1 bg-white w-[18%]">
            <div className="flex items-center gap-1 mb-10 mt-8">
                <Image src="/newlogonavy.svg" className="w-[80%] mr-4" width="64" height="48" alt="Logo" />
            </div>
            <nav className="flex flex-col gap-4">
                <p className="font-bold text-[#fcfcfc] mb-2">MENU</p>
                <Link href={'/customermanagement'} className={router.includes('/customermanagement') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p className="text-xl">Home</p>
                </Link>
                <Link href={'/customerproduct'} className={router.includes('/customerproduct') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p className="text-xl">Product</p>
                </Link>
                <Link href={'/trackingcustomer'} className={router.includes('/trackingcustomer') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <p className="text-xl">Tracking</p>
                </Link>
                <Link href={'/customerlogin'} className={inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-xl">Log Out</p>
                </Link>
            </nav>
        </aside>
     );
}
 
export default SidebarCustomer;