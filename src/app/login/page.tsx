'use client';
import { FC, useState } from "react";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {getUserContract as getUserContract} from "../contracts/userContract";
import toast, { Toaster } from 'react-hot-toast';

interface LoginProps {
    
}
 
const Login: FC<LoginProps> = () => {
    const router = useRouter()
    const [addressWallet, setAddressWallet] = useState<string>('')
    const [validateLogin, setValidateLogin] = useState<boolean>(false)

    //connect metamask function
    const onHandleConnect = async ()=>{
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if(accounts){
            console.log(accounts[0])
            let meta = document.getElementById('addressMetamask') as HTMLInputElement
            if(meta){
                meta.value = accounts[0]
            }
            setAddressWallet(accounts[0])

            getUserContract().then((contract) =>{
                contract.methods.getAllUser().call({
                  from: addressWallet
                })
                .then((response : any)=>{
                  console.log('List user:', response)

                    let flag = response && response.some((item: { [x: string]: string; }) => {
                        let i : string = item['userAddress'];
                        return i.toLowerCase() === addressWallet.toLowerCase();
                    });
                    if(!flag){
                        toast.error("You don't have an account!")
                        setValidateLogin(false)
                    }else{
                        toast.success('Welcome to Block Trace!')

                        const addressStorage = localStorage.getItem('metamask_address');
                        if(addressStorage){
                            localStorage.removeItem('metamask_address');
                        }
                        localStorage.setItem('metamask_address', accounts[0]);
                        
                        setValidateLogin(true)
                    }
                })
                .catch((err : any)=>{console.log(err);})
              })
        }
    }

    return ( 
        <div className="flex w-full min-h-screen bg-white">
            <Toaster />
            <div className="flex items-center justify-center flex-col min-h-screen flex-1 ">
                <div className="px-[10rem] py-[6rem] h-screen w-full">
                    <Image src="/logo.svg" className="w-[64px] mb-10" width="64" height="48" alt="Logo" />
                    <h1 className="text-[#09003C] text-7xl">Welcome</h1>
                    <h1 className="text-[#09003C] font-bold text-7xl my-8">To Block Trace!</h1>
                    <p className="text-[#949494] text-2xl mb-10 mt-8">Login into your account to browse the site</p>
                    <div className="flex flex-col gap-10 w-full mt-[5rem]">
                        <Button className="btn-red" title="Connect Metamask" onClick={() => onHandleConnect()}/>
                        <Button className="btn-yellow" title="Log In" onClick={() =>validateLogin? router.push('/dashboard') : toast.error("Please register the account!")}/>
                    </div>
                    <p className="mt-10 text-xl text-center">Don&apos;t you have an account? <Link className="ml-2 font-semibold text-[#9252FE] cursor-pointer" href={'/register'}>Register</Link></p>
                </div>
               
            </div>
            <div className="bg-[#8346FF] min-h-screen flex-1">

            </div>  
        </div>
     );
}
 
export default Login;