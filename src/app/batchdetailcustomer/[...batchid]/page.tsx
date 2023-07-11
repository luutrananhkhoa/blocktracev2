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
interface DataOwner {
    manufacturer: string,
    distributor:string,
    market:string,
    staff:string,
    customer:string
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
    const [dataOwner, setDataOwner] = useState<DataOwner>({
        manufacturer: "",
        distributor:"",
        market:"",
        staff:"",
        customer:""
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
        let dataTempOwner = {
            productOwnerId: 0,
            batchId: 0,
            productCode: 0,
            manufacturerId: 0,
            distributorIds: [],
            martketIds: [],
            staffIds: [],
            customerIds: [],
            dateTime: ''
          }
          getUserContract().then(async(contract)=>{
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            await  contract.methods.getAllOwner().call({
                from: accounts[0]
            })
            .then((res : any)=>{
                console.log(res)
                res.forEach((item:any)=>{
                    if(item["batchId"] === batchId){
                        let dataFinal = {
                            productOwnerId: item["productOwnerId"],
                            batchId: item["batchId"],
                            productCode: item["productCode"],
                            manufacturerId: item["manufacturerId"],
                            distributorIds: item["distributorIds"],
                            martketIds: item["martketIds"],
                            staffIds: item["staffIds"],
                            customerIds: item["customerIds"],
                            dateTime: item["dateTime"]
                        }
                        dataTempOwner = dataFinal
                    }
                })

            }).catch((err : any)=>{console.log(err)})
        })

        let dataOwner = {
            manufacturer: "",
            distributor:"",
            market:"",
            staff:"",
            customer:""
        }
        getUserContract().then(async(contract) =>{
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
              });
            await contract.methods.getAllUser().call({
              from: accounts[0]
            })
            .then(async(response : any)=>{
                console.log('response User', response)
                response.forEach((item : any) =>{
                    if(dataTempOwner.manufacturerId !== 0){
                        if(Number(item["userId"]) === Number(dataTempOwner.manufacturerId)){
                            dataOwner.manufacturer = item["userName"]
                        }
                    }
                    if(dataTempOwner.distributorIds.length >0){
                        if(Number(item["userId"]) === Number(dataTempOwner.distributorIds[0])){
                            dataOwner.distributor = item["userName"]
                        }
                    }
                    if(dataTempOwner.martketIds.length > 0){
                        if(Number(item["userId"]) === Number(dataTempOwner.martketIds[0])){
                            dataOwner.market = item["userName"]
                        }
                    }
                    if(dataTempOwner.staffIds.length > 0){
                        if(Number(item["userId"]) === Number(dataTempOwner.staffIds[0])){
                            dataOwner.staff = item["userName"]
                        }
                    }
                    if(dataTempOwner.customerIds.length > 0){
                        if(Number(item["userId"]) === Number(dataTempOwner.customerIds[0])){
                            dataOwner.customer = item["userName"]
                        }
                    }
                })
                setDataOwner(dataOwner)
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

                <div className="w-full flex items-center justify-center">
                        {stepComplete === 0?
                            <div className="w-[60%] p-10 mt-6 flex flex-col items-center gap-4">
                                <Image src="/noproduct.png" className="w-[60%]" width="800" height="800" alt="Logo" />
                                <h1 className="font-bold text-[#726BDF] text-5xl">No results found</h1>
                                <p className="text-2xl">We couldn't find results</p>
                            </div>
                            :
                        <div className="w-[80%] flex gap-4">
                            <div className="p-10 mt-12 flex flex-col gap-8 flex-1">
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
                                </div>
                            }

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
                            </div>
                            
                                <div className="flex-1 mt-12">
                                    {dataOwner.manufacturer !== ""
                                    &&
                                    <div className="flex flex-col mt-10 p-8 w-full rounded-xl bg-white border border-gray-200 drop-shadow-md">
                                        <div className="flex gap-6 items-center">
                                            <div className="p-4 bg-[#f5f3ff] rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="text-[#726BDF]"  viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0m7 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0m7 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M3 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0m7 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M5 8v8m7-8v8"/><path d="M19 8v2a2 2 0 0 1-2 2H5"/></g></svg>
                                            </div>
                                            
                                            <div className="font-semibold text-xl">
                                                Manufacturer
                                            </div>
                                        </div>

                                        <div className="flex w-[40%] p-2 justify-center">
                                            <div className="font-semibold text-xl text-[#726BDF]">
                                                {dataOwner.manufacturer}
                                            </div>
                                        </div>
                                    </div>
                                    }

                                    {dataOwner.distributor !== ""
                                    &&
                                    <div className="flex flex-col mt-10 p-8 w-full rounded-xl bg-white border border-gray-200 drop-shadow-md">
                                        <div className="flex gap-6 items-center">
                                            <div className="p-4 bg-[#f5f3ff] rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="text-[#726BDF]" viewBox="0 0 24 24"><path d="M19.5 3A2.502 2.502 0 0 0 17 5.5c0 .357.078.696.214 1.005l-1.955 2.199A3.977 3.977 0 0 0 13 8c-.74 0-1.424.216-2.019.566L8.707 6.293l-.023.023C8.88 5.918 9 5.475 9 5a3 3 0 1 0-3 3c.475 0 .917-.12 1.316-.316l-.023.023L9.567 9.98A3.956 3.956 0 0 0 9 12c0 .997.38 1.899.985 2.601l-2.577 2.576A2.472 2.472 0 0 0 6.5 17C5.122 17 4 18.121 4 19.5S5.122 22 6.5 22S9 20.879 9 19.5c0-.321-.066-.626-.177-.909l2.838-2.838c.421.15.867.247 1.339.247c2.206 0 4-1.794 4-4c0-.636-.163-1.229-.428-1.764l2.117-2.383c.256.088.526.147.811.147C20.879 8 22 6.879 22 5.5S20.879 3 19.5 3zM13 14c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2z" fill="currentColor"/></svg>
                                            </div>
                                            
                                            <div className="font-semibold text-xl">
                                                Distributor
                                            </div>
                                        </div>

                                        <div className="flex w-[40%] p-2 justify-center">
                                            <div className="font-semibold text-xl text-[#726BDF]">
                                                {dataOwner.distributor}
                                            </div>
                                        </div>
                                    </div>
                                    }

                                    {dataOwner.market !== ""
                                    &&
                                    <div className="flex flex-col mt-10 p-8 w-full rounded-xl bg-white border border-gray-200 drop-shadow-md">
                                        <div className="flex gap-6 items-center">
                                            <div className="p-4 bg-[#f5f3ff] rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>
                                            </div>
                                            
                                            <div className="font-semibold text-xl">
                                            Market
                                            </div>
                                        </div>

                                        <div className="flex w-[40%] p-2 justify-center">
                                            <div className="font-semibold text-xl text-[#726BDF]">
                                                {dataOwner.market}
                                            </div>
                                        </div>
                                    </div>
                                    }

                                    {dataOwner.staff !== ""
                                    &&
                                    <div className="flex flex-col mt-10 p-8 w-full rounded-xl bg-white border border-gray-200 drop-shadow-md">
                                        <div className="flex gap-6 items-center">
                                            <div className="p-4 bg-[#f5f3ff] rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h.5m7.3 5.817l-2.172 1.138a.392.392 0 0 1-.568-.41l.415-2.411l-1.757-1.707a.389.389 0 0 1 .217-.665l2.428-.352l1.086-2.193a.392.392 0 0 1 .702 0l1.086 2.193l2.428.352a.39.39 0 0 1 .217.665l-1.757 1.707l.414 2.41a.39.39 0 0 1-.567.411L17.8 20.817z"/></svg>
                                            </div>
                                            
                                            <div className="font-semibold text-xl">
                                            Staff
                                            </div>
                                        </div>

                                        <div className="flex w-[40%] p-2 justify-center">
                                            <div className="font-semibold text-xl text-[#726BDF]">
                                                {dataOwner.staff}
                                            </div>
                                        </div>
                                    </div>
                                    }

                                    {dataOwner.customer !== ""
                                        &&
                                        <div className="flex flex-col mt-10 p-8 w-full rounded-xl bg-white border border-gray-200 drop-shadow-md">
                                            <div className="flex gap-6 items-center">
                                                <div className="p-4 bg-[#f5f3ff] rounded-full">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4.8 11.7L2.3 9.2Q2 8.9 2 8.5t.3-.7l2.5-2.5q.3-.3.7-.3t.7.3l2.5 2.5q.3.3.3.7t-.3.7l-2.5 2.5q-.3.3-.7.3t-.7-.3ZM10 22q-.425 0-.713-.288T9 21v-4q-1.25-.1-2.475-.275t-2.45-.45q-.425-.1-.688-.475T3.25 15q.125-.425.513-.625t.812-.1q1.825.425 3.688.575T12 15q1.875 0 3.738-.15t3.687-.575q.425-.1.813.1t.512.625q.125.425-.138.8t-.687.475q-1.225.275-2.45.45T15 17v4q0 .425-.287.713T14 22h-4ZM5.5 9.6l1.1-1.1l-1.1-1.1l-1.1 1.1l1.1 1.1ZM12 7q-1.25 0-2.125-.875T9 4q0-1.25.875-2.125T12 1q1.25 0 2.125.875T15 4q0 1.25-.875 2.125T12 7Zm0 7q-.825 0-1.413-.587T10 12q0-.825.588-1.413T12 10q.825 0 1.413.588T14 12q0 .825-.588 1.413T12 14Zm0-9q.425 0 .713-.287T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Zm4.775 6.5l-1.15-2Q15.5 9.275 15.5 9t.125-.5l1.15-2q.125-.25.35-.375t.5-.125h2.25q.275 0 .5.125t.35.375l1.15 2Q22 8.725 22 9t-.125.5l-1.15 2q-.125.25-.35.375t-.5.125h-2.25q-.275 0-.5-.125t-.35-.375ZM18.2 10h1.1l.55-1l-.55-1h-1.1l-.55 1l.55 1ZM5.5 8.5ZM12 4Zm6.75 5Z"/></svg>
                                                </div>
                                                
                                                <div className="font-semibold text-xl">
                                                Customer
                                                </div>
                                            </div>

                                            <div className="flex w-[40%] p-2 justify-center">
                                                <div className="font-semibold text-xl text-[#726BDF]">
                                                    {dataOwner.customer}
                                                </div>
                                            </div>
                                        </div>
                                    }

                                </div>
                        </div> 
                        }
                </div>  
            </div>
        </div>

     );
}
 
export default BatchDetailCustomer;
