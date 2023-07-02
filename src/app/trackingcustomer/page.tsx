'use client';
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import Layout from "@/app/components/Layout";
import Button from "@/app/components/Button";
import { getBatchContract } from "@/app/contracts/batchContract";
import QRCode from "qrcode.react";
import SidebarCustomer from "@/app/components/SidebarCustomer";
import { getProcessingContract } from "../contracts/processingContract";
import { getUserContract } from "../contracts/userContract";

interface TrackingCustomerProps {
    
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

const TrackingCustomer: FC<TrackingCustomerProps> = () => {
    const router = useRouter();
    const params = useParams();
    const [BatchIdValue, setBatchIdValue] = useState(0)
    const [isShowTracking, setIsShowTracking] = useState(false)
    const [numberOfStep, setNumberOfStep] = useState('')
    const [inputValue, setInputValue] = useState('')
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

    const handleTracking = async () => {
        let flag = false
        if(inputValue.trim() !== ''){
            let batchId :string = ''
            const accounts = window.ethereum.request({
                method: "eth_requestAccounts",
            });

            await getBatchContract().then(async (contract) =>  {
                await contract.methods.getAllBatch().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    const filteredArr = response.filter((obj : any) => obj["verifyCode"] === inputValue);
                    if(filteredArr.length >0){
                        const filteredArrFinal = filteredArr[0]
                        if(filteredArrFinal.length > 0){
                            batchId = filteredArrFinal["batchId"]
                            flag=true
                        }
                    }else{
                        flag=false
                    }
                })
                .catch((err : any)=>{console.log(err);})
            })  
            if(!flag){
                toast.error("Product is not exist!")
            }else{
                await getProcessingContract().then(async(contract) =>{
                    await contract.methods.getAllStep1().call({
                    from: accounts[0]
                    })
                    .then((response : any)=>{
                        console.log('List step 1:', response)
                        const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
    
                await getProcessingContract().then(async(contract) =>{
                await contract.methods.getAllStep2().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    console.log('List step 2:', response)
                    const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
    
                await getProcessingContract().then(async(contract) =>{
                await contract.methods.getAllStep3().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    console.log('List step 3:', response)
                    const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
    
                await getProcessingContract().then(async(contract) =>{
                await contract.methods.getAllStep4().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    console.log('List step 4:', response)
                    const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
    
                await getProcessingContract().then( async (contract) =>{
                await contract.methods.getAllStep5().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    console.log('List step 5:', response)
                    const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
    
                await getProcessingContract().then( async (contract) =>{
                await contract.methods.getAllStep6().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    console.log('List step 6:', response)
                    const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
    
                await getProcessingContract().then( async (contract) =>{
                await contract.methods.getAllStep7().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    console.log('List step 7:', response)
                    const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
    
                await getProcessingContract().then( async (contract) =>{
                await contract.methods.getAllStep8().call({
                    from: accounts[0]
                })
                .then((response : any)=>{
                    console.log('List step 8:', response)
                    const filteredArr = response.filter((obj : any) => obj["batchId"] === batchId);
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
                                listOwner.push(item["ownerName"])
                            }
                        })
                        setlistOwners(listOwner)
                    })
                    .catch((err : any)=>{console.log(err);})
                })  

                setIsShowTracking(true)
            }
        }else{
            toast.error("Please enter code!")
        }
        
    }

    return ( 
        <div className="min-h-screen flex">
            <SidebarCustomer />
            <Toaster />
            <div className="p-6 w-full min-h-screen bg-[#f8f8fa]">
                <div className="flex flex-col mt-10 justify-center items-center">
                </div>
                {
                    isShowTracking?
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="flex justify-between w-[60%] items-center">
                            <h1 className="text-5xl font-bold">Tracking</h1>
                            <div className="btn" onClick={()=>{
                                setIsShowTracking(false)
                                setInputValue('')
                            }}>Cancel</div>
                        </div>
                        {
                            listOwners.length > 0 &&
                            <div className="w-full flex justify-center mt-12">
                                <div className="w-[25%] text-xl flex flex-col justify-center items-center bg-white shadow-xl rounded-xl">
                                    <div className="w-full bg-[#373B45] flex text-white justify-center p-6 font-bold">Owner</div>
                                    {listOwners.map((owner) => (
                                                <div className="w-full text-center text-xl bg-white p-6" key={owner}>
                                                    {owner}
                                                </div>
                                            ))}
                                </div>
                            </div>
                        }
                        <div className="w-[60%] p-10 mt-10 flex flex-col gap-8">
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
                        </div>
                    </div>
                    :
                    <div className="mt-10 w-full flex items-center justify-center">
                        <div className="bg-white w-[80%] min-h-[80vh] rounded-2xl flex flex-col justify-center items-center p-10 shadow-lg">
                            <div className=" flex flex-col gap-10 mb-10">
                                <Image src="/newlogonavy.svg" className="w-[80%] mr-4" width="200" height="200" alt="Logo" />
                                <div>
                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" id="searchProduct" onChange={(e)=>setInputValue(e.target.value)} className="block w-full p-6 pl-10 text-lg focus:outline-none border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter QR code value" required />
                                        <div className="text-white absolute right-2.5 bottom-2.5 bg-[#726BDF] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 cursor-pointer"
                                            onClick={()=>handleTracking()}
                                            >Search</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }         
            </div>
        </div>

     );
}
 
export default TrackingCustomer;
