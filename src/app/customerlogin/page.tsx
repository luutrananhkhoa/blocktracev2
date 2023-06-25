'use client';
import { FC, useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {getUserContract as getUserContract} from "../contracts/userContract";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";

interface CustomerLoginProps {
    
}
 
const CustomerLogin: FC<CustomerLoginProps> = () => {
    const router = useRouter()
    const [listUsers, setListUsers] = useState([])
    const [isLogin, setIsLogin] = useState<boolean>(true)
    const [addressWallet, setAddressWallet] = useState<string>('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

   const onHandleConnect =  async()=>{
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

  const onHandleLogin = async () =>{
   let addressMetamask = ''
   const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    addressMetamask = accounts[0]
    getUserContract().then((contract) =>{
      contract.methods.getAllUser().call({
        from: addressMetamask
      })
      .then((response : any)=>{
        console.log('List user:', response)
        console.log('addressWallet', addressMetamask)
          let flag = response && response.some((item: { [x: string]: string; }) => {
              let i : string = item['userAddress'];
              return i.toLowerCase() === addressMetamask.toLowerCase();
          });
          if(!flag){
              toast.error("You don't have an account!")

          }else{
              toast.success('Welcome to Block Trace!')

              const userDataStorage = localStorage.getItem('customer_data');
              if(userDataStorage){
                  localStorage.removeItem('customer_data');
              }
              response.forEach((user:any)=>{
                  if(user['userAddress'].toLowerCase() === addressMetamask.toLowerCase()){
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
                      localStorage.setItem('customer_data', JSON.stringify(userData));
                  }
              })
              router.push('/customermanagement')
          }
      })
      .catch((err : any)=>{console.log(err);})
    })
  }

   const onSubmit = async (data : any ) => {
      console.log(data)
      let listUsersData : any= []
      await getUserContract().then( async (contract) =>{
         await contract.methods.getAllUser().call({
           from: addressWallet
         })
         .then((response : any)=>{
            console.log('List user:', response)
            listUsersData = response
            setListUsers(response)
         })
         .catch((err : any)=>{console.log(err);})
       })
     
      //  const filteredArray = listUsersData.filter((item : any) => item["userType"] === 'Customer');

       let isMember = listUsersData && listUsersData.some((item : any) => {
         let i : string = item['userAddress'];
         return i.toLowerCase() === addressWallet.toLowerCase();
         
      });

      if(isMember){
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
        <div className="flex items-center justify-center w-full min-h-screen bg-white">
            <Toaster />
            <div className="flex w-full min-h-screen">
               <div className="flex-1 bg-white">
                  <div className="flex items-center justify-center w-full min-h-screen">
                     <Image src="/newlogonavy.svg" className="w-[40%] mr-4" width="64" height="48" alt="Logo" />
                  </div>
               </div>
               <div className="flex-1 bg-[#ecebfe] flex items-center justify-center">
                  <div className="h-[75vh] w-[60%] bg-white rounded-lg px-10 py-12 shadow-lg shadow-indigo-500/40 ">
                     <div className="flex flex-col gap-2 items-center">
                        <h1 className="font-bold text-3xl">Welcome to BlockTrace</h1>
                        <p className="font-semibold text-xl text-gray-400">Please create an account to use the website.</p>
                     </div>
                     {isLogin ?
                        <div className="p-4 flex flex-col gap-6 w-full mt-[2rem]">
                              <div className="flex flex-col w-full">
                                 <div className="btn w-full text-center cursor-pointer" onClick={onHandleLogin}>
                                    Login
                                 </div>
                                 <div className="mt-4 btn w-full text-center cursor-pointer" onClick={()=>setIsLogin(false)}>
                                    Register
                                 </div>
                              </div>
                        </div>
                        :
                        <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col gap-6 w-full mt-[2rem]">
                           <div className="flex justify-between items-end gap-4">
                                 <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="addressMetamask" className="font-bold ">Address</label>
                                    <input type="text" id="addressMetamask" className="px-4 py-4 rounded-[10px]" placeholder="Address Metamask" {...register("addressMetamask", { required: true })}/>
                                 </div>
                                 <div className="flex flex-col justify-end gap-1">
                                    <div className="btn-red" onClick={onHandleConnect}>
                                    Connect Metamask
                                    </div>
                                 </div>
                           </div>
                           <div className="flex flex-col gap-1">
                                 <label htmlFor="fullname" className="font-bold ">Full Name</label>
                                 <input type="text" className="px-4 py-4 rounded-[10px]" placeholder="Full Name" {...register("fullname", { required: true })}/>
                                 {errors.fullname && <span className="text-red-600">This field is required</span>}
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
      
                           <div className="flex flex-col gap-10 w-full mt-[1rem]">
                                 <Button className="btn" title="Register" elementType="submit"/>
                           </div>
                              <p className="mt-2 text-center text-xl font-bold">Already account? <span className="text-[#FF1E5E] cursor-pointer" onClick={()=>setIsLogin(true)}>Sign In</span></p>
                        </form>
                     }
                  </div>
               </div>
            </div>
            
         </div>
     );
}
 
export default CustomerLogin;