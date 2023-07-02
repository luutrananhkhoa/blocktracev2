'use client';
import { FC, useCallback, useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import SidebarCustomer from "../components/SidebarCustomer";

interface ProfileCustomerProps {
    
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

const ProfileCustomer: FC<ProfileCustomerProps> = () => {
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
        const storedData = localStorage.getItem('customer_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            SetDataUser(parsedData)
        }
        
      },[])

    return ( 
        <div className="flex w-full min-h-screen bg-[#f8f8fa]">
            <SidebarCustomer />
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1200"><path fill="currentColor" d="M0 99.87v1000.26h100.26V99.87H0zm186.135 0v1000.26h24.089V99.87h-24.089zm57.883 0v1000.26h76.219V99.87h-76.219zm153.658 0v1000.26h32.525V99.87h-32.525zm118.449 0v1000.26h24.041V99.87h-24.041zm34.379 0v1000.26h99.626V99.87h-99.626zm159.411 0v1000.26h50.18V99.87h-50.18zm149.025 0v1000.26h11.118V99.87H858.94zm87.63 0v1000.26h33.501V99.87H946.57zm119.376 0v1000.26h24.09V99.87h-24.09zm34.428 0v1000.26H1200V99.87h-99.626z"/></svg>
                                <p className="font-semibold">User ID</p>
                            </div>
                            <p className="">{dataUser.userid}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.515 4.621L9 4l2 3.5L9.5 9c1 2 3.5 4.5 5.5 5.5l1.5-1.5l3.5 2l-.621 2.485c-.223.89-1.029 1.534-1.928 1.351c-5.213-1.06-11.228-7.074-12.287-12.287c-.183-.9.46-1.705 1.35-1.928Z"/></svg>
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><mask id="quillCalendarMore0" fill="#fff"><path fillRule="evenodd" d="M12.5 19.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm5 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM21 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z" clipRule="evenodd"/></mask><g fill="none"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h22m-6-4V4M11 8V4M7 28h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2Z"/><path fill="currentColor" fillRule="evenodd" d="M12.5 19.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Zm5 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0ZM21 21a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Z" clipRule="evenodd"/><path fill="currentColor" d="M11 22a2.5 2.5 0 0 0 2.5-2.5h-2a.5.5 0 0 1-.5.5v2Zm-2.5-2.5A2.5 2.5 0 0 0 11 22v-2a.5.5 0 0 1-.5-.5h-2ZM11 17a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5A2.5 2.5 0 0 0 11 17v2a.5.5 0 0 1 .5.5h2ZM16 22a2.5 2.5 0 0 0 2.5-2.5h-2a.5.5 0 0 1-.5.5v2Zm-2.5-2.5A2.5 2.5 0 0 0 16 22v-2a.5.5 0 0 1-.5-.5h-2ZM16 17a2.5 2.5 0 0 0-2.5 2.5h2a.5.5 0 0 1 .5-.5v-2Zm2.5 2.5A2.5 2.5 0 0 0 16 17v2a.5.5 0 0 1 .5.5h2Zm3 0a.5.5 0 0 1-.5.5v2a2.5 2.5 0 0 0 2.5-2.5h-2ZM21 19a.5.5 0 0 1 .5.5h2A2.5 2.5 0 0 0 21 17v2Zm-.5.5a.5.5 0 0 1 .5-.5v-2a2.5 2.5 0 0 0-2.5 2.5h2Zm.5.5a.5.5 0 0 1-.5-.5h-2A2.5 2.5 0 0 0 21 22v-2Z" mask="url(#quillCalendarMore0)"/></g></svg>
                                <p className="font-semibold">Date Of Birth</p>
                            </div>
                            <p className="">{dataUser.dateofbirth}</p>
                        </div>

                        <div className="w-full flex justify-between items-center">
                            <div className="flex gap-2 items-center text-gray-400 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="none" stroke="currentColor"><circle cx="22" cy="23" r=".5" fill="currentColor"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M24 19v-2.917c0-1.15-.895-2.083-2-2.083s-2 .933-2 2.083V19m-7 8H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v4M17 25v-4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2Z"/><path fill="currentColor" d="M9.5 9a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm4 0a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Zm4 0a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0Z"/></g></svg>
                                <p className="font-semibold">Citizen ID</p>
                            </div>
                            <p className="">{dataUser.usercccd}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default ProfileCustomer;
