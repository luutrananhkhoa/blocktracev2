'use client';
import { FC, useCallback, useState } from "react";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {getUserContract as getUserContract} from "../contracts/userContract";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from "../redux/userSlice";

interface LoginProps {
    
}
 
const Login: FC<LoginProps> = () => {
    const router = useRouter()
    const [addressWallet, setAddressWallet] = useState<string>('')
    const [validateLogin, setValidateLogin] = useState<boolean>(false)
    const dispatch = useDispatch();
    
    const onHandleLogin = ()=> {
        if(validateLogin){
            localStorage.setItem('isLogin', 'true');
            router.push('/dashboard')

        }else{
            toast.error("Please register the account!")
        }
    }

    //connect metamask function
    const onHandleConnect = async ()=>{
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if(accounts[0]){
            setAddressWallet(accounts[0])

            await getUserContract().then(async(contract) =>{
                await contract.methods.getAllUser().call({
                  from: addressWallet
                })
                .then(async(response : any)=>{
                    let flag = await response && response.some((item: { [x: string]: string; }) => {
                        let i : string = item['userAddress'];
                        return i.toLowerCase() === accounts[0].toLowerCase() && item['userType'] !== 'Customer';
                    });
                    if(!flag){
                        toast.error("You don't have an account!")
                        setValidateLogin(false)
                    }else{
                        toast.success('Welcome to Block Trace!')
                        const userDataStorage = localStorage.getItem('user_data');
                        if(userDataStorage){
                            localStorage.removeItem('user_data');
                        }

                        response.forEach((user:any)=>{
                            if(user['userAddress'].toLowerCase() === accounts[0].toLowerCase()){
                                let userData ={
                                    userid: user['userId'],
                                    username: user['userName'],
                                    dateofbirth: user['dateOfBirth'],
                                    useraddress: user['userAddress'],
                                    usercccd: user['userCccd'],
                                    useremail: user['userEmail'], 
                                    userphone: user['userPhone'], 
                                    userole: user['userRole'], 
                                    usertype: user['userType'], 
                                    teamid: user['teamId'], 
                                }
                                console.log('userData', userData)
                                localStorage.setItem('user_data', JSON.stringify(userData));
                            }
                        })
                        setValidateLogin(true)
                        const status : string | null = localStorage.getItem('isLogin') || null;
                        if(status){
                            dispatch<any>(login({ isLogin: status }));
                        }

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
                    <Image src="/NewLogo.png" className="w-[64px] mb-10" width="64" height="48" alt="Logo" />
                    <h1 className="text-[#09003C] text-7xl">Welcome</h1>
                    <h1 className="text-[#09003C] font-bold text-7xl my-8">To Block Trace!</h1>
                    <p className="text-[#949494] text-2xl mb-10 mt-8">Login into your account to browse the site</p>
                    <div className="flex flex-col gap-10 w-full mt-[5rem]">
                        <Button className="btn-yellow" title="Connect Metamask" onClick={() => onHandleConnect()}/>
                        <Button className="btn" title="Log In" onClick={() =>onHandleLogin()}/>
                    </div>
                    <p className="mt-10 text-xl text-center">Don&apos;t you have an account? <Link className="ml-2 font-semibold text-[#9252FE] cursor-pointer" href={'/register'}>Register</Link></p>
                </div>
               
            </div>
            <div className="bg-[#726BDF] flex items-center justify-center flex-1">
                <Image src="/Login.png" className="w-[80%]" width="800" height="800" alt="Logo" />
            </div>  
        </div>
     );
}
 
export default Login;