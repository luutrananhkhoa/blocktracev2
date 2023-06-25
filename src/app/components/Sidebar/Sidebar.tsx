'use client';
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface SidebarProps {
    
}
 
const Sidebar: FC<SidebarProps> = () => {
    const [IsTeamAccount, setIsTeamAccount] = useState(false)
    const inactiveLink = 'flex items-center gap-2 p-2';
    const activeLink = inactiveLink+ ' bg-[#726BDF] text-white p-3 rounded-lg';
    const router = usePathname();

    
    useEffect(()=>{
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('user: ', parsedData)
            if(parsedData.usertype === "Team"){
                setIsTeamAccount(true)
            }
            // setTeamIdValue(parsedData.teamid)
        }
    },[])

    return ( 
        <aside className=" w-[15%] px-10 py-8 border-r-1 bg-white">
            <div className="flex items-center justify-center gap-1 mt-6 mb-10">
                <Image src="/newlogonavy.svg" className="w-[80%] mr-4" width="64" height="48" alt="Logo" />
            </div>
            <div className="border-b-2 border-zinc-500 mt-10"></div>
            <nav className="flex flex-col gap-8 mt-10">
                <p className="font-bold mb-2">MENU</p>
                <Link href={'/dashboard'} className={router.includes('/dashboard') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <p className="text-xl">Dashboard</p>
                </Link>
                <Link href={'/products'} className={router.includes('/products') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p className="text-xl">Product</p>
                </Link>
                <Link href={'/profile'} className={router.includes('/profile') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <p className="text-xl">Profile</p>
                </Link>
                {/* <Link href={'/products'} className={router.includes('/report') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                    <p className="text-xl">Report</p>
                </Link> */}
                <Link href={'/tracking'} className={router.includes('/tracking') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32"  className="w-10 h-10" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M88 72a8 8 0 0 1 8-8h64a8 8 0 0 1 0 16H96a8 8 0 0 1-8-8Zm8 40h64a8 8 0 0 0 0-16H96a8 8 0 0 0 0 16Zm112-72v176a16 16 0 0 1-16 16H64a16 16 0 0 1-16-16V40a16 16 0 0 1 16-16h128a16 16 0 0 1 16 16Zm-16 0H64v176h128Zm-64 128a12 12 0 1 0 12 12a12 12 0 0 0-12-12Z"/></svg>
                    <p className="text-xl">Product Tracking</p>
                </Link>
                {IsTeamAccount 
                && 
                <Link href={'/user'} className={router.includes('/user') ? activeLink : inactiveLink}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="w-10 h-10"  viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20Z"/></svg>
                    <p className="text-xl">Users</p>
                </Link>}
            </nav>
        </aside>
     );
}
 
export default Sidebar;