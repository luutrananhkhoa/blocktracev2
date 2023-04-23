'use client';
import { FC, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {getUserContract as getUserContract} from "../contracts/userContract";
import { redirect } from "next/navigation";

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

    //Register function
    const onSubmit = (data : any ) => {
        let teamId = Math.floor(Math.random() * 1000000)

        getUserContract().then((contract)=>{
            contract.methods.addUser(data.fullname, data.citizenId, data.email, data.phone, teamId)
            // contract.methods.addUser(data.fullname, data.citizenId, data.dayofbirth, data.email, data.phone, teamId)
            .send({from: addressWallet})
            .then((res : any)=>{
              console.log(res)
              if(res.status){
                console.log('status: ', res.status)
                redirect('/login')

                // emailjs.send('service_n1iynk4', 'template_0wgwajc', valuesEmail, 'McUIWs_FHXPZgmsAI')
                // .then((result) => {
                //     console.log(result.text);
                // }, (error) => {
                //     console.log(error.text);
                // });
              }
    
            }).catch((err : any)=>{console.log(err)})
          })
    }

    return ( 
        <div className="flex w-full min-h-screen bg-white">
            <div className="flex items-center justify-center flex-col min-h-screen flex-1 ">
                <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-[10rem] py-[4rem] h-screen w-full"
                    >
                    <img src="/logo.svg" className="w-[64px] mb-10" alt="Logo" />
                    <h1 className="text-[#09003C] text-6xl">Create new account</h1>
                    <div className="flex text-[#949494] text-xl mb-6 mt-6">
                        <p>Already a member?</p><Link href={'/login'} className="text-[#8346FF] font-bold ml-2"> Log In</Link>
                    </div>
                    <div className="flex flex-col gap-5 w-full mt-[2rem]">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullname" className="font-bold ">Full Name</label>
                            <input type="text" name="fullname" className="px-4 py-4 rounded-[10px]" placeholder="Full Name" {...register("fullname", { required: true })}/>
                            {errors.fullname && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="flex justify-between items-end gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="addressMetamask" className="font-bold ">Address</label>
                                <input type="text" name="addressMetamask" id="addressMetamask" className="px-4 py-4 rounded-[10px]" placeholder="addressMetamask" {...register("addressMetamask", { required: true })}/>
                            </div>
                            <div className="flex flex-col justify-end gap-1">
                                <Button className="btn-yellow" title="Connect Metamask" onClick={onHandleConnect}/>
                            </div>
                        </div>
                      
                        <div className="flex justify-between gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="citizenId" className="font-bold ">Citizen Identification Number</label>
                                <input type="number" name="citizenId" className="px-4 py-4 rounded-[10px]" placeholder="Citizen ID" {...register("citizenId", { required: true })}/>
                                {errors.citizenId && <span className="text-red-600">This field is required</span>}
                            </div>
                            <div className="flex flex-col gap-1 flex-1">
                                <label htmlFor="dayofbirth" className="font-bold ">Date of birth</label>
                                <input type="date" name="dayofbirth" className="px-4 py-4 rounded-[10px]" {...register("dayofbirth", { required: true })}/>
                                {errors.dayofbirth && <span className="text-red-600">This field is required</span>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-bold ">Email</label>
                            <input type="text" name="email" className="px-4 py-4 rounded-[10px]" placeholder="Your Email" {...register("email", { required: true })}/>
                            {errors.email && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="phone" className="font-bold ">Phone Number</label>
                            <input type="text" name="phone" className="px-4 py-4 rounded-[10px]" placeholder="Your Phone Number" {...register("phone", { required: true })}/>
                            {errors.phone && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                        <input type="checkbox" className="cursor-pointer p-2"/>
                        <p>I agree to Block Trace's <span className="font-bold">Term of Service</span> and <span className="font-bold">Privacy Policy</span></p>
                    </div>
                    
                    <div className="flex flex-col gap-10 w-full mt-[3rem]">
                        <Button className="btn-red" title="Register" type="submit"/>
                    </div>
                </form>
            </div>
            <div className="bg-[#8346FF] min-h-screen flex-1">

            </div>  
        </div>
     );
}
 
export default Register;