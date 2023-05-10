'use client';
import { FC, useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {getUserContract as getUserContract} from "../contracts/userContract";
import { redirect, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";

interface RegisterProps {
    
}

declare global {
    interface Window {
      ethereum: any
    }
  }

const Register: FC<RegisterProps> = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [addressWallet, setAddressWallet] = useState<string>('')
    const [listUsers, setListUsers] = useState([])
    const [isPersonalForm, setIsPersonalForm] = useState(true)
    const router = useRouter();
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
        }
    }
    const onHandleCreateTeamId = ()=>{
        const min = 10000000;
        const max = 99999999;
        const teamId = Math.floor(Math.random() * (max - min + 1)) + min;
        let teamIdInput = document.querySelector('#teamid') as HTMLInputElement
        if(teamIdInput){
            teamIdInput.value = teamId.toString();
        }
    }

    //Register function
    const onSubmit = (data : any ) => {

        let flag = listUsers && listUsers.some(item => {
            let i : string = item['userAddress'];
            return i.toLowerCase() === addressWallet.toLowerCase();
            
        });
        if(!flag){
            if(isPersonalForm){
                getUserContract().then((contract)=>{
                    contract.methods.addUser(data.fullname, data.citizenId, data.email, data.phone, 0)
                    // contract.methods.addUser(data.fullname, data.citizenId, data.dayofbirth, data.email, data.phone, teamId)
                    .send({from: addressWallet})
                    .then((res : any)=>{
                        console.log(res)
                        if(res.status){
                            console.log('status: ', res.status)
                            toast.success('Successfully register');
                            router.push('/login');
                        }
                    }).catch((err : any)=>{console.log(err)})
                })
            }else{
                getUserContract().then((contract)=>{
                    contract.methods.addUser(data.fullname, data.citizenId, data.email, data.phone, data.teamid)
                    // contract.methods.addUser(data.fullname, data.citizenId, data.dayofbirth, data.email, data.phone, teamId)
                    .send({from: addressWallet})
                    .then((res : any)=>{
                        console.log(res)
                        if(res.status){
                            console.log('status: ', res.status)
                            toast.success('Successfully register');
                            router.push('/login');
                        }
                    }).catch((err : any)=>{console.log(err)})
                })
            }
            

        }else{
            toast.error('Register failed!');
        }
 
    }
    useEffect(()=>{
        getUserContract().then((contract) =>{
            contract.methods.getAllUser().call({
              from: addressWallet
            })
            .then((response : any)=>{
              console.log('List user:', typeof response[0])
              setListUsers(response)
            })
            .catch((err : any)=>{console.log(err);})
          })
      },[])
    return ( 
        <div className="flex w-full min-h-screen bg-white">
            <Toaster />
            <div className="flex items-center justify-center flex-col min-h-screen flex-1 ">
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-[10rem] py-[4rem] h-screen w-full"
                    >
                    <Image src="/logo.svg" className="w-[64px] mb-10" width="64" height="48" alt="Logo" />
                    <h1 className="text-[#09003C] text-6xl">Create new account</h1>
                    <div className="flex justify-between items-center text-[#949494] text-xl mb-6 mt-6">
                        <div className="flex">
                            <p>Already a member?</p><Link href={'/login'} className="text-[#8346FF] font-bold ml-2"> Log In</Link>
                        </div>
                        <div className="flex gap-2 text-white">
                            <div className={`px-6 py-4 rounded-sm cursor-pointer ${isPersonalForm? 'bg-[#FF1E5E]': 'bg-black'}`}
                                onClick={()=>{setIsPersonalForm(true)}}>Personal Account</div>
                            <div className={`px-6 py-4 rounded-sm cursor-pointer ${!isPersonalForm? 'bg-[#FF1E5E]': 'bg-black'}`}
                                onClick={()=>{setIsPersonalForm(false)}}>Team Account</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 w-full mt-[1rem]">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullname" className="font-bold ">Full Name</label>
                            <input type="text" className="px-4 py-4 rounded-[10px]" placeholder="Full Name" {...register("fullname", { required: true })}/>
                            {errors.fullname && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="flex justify-between items-end gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="addressMetamask" className="font-bold ">Address</label>
                                <input type="text" id="addressMetamask" className="px-4 py-4 rounded-[10px]" placeholder="addressMetamask" {...register("addressMetamask", { required: true })}/>
                            </div>
                            <div className="flex flex-col justify-end gap-1">
                                <div className="btn-yellow" onClick={onHandleConnect}>
                                Connect Metamask
                                </div>
                            </div>
                        </div>
                      
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="citizenId" className="font-bold ">Citizen Identification Number</label>
                                <input type="number" className="px-4 py-4 rounded-[10px]" placeholder="Citizen ID" {...register("citizenId", { required: true })}/>
                                {errors.citizenId && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="dayofbirth" className="font-bold ">Date of birth</label>
                                <input type="date" className="px-4 py-4 rounded-[10px]" {...register("dayofbirth", { required: true })}/>
                                {errors.dayofbirth && <span className="text-red-600">This field is required</span>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-bold ">Email</label>
                            <input type="text"className="px-4 py-4 rounded-[10px]" placeholder="Your Email" {...register("email", { required: true })}/>
                            {errors.email && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="font-bold ">Phone Number</label>
                            <input type="text" className="px-4 py-4 rounded-[10px]" placeholder="Your Phone Number" {...register("phone", { required: true })}/>
                            {errors.phone && <span className="text-red-600">This field is required</span>}
                        </div>
                        {!isPersonalForm &&
                        <div className="flex justify-between items-end gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="teamid" className="font-bold ">Team ID</label>
                                <input type="text" className="px-4 py-4 rounded-[10px]" id="teamid" placeholder="Team Id" {...register("teamid", { required: true })}/>
                                {errors.phone && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="flex flex-col justify-end gap-1">
                                <div className="btn" onClick={onHandleCreateTeamId}>
                                Create Team ID
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <input type="checkbox" className="cursor-pointer p-2"/>
                        <p>I agree to Block Trace&apos;s <span className="font-bold">Term of Service</span> and <span className="font-bold">Privacy Policy</span></p>
                    </div>
                    <div className="flex flex-col gap-10 w-full mt-[3rem]">
                        <Button className="btn-red" title="Register" elementType="submit"/>
                    </div>
                </form>
            </div>
            <div className="bg-[#8346FF] min-h-screen flex-1">

            </div>  
        </div>
     );
}
 
export default Register;