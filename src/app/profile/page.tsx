'use client';
import { FC, useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {getSubSystemContract as getSubSystemContract} from "../contracts/subsystemContract";
import { redirect, useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";
import Layout from "../components/Layout";
import { Router } from "next/router";

interface ProfileProps {
    
}

interface CountdownTimerProps {
    datetimeValue: number
}
interface ModalUpgradeProps {
    setIsShowUpgrade: ( isShow: boolean ) => void;
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
    const [isUpgrade, setIsUpgrade] = useState(false)
    const [timeValidPremium, setTimeValidPremium] = useState(0)
    const [isShowUpgrade, setIsShowUpgrade] = useState(false)

    const [selectedFile, setSelectedFile] = useState(null);
    const [response, setResponse] = useState('');
    
    
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

    const handleFileSelect = (event:any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async() => {
        console.log('selectedFile',selectedFile)
        if (selectedFile) {
            console.log('selectedFile',selectedFile)

            const formData = new FormData();
            formData.append('file', selectedFile);
        
            await fetch('http://192.168.30.44:6868/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                   // setResponse(response)
                console.log('The value is:', data);
                 setResponse(data.value)
                // Further processing or handling of the response value
              })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    useEffect(()=>{
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('user: ', parsedData)
            SetDataUser(parsedData)
        }
        
        getSubSystemContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await contract.methods.getAllSubsystem().call({
              from: accounts[0]
            })
            .then(async(response : any)=>{
                console.log('response1', response)
                if(response && response.length > 0){
                    await response.forEach((item : any)=>{
                        if(accounts[0].toLowerCase() === item["userAddress"].toLowerCase()){
                            let now = new Date();
                            let nowDatetime= now.getTime();
                            let isLicense = nowDatetime - (Number(item["registerDate"])+ 7 * 24 * 60 * 60 * 1000)>0 ? false : true;
                            if(isLicense){
                                setIsUpgrade(true)
                                setTimeValidPremium(Number(item["registerDate"]))
                            }else{
                                setIsUpgrade(false)
                            }
                            console.log('isLicense', isLicense)
                        }
                    })
                }
            })
            .catch((err : any)=>{console.log(err);})
        })  
      },[])

    return ( 
        <Layout>
            {/* <div>
                <img className="w-full h-[25vh] object-cover" src="/Rectangle.svg" alt=""
                    />
            </div> */}
            <div className={`h-full p-6 mt-[4rem] flex justify-center items-center ${!isUpgrade? ' gap-10': ''}`}>
                {isShowUpgrade ?
                    <ModalUpgrade setIsShowUpgrade={setIsShowUpgrade}/>
                    :
                    <>
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

                                {dataUser.usertype !=='Personal'
                                && 
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex gap-2 items-center text-gray-400 ">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0a208 208 0 0 1 416 0z"/></svg>
                                            <p className="font-semibold">Role</p>
                                        </div>
                                        <p className="">{dataUser.userole}</p>
                                    </div>
                                }

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
                                {dataUser.teamid !=='0' && 
                                    <div className="w-full flex justify-between items-center">
                                        <div className="flex gap-2 items-center text-gray-400 ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-1.216 333.625c55.343.728 101.183 45.781 116.413 103.191c5.807 23.424 6.462 47.188.608 71.998c-8.827 34.929-26.498 69.048-59.423 90.008l47.986 22.796l114.021 55.205c11.199 4.8 16.793 14.399 16.793 28.8v110.372c0 22.763 1.808 42.393-26.406 50.418H388.792c-27.134-.391-28.258-27.874-27.622-50.418V705.623c0-14.4 6.009-24.415 18.009-30.016l117.591-53.989L542.401 600c-20.8-13.6-37.202-32.383-49.202-56.383c-14.41-31.684-20.123-72.814-9.612-110.411c13.288-50.962 54.904-96.748 115.197-99.581zm-195.593 50.38c17.601 0 33.587 5.215 47.986 15.615c-3.993 11.198-7.375 23.009-10.183 35.41c-2.799 12.398-4.217 25.38-4.217 38.981c0 20.001 2.796 39.199 8.396 57.6c5.599 18.399 13.61 35.217 24.013 50.418c-4.801 6.399-11.187 11.993-19.188 16.793l-88.83 40.805c-12 6.4-21.599 15.376-28.799 26.977c-7.2 11.6-10.79 24.619-10.79 39.02v110.372h-87.576c-12.705-.198-21.286-13.002-21.619-26.368V685.221c0-12 4.384-20.013 13.184-24.013L358.777 600c-34.417-21.156-51.021-59.395-52.773-101.976c.606-52.462 34.992-109.661 97.187-114.019zm393.58 0c55.291.874 95.229 55.691 97.227 114.02c-.304 38.595-15.369 75.863-50.418 100.798l130.813 62.386c8.8 4.8 13.184 12.812 13.184 24.013v104.407c-.132 12.392-6.82 25.103-21.58 26.367h-90.008V705.623c0-14.4-3.59-27.419-10.79-39.02s-16.8-20.576-28.8-26.976c-37.304-17.339-80.146-29.784-108.017-58.814c20.8-32 31.193-67.601 31.193-106.802c0-24.8-4.384-49.214-13.184-73.214c14.452-9.541 31.558-16.524 50.38-16.792z"/></svg>
                                            <p className="font-semibold">Team ID</p>
                                        </div>
                                        <p className="">{dataUser.teamid}</p>
                                    </div>
                                }
                                {isUpgrade
                                    &&
                                <div className="flex gap-4 p-3 w-full bg-[#ffcc48] items-center rounded-xl">
                                    <div className="p-4 rounded-full bg-white text-[#ffcc48]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.68 13.69L12 11.93l2.31 1.76l-.88-2.85L15.75 9h-2.84L12 6.19L11.09 9H8.25l2.31 1.84l-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2l6 2v-7.72A7.96 7.96 0 0 0 20 10zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6s2.69-6 6-6z"/></svg>
                                    </div>
                                    <div className="flexflex-col gap-2">
                                        <div className="font-bold text-white text-2xl">Premium Account</div>
                                        <div className="text-white text-xl">
                                            <CountdownTimer datetimeValue={timeValidPremium + 7 * 24 * 60 * 60 * 1000} />
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                        {!isUpgrade &&
                            <div className="flex flex-col gap-6 p-10 bg-gradient-to-bl from-indigo-300 to-purple-400 rounded-xl items-center justify-center">
                                <div className="flex justify-center">
                                    <div className="p-6 rounded-full bg-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="text-[#fb923d]" width="40" height="40" viewBox="0 0 32 32"><path fill="currentColor" d="M21 24H11a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2zm0 4H11v-2h10zm7.707-13.707l-12-12a1 1 0 0 0-1.414 0l-12 12A1 1 0 0 0 4 16h5v4a2.002 2.002 0 0 0 2 2h10a2.003 2.003 0 0 0 2-2v-4h5a1 1 0 0 0 .707-1.707zM21 14v6H11v-6H6.414L16 4.414L25.586 14z"/></svg>
                                    </div>
                                </div>
                                <h1 className="text-3xl font-bold text-white">UPGRADE PLAN</h1>
                                <p className="text-xl text-white">Get special offers up to 7 days</p>
                                <div className="btn-yellow cursor-pointer" onClick={()=>setIsShowUpgrade(true)}>Upgrade</div>
                            </div>
                        }
                        {/* <div className="p-6 rounded-xl ml-10  bg-white">
                            <input type="file" onChange={handleFileSelect} />
                            <button className="btn" onClick={handleUpload}>Upload</button>
                            {response && <img src={response} />}
                        </div> */}
                    </>
                }
            </div>
        </Layout>
     );
}
 
export default Profile;

const ModalUpgrade:FC <ModalUpgradeProps> = ({setIsShowUpgrade}) =>{
    const router = useRouter();
    const handleUpgrade = useCallback(async() =>{
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        await getSubSystemContract().then( async(contract)=>{
            let typeOfSubsystem:string = 'Yolo'
            let registerDate:string = new Date().getTime().toString()
            await contract.methods.addSubsystem(typeOfSubsystem, registerDate)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully upgrade to plus');
                    router.push('/profile');
                }
            }).catch((err : any)=>{console.log(err)})
        })
    }, []);

    return(
        <div className="w-[30%] h-[75vh] flex flex-col rounded-xl p-6 gap-4 shadow-xl bg-white">
            <Toaster />
            <div className="flex justify-end">
                <svg onClick={()=>setIsShowUpgrade(false)} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <div className="w-full text-center flex flex-col items-center gap-5">
                    <p className="font-bold text-2xl">PLUS</p>
                    <div className="bg-[#726BDF] w-10 h-2 rounded-xl"></div>
                </div>
                <div className="p-6 rounded-full bg-[#febc1e] text-white mt-6"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M9.68 13.69L12 11.93l2.31 1.76l-.88-2.85L15.75 9h-2.84L12 6.19L11.09 9H8.25l2.31 1.84l-.88 2.85zM20 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 2.03.76 3.87 2 5.28V23l6-2l6 2v-7.72A7.96 7.96 0 0 0 20 10zm-8-6c3.31 0 6 2.69 6 6s-2.69 6-6 6s-6-2.69-6-6s2.69-6 6-6z"/></svg></div>
                <div className="text-6xl font-bold mt-4">7 days</div>
                <div className="flex flex-col items-start justify-center mt-6 gap-6 text-xl">
                    <div className="flex gap-4 items-center ">
                        <div className="text-[#63c59b]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <span className="font-semibold">High accuracy</span>
                    </div>    
                    <div className="flex gap-4 items-center ">
                        <div className="text-[#63c59b]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <span className="font-semibold">Flexibility and adaptability</span>
                    </div>    
                    <div className="flex gap-4 items-center ">
                        <div className="text-[#63c59b]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <span className="font-semibold">Real-time detection</span>
                    </div>    
                    <div className="flex gap-4 items-center ">
                        <div className="text-[#63c59b]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <span className="font-semibold">Enhanced productivity</span>
                    </div>    
                    <div className="flex gap-4 items-center ">
                        <div className="text-[#63c59b]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                        </div>
                        <span className="font-semibold">Innovation and differentiation</span>
                    </div>    
                </div>
                <div className="bg-[#726BDF] px-10 py-6 text-white font-bold mt-8 cursor-pointer" onClick={handleUpgrade}>
                    UPGRADE NOW
                </div>
            </div>
        </div>
    )
}

const CountdownTimer:FC <CountdownTimerProps> = ({ datetimeValue }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  function calculateRemainingTime() {
    const now = new Date();
    const targetDate = new Date(datetimeValue);
    const timeRemaining = targetDate.getTime() - now.getTime();

    if (timeRemaining <= 0) {
      // Target date has passed
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const seconds = Math.floor(timeRemaining / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days: days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  }

  return (
    <div className="font-semibold text-red-500 rounded-xl">
      <p>{remainingTime.days} days {remainingTime.hours} hours: {remainingTime.minutes} minutes: {remainingTime.seconds}</p>
    </div>
  );
};
