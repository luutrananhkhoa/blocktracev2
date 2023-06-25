'use client';
import { FC, useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {getUserContract as getUserContract} from "../contracts/userContract";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import SidebarCustomer from "../components/SidebarCustomer";

interface CustomerManagementProps {
    
}
 
const CustomerManagement: FC<CustomerManagementProps> = () => {
    const router = useRouter()
    const [listUsers, setListUsers] = useState([])
    const [addressWallet, setAddressWallet] = useState<string>('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onHandleConnect = async ()=>{
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if(accounts){
         //  console.log(accounts[0])
          setAddressWallet(accounts[0])
          let meta = document.getElementById('addressMetamask') as HTMLInputElement
          if(meta){
              meta.value = accounts[0]
          }
      }
    }

    const handleStarter = () =>{
      router.push('/customerproduct');
    }

    const onSubmit = async (data : any ) => {
      console.log(data)

      await getUserContract().then(async(contract) =>{
        await contract.methods.getAllUser().call({
           from: addressWallet
         })
         .then((response : any)=>{
            console.log('List user:', response)
            setListUsers(response)
         })
         .catch((err : any)=>{console.log(err);})
       })

       let isMember = listUsers && listUsers.some(item => {
         let i : string = item['userAddress'];
         return i.toLowerCase() === addressWallet.toLowerCase();
         
      });

      if(isMember){
         console.log('isMember 2')
         toast.error("Account already exists")
      }else{
         getUserContract().then((contract)=>{
            contract.methods.addUser(data.fullname, 0, 'Customer' , data.dayofbirth, data.citizenId, data.email, data.phone, 0)
            .send({from: addressWallet})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully register');
                  //   router.push('/login');
                }
            }).catch((err : any)=>{console.log(err)})
        })
      }
}

    return ( 
        <div className="min-h-screen flex">
            <SidebarCustomer />
            <div className="p-10 w-full min-h-screen bg-[#FDFDFD]">
                <h1 className="text-4xl font-bold">Home</h1>
                <div className="w-full h-[35vh] mt-10 bg-[#3F2A8C] rounded-2xl flex flex-col items-center justify-center">
                  <h1 className="text-5xl font-bold text-white">Get started with BlockTrace</h1>
                  <p className="text-[#BDBCF1] font-semibold mt-8 text-lg w-[30%] text-center">Securely store and protect your valuable products with our blockchain-based support system.</p>
                  <div className="mt-8 px-12 py-5 text-xl rounded-full font-semibold text-[#3F2A8C] bg-[#7FEEC4] cursor-pointer" onClick={handleStarter}>Get Starter</div>
                </div>
            </div>
        </div>
     );
}
 
export default CustomerManagement;