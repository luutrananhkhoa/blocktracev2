'use client';
import { FC, useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {getUserContract as getUserContract} from "../contracts/userContract";
import { redirect, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";
import Layout from "../components/Layout";

interface MobileTrackingProps {
    
}

declare global {
    interface Window {
      ethereum: any
    }
}

interface User {
    dateofbirth : string | null,
    useraddress : string | null,
    usercccd : string | null,
    useremail : string | null,
    userid : string | null,
    username : string | null,
    userole: string | null,
    userphone: string | null,
    usertype : string | null,
    teamid : string | null
}
const MobileTracking: FC<MobileTrackingProps> = () => {
    const [listUser, setListUsers] = useState([])
    const [dataUser, SetDataUser] = useState<User>({
        useraddress: '',
        usercccd: '',
      })
    useEffect(()=>{
        getUserContract().then(async (contract) =>{
            await contract.methods.getAllUser().call({
              from: '0xc855d47A54743745a8D529176B0368fd5c1fd96D'
            })
            .then((response : any)=>{
                console.log('List user:', response)
                let user = response[0]
                console.log('user:', user)
                let userData ={
                    useraddress: user['userAddress'],
                    usercccd: user['userCccd'],
                }
                console.log('userData:', userData)
                SetDataUser(userData)   
            })
            .catch((err : any)=>{console.log(err);})
          })
          console.log('dataUser:', dataUser)
      },[])

    return ( 
        <Layout>
            <div className="flex w-full min-h-screen bg-white">
                h1: {dataUser.usercccd}
            </div>
        </Layout>

     );
}
 
export default MobileTracking;