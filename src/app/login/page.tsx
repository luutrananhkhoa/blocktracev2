'use client';
import { FC } from "react";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import Link from "next/link";

interface LoginProps {
    
}
 
const Login: FC<LoginProps> = () => {
    const router = useRouter()
    return ( 
        <div className="flex w-full min-h-screen bg-white">
            <div className="flex items-center justify-center flex-col min-h-screen flex-1 ">
                <div className="px-[10rem] py-[6rem] h-screen w-full">
                    <img src="/logo.svg" className="w-[64px] mb-10" alt="Logo" />
                    <h1 className="text-[#09003C] text-7xl">Welcome</h1>
                    <h1 className="text-[#09003C] font-bold text-7xl my-8">To Block Trace!</h1>
                    <p className="text-[#949494] text-2xl mb-10 mt-8">Login into your account to browse the site</p>
                    <div className="flex flex-col gap-10 w-full mt-[5rem]">
                        <Button className="btn-red" title="Connect Metamask"/>
                        <Button className="btn-yellow" title="Log In" onClick={() => router.push('/dashboard')}/>
                    </div>
                    <p className="mt-10 text-xl text-center">Don't you have an account? <Link className="ml-2 font-semibold text-[#9252FE] cursor-pointer" href={'/register'}>Register</Link></p>
                </div>
               
            </div>
            <div className="bg-[#8346FF] min-h-screen flex-1">

            </div>  
        </div>
     );
}
 
export default Login;