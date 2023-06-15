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

interface BatchDetailsProps {
    
}

interface QRCodeProps {
    qrValue: string
    setIsShowQrCode: any
}

interface DataStep {
    productName: string,
    batchId: string,
    userName: string,
    location: string,
    date: string,
    categories: string
}

const BatchDetails: FC<BatchDetailsProps> = () => {
    const router = useRouter();
    const params = useParams();
    const [BatchIdValue, setBatchIdValue] = useState(0)
    const [isShowQrCode, setIsShowQrCode] = useState(false)
    const [numberOfStep, setNumberOfStep] = useState('')
    const [stepComplete, setStepComplete] = useState(0)
    const [dataStep1, setDataStep1] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: ""
    })
    const [dataStep2, setDataStep2] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: ""
    })
    const [dataStep3, setDataStep3] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: ""
    })
    const [dataStep4, setDataStep4] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: ""
    })
    const [dataStep5, setDataStep5] = useState<DataStep>({
        productName: "",
        batchId: "",
        userName: "",
        location: "",
        date: "",
        categories: ""
    })


    useEffect(()=>{
        let batchId = params.batchid;
        setBatchIdValue(Number(batchId))

        const accounts = window.ethereum.request({
            method: "eth_requestAccounts",
        });

        getBatchContract().then(async (contract) =>  {
            contract.methods.getAllBatch().call({
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


        getProcessingContract().then((contract) =>{
            contract.methods.getAllStep1().call({
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
                        categories: filteredArrFinal["categories"]
                    }
                    setDataStep1(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then((contract) =>{
            contract.methods.getAllStep2().call({
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
                        categories: filteredArrFinal["categories"]
                    }
                    setDataStep2(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then((contract) =>{
            contract.methods.getAllStep3().call({
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
                        categories: filteredArrFinal["categories"]
                    }
                    setDataStep3(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then((contract) =>{
            contract.methods.getAllStep4().call({
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
                        categories: filteredArrFinal["categories"]
                    }
                    setDataStep4(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })

          getProcessingContract().then((contract) =>{
            contract.methods.getAllStep5().call({
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
                        categories: filteredArrFinal["categories"]
                    }
                    setDataStep5(item)
                    setStepComplete((prev)=>prev+1)
                }
            })
            .catch((err : any)=>{console.log(err);})
          })
    },[])

    return ( 
        <Layout>
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div onClick={()=> router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-9 h-9 text-[#FFD237] cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold">Back to Product</h1>
                </div>
                <div className="flex flex-col mt-10 justify-center items-center">
                    <h1 className="text-6xl font-bold">Tracking</h1>
                    <p className="font-semibold text-gray-600">{numberOfStep} Steps - {stepComplete} Complete</p>
                </div>
                {isShowQrCode? 
                    <QRCodeComp qrValue={BatchIdValue.toString()} setIsShowQrCode={setIsShowQrCode} /> 
                    :
                    <div className="w-full flex items-center justify-center">
                    {stepComplete === 0?
                        <div className="w-[60%] p-10 mt-12 flex flex-col items-center gap-4">
                            <Image src="/noproduct.png" className="w-[60%]" width="800" height="800" alt="Logo" />
                            <h1 className="font-bold text-[#726BDF] text-5xl">No results found</h1>
                            <p className="text-2xl">We couldn't find results</p>
                        </div>
                        :
                        <div className="w-[60%] p-10 mt-12 flex flex-col gap-8">
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
                                </div>
                            </div>
                        </div>
                    }

                    {Number(numberOfStep) === stepComplete && 
                        <div className="bg-[#726BDF] p-6 mt-[3rem] text-center font-semibold text-white rounded-lg cursor-pointer"
                            onClick={()=>setIsShowQrCode(true)}>
                            Publish
                        </div>}
                        
                    </div>}
                    </div>
                }
            </div>
        </Layout>

     );
}
 
export default BatchDetails;

const QRCodeComp: FC<QRCodeProps>  = ({qrValue, setIsShowQrCode}) =>{

    const downloadQRCode = () => {
        // Generate download with use canvas and stream
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas && canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = 'QRCode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return(
        <div className="flex flex-col mt-10 justify-center items-center">
            <QRCode
                id="qr-gen"
                className="none"
                value={qrValue}
                size={390}
                level={"H"}
                includeMargin={true}
            />
            <div className="flex gap-4">
                <div className="bg-[#22252D] py-6 px-10 mt-[3rem] text-center font-semibold text-white rounded-lg cursor-pointer"
                    onClick={()=>setIsShowQrCode(false)}>
                    Cancel
                </div>
                <div className="bg-[#726BDF] py-6 px-10 mt-[3rem] text-center font-semibold text-white rounded-lg cursor-pointer"
                    onClick={()=>downloadQRCode()}>
                    Download
                </div>
            </div>
        </div>   
    ) 
}