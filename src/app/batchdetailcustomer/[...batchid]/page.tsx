'use client';
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import Layout from "@/app/components/Layout";
import {getProcessingContract as getProcessingContract} from "../../contracts/processingContract";
import Button from "@/app/components/Button";
import { getBatchContract } from "@/app/contracts/batchContract";
import QRCode from "qrcode.react";
import SidebarCustomer from "@/app/components/SidebarCustomer";
import { getUserContract } from "@/app/contracts/userContract";

interface BatchDetailCustomerProps {
    
}

interface DataStep {
    productName: string,
    batchId: string,
    userName: string,
    location: string,
    date: string,
    categories: string,
    photo: string
}

const BatchDetailCustomer: FC<BatchDetailCustomerProps> = () => {
    const router = useRouter();
    const params = useParams();
    const [BatchIdValue, setBatchIdValue] = useState(0)
    const [numberOfStep, setNumberOfStep] = useState('')
    const [stepComplete, setStepComplete] = useState(0)
    const [listOwners, setlistOwners] = useState([])
    const [dataStep1, setDataStep1] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })
    const [dataStep2, setDataStep2] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })
    const [dataStep3, setDataStep3] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })
    const [dataStep4, setDataStep4] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })
    const [dataStep5, setDataStep5] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })
    const [dataStep6, setDataStep6] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })
    const [dataStep7, setDataStep7] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })
    const [dataStep8, setDataStep8] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: "",
        photo: ""
    })


    useEffect(()=>{
        let batchId = params.batchid;
        setBatchIdValue(Number(batchId))

        const accounts = window.ethereum.request({
            method: "eth_requestAccounts",
        });

        getBatchContract().then(async (contract) =>  {
            await contract.methods.getAllBatch().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal.length > 0){
                    setNumberOfStep(filteredArrFinal["numOfProcess"])
                }
            })
            .catch((err : any)=>{console.log(err);})
        })  


        getProcessingContract().then(async(contract) =>{
            await contract.methods.getAllStep1().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 1:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep1(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then(async(contract) =>{
            await contract.methods.getAllStep2().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 2:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep2(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then(async(contract) =>{
            await contract.methods.getAllStep3().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 3:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep3(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then(async(contract) =>{
            await contract.methods.getAllStep4().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 4:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep4(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then( async (contract) =>{
            await contract.methods.getAllStep5().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 5:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep5(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })
          getProcessingContract().then( async (contract) =>{
            await contract.methods.getAllStep6().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 6:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep6(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })
          getProcessingContract().then( async (contract) =>{
            await contract.methods.getAllStep7().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 7:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep7(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })
          getProcessingContract().then( async (contract) =>{
            await contract.methods.getAllStep8().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List step 8:', response)
                const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                const filteredArrFinal = filteredArr[0]
                if(filteredArrFinal && filteredArrFinal.length > 0){
                    let item = {
                        productName: filteredArrFinal["productName"],
                        batchId: filteredArrFinal["batchId"],
                        userName: filteredArrFinal["userName"],
                        location: filteredArrFinal["location"],
                        date: filteredArrFinal["date"],
                        categories: filteredArrFinal["categories"],
                        photo: filteredArrFinal["photo"]
                    }
                    setDataStep8(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })
          
          getUserContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await contract.methods.getAllOwner().call({
              from: accounts[0]
            })
            .then(async(response : any)=>{
                console.log('List owner1:', response)
                let listOwner:any = []
                await response.forEach((item: any)=>{
                    if(batchId === item["batchId"]){
                        console.log('item', item)
                        listOwner.push(item["ownerName"])
                    }
                })
                setlistOwners(listOwner)
            })
            .catch((err : any)=>{console.log(err);})
        })  
    },[])

    return ( 
        <div className="min-h-screen flex">
            <SidebarCustomer />
            <div className="p-6 w-full min-h-screen bg-[#f8f8fa]">
                <div className="flex items-center gap-3">
                    <div onClick={()=> router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-9 h-9 text-[#FFD237] cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold">Back to Product</h1>
                </div>
                <div className="flex flex-col mt-12 justify-center items-center">
                    <h1 className="text-6xl font-bold">Tracking</h1>
                    <p className="font-semibold text-gray-600">{numberOfStep} Steps - {stepComplete} Complete</p>
                </div>
                {/* {
                     listOwners.length > 0  &&
                     <div className="w-full flex justify-center mt-12">
                        <div className="w-[25%] text-xl flex flex-col justify-center items-center bg-white shadow-xl rounded-xl">
                            <div className="w-full bg-[#FFD237] flex text-white justify-center p-6 font-bold">Owner</div>
                            {
                                listOwners.map((owner) => (
                                    <div className="w-full text-center text-xl bg-white p-6" key={owner}>
                                        {owner}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                } */}
                <div className="w-full flex items-center justify-center">
                        {stepComplete === 0?
                            <div className="w-[60%] p-10 mt-6 flex flex-col items-center gap-4">
                                <Image src="/noproduct.png" className="w-[60%]" width="800" height="800" alt="Logo" />
                                <h1 className="font-bold text-[#726BDF] text-5xl">No results found</h1>
                                <p className="text-2xl">We couldn't find results</p>
                            </div>
                            :
                            <div className="w-[60%] p-10 mt-6 flex flex-col gap-8">
                            {dataStep1.productName !== '' && 
                            <div className="flex gap-4 h-[30vh] w-full">
                            <div className="h-full flex flex-col">
                                <div className="px-6 py-4 bg-black text-white rounded-lg">Step 1</div>
                                <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                            </div>
                            <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                <div className="flex flex-col gap-6 justify-center">
                                    <div className="flex justify-between">
                                        <p className="font-bold text-gray-500">Product Name</p>
                                        <p>{dataStep1["productName"]}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-gray-500">Product Code</p>
                                        <p>{dataStep1["batchId"]}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-gray-500">User Name</p>
                                        <p>{dataStep1["userName"]}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-gray-500">Location</p>
                                        <p>{dataStep1["location"]}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-gray-500">Date</p>
                                        <p>{dataStep1["date"]}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-gray-500">Category</p>
                                        <p>{dataStep1["categories"]}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-bold text-gray-500">Photo</p>
                                        <a href={dataStep1["photo"]} target="_blank">{dataStep1["photo"]}</a>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        {dataStep2.productName !== '' &&
                            <div className="flex gap-4 h-[30vh] w-full">
                                <div className="h-full flex flex-col">
                                    <div className="px-6 py-4 bg-black text-white rounded-lg">Step 2</div>
                                    <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                                </div>
                                <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                    <div className="flex flex-col gap-6 justify-center">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Name</p>
                                            <p>{dataStep2["productName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Code</p>
                                            <p>{dataStep2["batchId"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">User Name</p>
                                            <p>{dataStep2["userName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Location</p>
                                            <p>{dataStep2["location"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Date</p>
                                            <p>{dataStep2["date"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Category</p>
                                            <p>{dataStep2["categories"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Photo</p>
                                            <a href={dataStep2["photo"]} target="_blank">{dataStep2["photo"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {dataStep3.productName !== '' &&
                            <div className="flex gap-4 h-[30vh] w-full">
                                <div className="h-full flex flex-col">
                                    <div className="px-6 py-4 bg-black text-white rounded-lg">Step 3</div>
                                    <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                                </div>
                                <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                    <div className="flex flex-col gap-6 justify-center">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Name</p>
                                            <p>{dataStep3["productName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Code</p>
                                            <p>{dataStep3["batchId"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">User Name</p>
                                            <p>{dataStep3["userName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Location</p>
                                            <p>{dataStep3["location"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Date</p>
                                            <p>{dataStep3["date"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Category</p>
                                            <p>{dataStep3["categories"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Photo</p>
                                            <a href={dataStep3["photo"]} target="_blank">{dataStep3["photo"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {dataStep4.productName !== '' &&
                            <div className="flex gap-4 h-[30vh] w-full">
                                <div className="h-full flex flex-col">
                                    <div className="px-6 py-4 bg-black text-white rounded-lg">Step 4</div>
                                    <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                                </div>
                                <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                    <div className="flex flex-col gap-6 justify-center">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Name</p>
                                            <p>{dataStep4["productName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Code</p>
                                            <p>{dataStep4["batchId"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">User Name</p>
                                            <p>{dataStep4["userName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Location</p>
                                            <p>{dataStep4["location"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Date</p>
                                            <p>{dataStep4["date"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Category</p>
                                            <p>{dataStep4["categories"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Photo</p>
                                            <a href={dataStep4["photo"]} target="_blank">{dataStep4["photo"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {dataStep5.productName !== '' &&
                            <div className="flex gap-4 h-[30vh] w-full">
                                <div className="h-full flex flex-col">
                                    <div className="px-6 py-4 bg-black text-white rounded-lg">Step 5</div>
                                    <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                                </div>
                                <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                    <div className="flex flex-col gap-6 justify-center">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Name</p>
                                            <p>{dataStep5["productName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Code</p>
                                            <p>{dataStep5["batchId"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">User Name</p>
                                            <p>{dataStep5["userName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Location</p>
                                            <p>{dataStep5["location"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Date</p>
                                            <p>{dataStep5["date"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Category</p>
                                            <p>{dataStep5["categories"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Photo</p>
                                            <a href={dataStep5["photo"]} target="_blank">{dataStep5["photo"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                            {dataStep6.productName !== '' &&
                            <div className="flex gap-4 h-[30vh] w-full">
                                <div className="h-full flex flex-col">
                                    <div className="px-6 py-4 bg-black text-white rounded-lg">Step 6</div>
                                    <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                                </div>
                                <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                    <div className="flex flex-col gap-6 justify-center">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Name</p>
                                            <p>{dataStep6["productName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Code</p>
                                            <p>{dataStep6["batchId"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">User Name</p>
                                            <p>{dataStep6["userName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Location</p>
                                            <p>{dataStep6["location"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Date</p>
                                            <p>{dataStep6["date"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Category</p>
                                            <p>{dataStep6["categories"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Photo</p>
                                            <a href={dataStep6["photo"]} target="_blank">{dataStep6["photo"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {dataStep7.productName !== '' &&
                            <div className="flex gap-4 h-[30vh] w-full">
                                <div className="h-full flex flex-col">
                                    <div className="px-6 py-4 bg-black text-white rounded-lg">Step 7</div>
                                    <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                                </div>
                                <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                    <div className="flex flex-col gap-6 justify-center">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Name</p>
                                            <p>{dataStep7["productName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Code</p>
                                            <p>{dataStep7["batchId"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">User Name</p>
                                            <p>{dataStep7["userName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Location</p>
                                            <p>{dataStep7["location"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Date</p>
                                            <p>{dataStep7["date"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Category</p>
                                            <p>{dataStep7["categories"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Photo</p>
                                            <a href={dataStep7["photo"]} target="_blank">{dataStep7["photo"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {dataStep8.productName !== '' &&
                            <div className="flex gap-4 h-[30vh] w-full">
                                <div className="h-full flex flex-col">
                                    <div className="px-6 py-4 bg-black text-white rounded-lg">Step 8</div>
                                    <div className="flex-1 h-full text-center mt-4 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                                </div>
                                <div className="w-ful h-full bg-white flex-1 p-6 rounded-xl">
                                    <div className="flex flex-col gap-6 justify-center">
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Name</p>
                                            <p>{dataStep8["productName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Product Code</p>
                                            <p>{dataStep8["batchId"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">User Name</p>
                                            <p>{dataStep8["userName"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Location</p>
                                            <p>{dataStep8["location"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Date</p>
                                            <p>{dataStep8["date"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Category</p>
                                            <p>{dataStep8["categories"]}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="font-bold text-gray-500">Photo</p>
                                            <a href={dataStep8["photo"]} target="_blank">{dataStep8["photo"]}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        </div>}
                    </div>  
            </div>
        </div>

     );
}
 
export default BatchDetailCustomer;
