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

interface ProfileProps {
    
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
declare global {
    interface Window {
      ethereum: any
    }
  }

const Profile: FC<ProfileProps> = () => {
    const [addressWallet, setAddressWallet] = useState<string>('')
    const [dataUser, SetDataUser] = useState<User>({
        dateofbirth: null,
        useraddress: null,
        usercccd: null,
        useremail: null,
        userid: null,
        username: null,
        userole: null,
        userphone: null,
        usertype: null,
        teamid: null
      })
    const router = useRouter();

    useEffect(()=>{
          const storedData = localStorage.getItem('user_data');
          if (storedData) {
              const parsedData = JSON.parse(storedData);
              console.log('user: ', parsedData)
              SetDataUser(parsedData)
          }
          
      },[])

    return ( 
        <Layout>
            {/* <div>
                <img className="w-full h-[25vh] object-cover" src="/Rectangle.svg" alt=""
                    />
            </div> */}
            <div className="h-full p-6 mt-[4rem] flex justify-center items-center">
                <div className="bg-white p-10 rounded-lg">
                    <div className="flex flex-col items-center gap-4">
                        <h1 className="text-xl font-bold text-gray-500">{dataUser.usertype} Account</h1>
                        <h1 className="text-6xl font-bold">{dataUser.username}</h1>
                        <h1 className="text-xl font-bold text-[#5853AF]">{dataUser.useraddress}</h1>
                    </div>
                    <p className="mt-10 text-3xl font-semibold">Information</p>

                    <div className="w-full flex flex-col items-center gap-8 text-xl mt-6">
                        <div className="w-full mt-4 flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5a7 7 0 1 0 7 7a7 7 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5a5 5 0 0 1-5 5Zm0-8a3 3 0 1 0 3 3a3 3 0 0 0-3-3Zm0 4a1 1 0 1 1 1-1a1 1 0 0 1-1 1Zm0-12a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 20a9 9 0 1 1 9-9a9 9 0 0 1-9 9Z"/></svg>
                                <p className="font-semibold">Account type</p>
                            </div>
                            <p className="">{dataUser.usertype}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"/></svg>
                                <p className="font-semibold">Role</p>
                            </div>
                            <p className="">{dataUser.userole}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1200"><path fill="currentColor" d="M0 99.87v1000.26h100.26V99.87H0zm186.135 0v1000.26h24.089V99.87h-24.089zm57.883 0v1000.26h76.219V99.87h-76.219zm153.658 0v1000.26h32.525V99.87h-32.525zm118.449 0v1000.26h24.041V99.87h-24.041zm34.379 0v1000.26h99.626V99.87h-99.626zm159.411 0v1000.26h50.18V99.87h-50.18zm149.025 0v1000.26h11.118V99.87H858.94zm87.63 0v1000.26h33.501V99.87H946.57zm119.376 0v1000.26h24.09V99.87h-24.09zm34.428 0v1000.26H1200V99.87h-99.626z"/></svg>
                                <p className="font-semibold">User ID</p>
                            </div>
                            <p className="">{dataUser.userid}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6.515 4.621L9 4l2 3.5L9.5 9c1 2 3.5 4.5 5.5 5.5l1.5-1.5l3.5 2l-.621 2.485c-.223.89-1.029 1.534-1.928 1.351c-5.213-1.06-11.228-7.074-12.287-12.287c-.183-.9.46-1.705 1.35-1.928Z"/></svg>
                                <p className="font-semibold">Phone</p>
                            </div>
                            <p className="">{dataUser.userphone}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1200"><path fill="currentColor" d="M0 146.484v168.677l600 342.114l600-342.114V146.484H0zm0 276.563v494.604L305.64 597.29L0 423.047zm1200 0L894.36 597.29L1200 917.651V423.047zM389.575 645.19L0 1053.516h1200L810.425 645.19L600 765.161L389.575 645.19z"/></svg>
                                <p className="font-semibold">Email</p>
                            </div>
                            <p className="">{dataUser.useremail}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><mask id="quillCalendarMore0" fill="#fff"><path fill-rule="evenodd" d="M12.5 19.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm5 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM21 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd"/></mask><g fill="none"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h22m-6-4V4M11 8V4M7 28h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2Z"/><path fill="currentColor" fill-rule="evenodd" d="M12.5 19.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm5 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM21 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd"/><path fill="currentColor" d="M11 22a2.5 2.5 0 0 0 2.5-2.5h-2a.5.5 0 0 1-.5.5v2Zm-2.5-2.5A2.5 2.5 0 0 0 11 22v-2a.5.5 0 0 1-.5-.5h-2ZM11 17a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5A2.5 2.5 0 0 0 11 17v2a.5.5 0 0 1 .5.5h2ZM16 22a2.5 2.5 0 0 0 2.5-2.5h-2a.5.5 0 0 1-.5.5v2Zm-2.5-2.5A2.5 2.5 0 0 0 16 22v-2a.5.5 0 0 1-.5-.5h-2ZM16 17a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5A2.5 2.5 0 0 0 16 17v2a.5.5 0 0 1 .5.5h2Zm3 0a.5.5 0 0 1-.5.5v2a2.5 2.5 0 0 0 2.5-2.5h-2ZM21 19a.5.5 0 0 1 .5.5h2A2.5 2.5 0 0 0 21 17v2Zm-.5.5a.5.5 0 0 1 .5-.5v-2a2.5 2.5 0 0 0-2.5 2.5h2Zm.5.5a.5.5 0 0 1-.5-.5h-2A2.5 2.5 0 0 0 21 22v-2Z" mask="url(#quillCalendarMore0)"/></g></svg>
                                <p className="font-semibold">Date Of Birth</p>
                            </div>
                            <p className="">{dataUser.dateofbirth}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none" stroke="currentColor"><circle cx="22" cy="23" r=".5" fill="currentColor"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M24 19v-2.917c0-1.15-.895-2.083-2-2.083s-2 .933-2 2.083V19m-7 8H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v4M17 25v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2Z"/><path fill="currentColor" d="M9.5 9a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm4 0a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm4 0a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Z"/></g></svg>
                                <p className="font-semibold">Citizen ID</p>
                            </div>
                            <p className="">{dataUser.usercccd}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-1.216 333.625c55.343.728 101.183 45.781 116.413 103.191c5.807 23.424 6.462 47.188.608 71.998c-8.827 34.929-26.498 69.048-59.423 90.008l47.986 22.796l114.021 55.205c11.199 4.8 16.793 14.399 16.793 28.8v110.372c0 22.763 1.808 42.393-26.406 50.418H388.792c-27.134-.391-28.258-27.874-27.622-50.418V705.623c0-14.4 6.009-24.415 18.009-30.016l117.591-53.989L542.401 600c-20.8-13.6-37.202-32.383-49.202-56.383c-14.41-31.684-20.123-72.814-9.612-110.411c13.288-50.962 54.904-96.748 115.197-99.581zm-195.593 50.38c17.601 0 33.587 5.215 47.986 15.615c-3.993 11.198-7.375 23.009-10.183 35.41c-2.799 12.398-4.217 25.38-4.217 38.981c0 20.001 2.796 39.199 8.396 57.6c5.599 18.399 13.61 35.217 24.013 50.418c-4.801 6.399-11.187 11.993-19.188 16.793l-88.83 40.805c-12 6.4-21.599 15.376-28.799 26.977c-7.2 11.6-10.79 24.619-10.79 39.02v110.372h-87.576c-12.705-.198-21.286-13.002-21.619-26.368V685.221c0-12 4.384-20.013 13.184-24.013L358.777 600c-34.417-21.156-51.021-59.395-52.773-101.976c.606-52.462 34.992-109.661 97.187-114.019zm393.58 0c55.291.874 95.229 55.691 97.227 114.02c-.304 38.595-15.369 75.863-50.418 100.798l130.813 62.386c8.8 4.8 13.184 12.812 13.184 24.013v104.407c-.132 12.392-6.82 25.103-21.58 26.367h-90.008V705.623c0-14.4-3.59-27.419-10.79-39.02s-16.8-20.576-28.8-26.976c-37.304-17.339-80.146-29.784-108.017-58.814c20.8-32 31.193-67.601 31.193-106.802c0-24.8-4.384-49.214-13.184-73.214c14.452-9.541 31.558-16.524 50.38-16.792z"/></svg>
                                <p className="font-semibold">Team ID</p>
                            </div>
                            <p className="">{dataUser.teamid}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
        
     );
}
 
export default Profile;