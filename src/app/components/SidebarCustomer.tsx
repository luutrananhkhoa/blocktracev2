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
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M22 13h-8v-2h8v2zm0-6h-8v2h8V7zm-8 10h8v-2h-8v2zm-2-8v6c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm-1.5 6l-2.25-3l-1.75 2.26l-1.25-1.51L3.5 15h7z"/></svg>
                    <p className="text-xl">Tracking</p>
                </Link>
                <Link href={'/profilecustomer'} className={router.includes('/profilecustomer') ? activeLink : inactiveLink}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.775 12q-.9 0-1.5-.675T7.8 9.75l.325-2.45q.2-1.425 1.3-2.363T12 4q1.475 0 2.575.938t1.3 2.362l.325 2.45q.125.9-.475 1.575t-1.5.675h-4.45Zm0-2h4.45L13.9 7.6q-.1-.7-.637-1.15T12 6q-.725 0-1.263.45T10.1 7.6L9.775 10ZM12 10ZM4 20v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Zm2-2h12v-.8q0-.275-.138-.5t-.362-.35q-1.35-.675-2.725-1.012T12 15q-1.4 0-2.775.338T6.5 16.35q-.225.125-.363.35T6 17.2v.8Zm6 0Z"/></svg>
                    <p className="text-xl">Profile</p>
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