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
    const [isTypeOfRole, setIsTypeOfRole] = useState('Admin')
    const [teamIdValue, SetTeamIdValue] = useState(0)

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
            SetTeamIdValue(teamId)
        }
    }

    //Register function
    const onSubmit = (data : any ) => {
        console.log('data',data)
        console.log('addressWallet',addressWallet)
        let flag = listUsers && listUsers.some(item => {
            let i : string = item['userAddress'];
            return i.toLowerCase() === addressWallet.toLowerCase();
            
        });
        console.log('flag',flag)
        let teamIdPersonal = 0
        if(!flag){
            if(isPersonalForm){
                getUserContract().then((contract)=>{
                    contract.methods.addUser(data.fullname, '0', 'Personal' , data.dayofbirth, data.citizenId, data.email, data.phone, teamIdPersonal)
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
                if(isTypeOfRole === 'Admin'){
                    getUserContract().then((contract)=>{
                        // contract.methods.addUser(data.fullname, data.citizenId, data.email, data.phone, data.teamid)
                        contract.methods.addUser(data.fullname, '0' , 'Team' , data.dayofbirth, data.citizenId, data.email, data.phone, teamIdValue)
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
                    getUserContract().then(async (contract)=>{
                        // contract.methods.addUser(data.fullname, data.citizenId, data.email, data.phone, data.teamid)
                        console.log('teamIdValue', teamIdValue)
                        await contract.methods.addUser(data.fullname, data.userRole , 'Team' , data.dayofbirth, data.citizenId, data.email, data.phone, data.teamid)
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
             
            }
            

        }else{
            toast.error('Register failed!');
        }
 
    }
    useEffect(()=>{
        getUserContract().then(async (contract) =>{
            await contract.methods.getAllUser().call({
              from: addressWallet
            })
            .then((response : any)=>{
              console.log('List user:', response)
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
                    <Image src="/NewLogo.png" className="w-[64px] mb-10" width="64" height="48" alt="Logo" />
                    <h1 className="text-[#09003C] text-6xl">Create new account</h1>
                    <div className="flex justify-between items-center text-[#949494] text-xl mb-6 mt-6">
                        <div className="flex">
                            <p>Already a member?</p><Link href={'/login'} className="text-[#8346FF] font-bold ml-2"> Log In</Link>
                        </div>
                        <div className="flex gap-2 text-white">
                            <div className={`px-6 py-4 rounded-sm cursor-pointer ${isPersonalForm? 'bg-[#726BDF] border-4 border-[#fb73b3]': 'bg-[#fec652]'}`}
                                onClick={()=>{setIsPersonalForm(true)}}>Personal Account</div>
                            <div className={`px-6 py-4 rounded-sm cursor-pointer ${!isPersonalForm? 'bg-[#726BDF] border-4 border-[#fb73b3]': 'bg-[#fec652]'}`}
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
                            <div className="flex flex-col justify-end gap-1 cursor-pointer">
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
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="email" className="font-bold ">Email</label>
                                <input type="text"className="px-4 py-4 rounded-[10px]" placeholder="Your Email" {...register("email", { required: true })}/>
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="phone" className="font-bold ">Phone Number</label>
                                <input type="text" className="px-4 py-4 rounded-[10px]" placeholder="Your Phone Number" {...register("phone", { required: true })}/>
                                {errors.phone && <span className="text-red-600">This field is required</span>}
                            </div>
                        </div>
                        {!isPersonalForm &&
                        <>
                            <div className="flex justify-between items-end gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="userTypeOfRole" className="font-bold ">Type of Role:</label>
                                    <select className=" px-4 py-4 border-solid border-gray border-2 rounded-xl flex-1" id="userTypeOfRole" 
                                    onChange={(e)=>setIsTypeOfRole(e.target.value)}>
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="userRole" className="font-bold ">Role:</label>
                                    <select className=" px-4 py-4 border-solid border-gray border-2 rounded-xl flex-1"
                                        id="userRole" 
                                        disabled={isTypeOfRole === 'Admin'}
                                        {...register("userRole")} >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                    </select>
                                </div>
                            </div>
                                
                            <div className="flex justify-between items-end gap-4">
                                <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="teamid" className="font-bold ">Team ID</label>
                                    <input type="text" className="px-4 py-4 rounded-[10px]" id="teamid" placeholder="Team Id" {...register("teamid", { required: true })}/>
                                    {errors.phone && <span className="text-red-600">This field is required</span>}
                                </div>
                                {isTypeOfRole === 'Admin' && <div className="flex flex-col justify-end gap-1">
                                                                    <div className="btn" onClick={onHandleCreateTeamId}>
                                                                        Create Team ID
                                                                    </div>
                                                                </div>}
                                
                            </div>
                        </>}
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <input type="checkbox" className="cursor-pointer p-2"/>
                        <p>I agree to Block Trace&apos;s <span className="font-bold">Term of Service</span> and <span className="font-bold">Privacy Policy</span></p>
                    </div>
                    <div className="flex flex-col gap-10 w-full mt-[3rem]">
                        <Button className="btn" title="Register" elementType="submit"/>
                    </div>
                </form>
            </div>
            <div className="bg-[#726BDF] flex items-center justify-center flex-1">
                <Image src="/Login.png" className="w-[80%]" width="800" height="800" alt="Logo" />
            </div>    
        </div>
     );
}
 
export default Register;