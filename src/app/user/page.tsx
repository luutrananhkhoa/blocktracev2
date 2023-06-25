'use client';
import { FC, useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import {getSubSystemContract as getSubSystemContract} from "../contracts/subsystemContract";
import { redirect, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";
import Layout from "../components/Layout";
import { Router } from "next/router";
import {getUserContract as getUserContract} from "../contracts/userContract";

interface UserProps {
    
}

interface TableMemberProps {
    members: TableMemberType[];
}

interface TableMemberType {
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

interface UserMember {
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

const User: FC<UserProps> = () => {
    const router = useRouter();
    const [listMember, setListMember] = useState<TableMemberType[]>([])
    const [teamIdValue, setTeamIdValue] = useState('')

    useEffect(()=>{
        let arrayMember : any = []
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('user: ', parsedData)
            setTeamIdValue(parsedData.teamid)

            getUserContract().then(async (contract) =>{
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                await contract.methods.getAllUser().call({
                  from:  accounts[0]
                })
                .then((response : any)=>{
                    console.log('List user:', response)
                    if(response.length > 0){
                        response.forEach((user: any) => {
                            if(parsedData.teamid === user["teamId"]){
                                let member = {
                                    dateofbirth: user["dateOfBirth"],
                                    useraddress: user["userAddress"],
                                    usercccd: user["userCccd"],
                                    useremail: user["userEmail"],
                                    userid: user["userId"],
                                    username: user["userName"],
                                    userole: user["userRole"],
                                    userphone: user["userPhone"],
                                    usertype: user["userType"],
                                    teamid: user["teamId"]
                                }
                                arrayMember.push(member)
                            }
                        })
                        setListMember(arrayMember)
                        console.log('arrayMember', arrayMember)
                    }
                    
                })
                .catch((err : any)=>{console.log(err);})
              })
            
        }
        
        // getSubSystemContract().then(async (contract) =>  {
        //     const accounts = await window.ethereum.request({
        //         method: "eth_requestAccounts",
        //     });
        //     await contract.methods.getAllSubsystem().call({
        //       from: accounts[0]
        //     })
        //     .then(async(response : any)=>{
        //         console.log('response1', response)
        //         if(response && response.length > 0){
        //             await response.forEach((item : any)=>{
        //                 if(accounts[0].toLowerCase() === item["userAddress"].toLowerCase()){
        //                     let now = new Date();
        //                     let nowDatetime= now.getTime();
        //                     let isLicense = nowDatetime - (Number(item["registerDate"])+ 7 * 24 * 60 * 60 * 1000)>0 ? false : true;
        //                     if(isLicense){
        //                         setIsUpgrade(true)
        //                         setTimeValidPremium(Number(item["registerDate"]))
        //                     }else{
        //                         setIsUpgrade(false)
        //                     }
        //                     console.log('isLicense', isLicense)
        //                 }
        //             })
        //         }
        //     })
        //     .catch((err : any)=>{console.log(err);})
        // })  
    },[])

    return ( 
        <Layout>
            <div className="p-6">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">All members</h1>
                </div>
                <div className="flex justify-between mt-2">
                    <h1 className="text-2xl text-gray-500">Team ID: {teamIdValue}</h1>
                </div>
                <div className="mt-10">
                    <div>
                        <TableMember members={listMember} />
                    </div>
                </div>
                <span id="noProductFilter" className="w-full flex justify-center mt-10"></span>
            </div>
        </Layout>
     );
}
 
export default User;

const TableMember: FC<TableMemberProps>  = ({ members }) => {
    return (
      <table className="min-w-full divide-y shadow-md divide-gray-200 text-lg">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Full Name
            </th>
            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {members.map((user, index)=>{
                return <tr key={user.userid}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{index +1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{user.userphone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{user.userole==="0"? "Admin" : user.userole}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{user.usertype}</div>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    );
  };