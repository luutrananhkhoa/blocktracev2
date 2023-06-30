'use client';
import { FC, useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {getProcessingContract as getProcessingContract} from "../../contracts/processingContract";
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../components/Button';
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import { Router } from "next/router";
import { getBatchContract } from "@/app/contracts/batchContract";
import { getSubSystemContract } from "@/app/contracts/subsystemContract";
import { NFTStorage, File } from "nft.storage";
import axios from 'axios';

interface ProductDetailProps {
    
}

interface StepProcessProps {
    stepId: number,
    handleHide: () => void,
    setStepNumberId: (id: number) => void
}

interface StepFormProps {
    handleHideForm: () => void,
    stepNumberId: number,
    batchNameValue: string,
    categoryValue: string,
    isUpgrade: boolean
}

const ProductDetail: FC<ProductDetailProps> = () => {
    const router = useRouter();
    const params = useParams();
    const [stepNumberValue, setStepNumberValue] = useState(0)
    const [isShowForm, setIsShowForm] = useState(false)
    const [fileType, setFileType] = useState('')
    const [fileName, setFileName] = useState('')
    const [stepNumberId, setStepNumberId] = useState(1)
    const [batchNameValue, setBatchNameValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [isArrayShow, setIsArrayShow] = useState([])
    const [isUpgrade, setIsUpgrade] = useState(false)
    const [timeValidPremium, setTimeValidPremium] = useState(0)
    const [isShowUpgrade, setIsShowUpgrade] = useState(false)

    const [isRole, setIsRole] = useState('')

    const [selectedFile, setSelectedFile] = useState(null);
    const [responseImage, setResponseImage] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const handleFileSelect = (event:any) => {
        setSelectedFile(event.target.files[0]);
        const fileType = event.target.files[0] && event.target.files[0].type;
        const fileName = event.target.files[0] && event.target.files[0].name;
        console.log('File type:', fileType);
        if(fileType && fileType.includes('image')){
            setFileType('image')
            setFileName(fileName)
        }else if(fileType && fileType.includes('video')){
            setFileType('video')
            setFileName(fileName)
        }
    };

    const handleUpload = async(type:string) => {
        // console.log('selectedFile',selectedFile)
        if (selectedFile) {
            console.log('selectedFile',selectedFile)

            const formData = new FormData();
            formData.append('file', selectedFile);
            await fetch(`https://machine.issc.ftisu.vn/${type ==="img"?"upload":"uploadvideo"}`, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('The value is:', data);
                if(type ==="img"){
                    setResponseImage(data.value)
                }else{
                    console.log('Go 1:', data.value);
                    setVideoUrl(data.value)
        
                }
                // Further processing or handling of the response value
              })
            .catch((error) => {
                toast.error("An error has occurred")
                console.error('Error:', error);
            });
        }
    }
    
    useEffect(()=>{
        let batchId = params.params.split('/')[0];
        let stepNumber = params.params.split('/')[1];
        setStepNumberValue(Number(stepNumber))
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // if(parsedData.usertype === "Team"){
            //     setIsRole(parsedData.userole);
            // }
            setIsRole(parsedData.userole);
        }
        getBatchContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await contract.methods.getAllBatch().call({
              from: accounts[0]
            })
            .then(async(response : any)=>{
                await response.map((product : any)=>{
                    if(product["batchId"] === batchId){
                        // console.log('Product OK:', product)
                        setBatchNameValue(product["batchName"])
                        setCategoryValue(product["categories"])
                    }
                })
            }).catch((err : any)=>{console.log(err);})

            const stepNumbers = Number(stepNumber); // Number of steps
            const arrayShow : any = []
            for (let stepNumberId = 0; stepNumberId < stepNumbers; stepNumberId++) {
                await getProcessingContract().then(async (contract) => {
                    const addStepFunction = stepNumberId === 0 ? contract.methods.getAllStep1 :
                                            stepNumberId === 1 ? contract.methods.getAllStep2 :
                                            stepNumberId === 2 ? contract.methods.getAllStep3 :
                                            stepNumberId === 3 ? contract.methods.getAllStep4 :
                                            stepNumberId === 4 ? contract.methods.getAllStep5 :
                                            stepNumberId === 5 ? contract.methods.getAllStep6 :
                                            stepNumberId === 6 ? contract.methods.getAllStep7 :
                                            stepNumberId === 7 ? contract.methods.getAllStep8 :
                                            null;
    
                    if (addStepFunction) {
                        await getProcessingContract().then(async (contract) =>{
                            const accounts = await window.ethereum.request({
                                method: "eth_requestAccounts",
                            });
                            await addStepFunction().call({
                            from: accounts[0]
                            })
                            .then(async(response : any)=>{
                                const filteredArr = await response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                                const filteredArrFinal = filteredArr[0]
                                if(filteredArrFinal && filteredArrFinal.length > 0){
                                    arrayShow.push(true)
                                }else{
                                    arrayShow.push(false)
                                }
                            })
                            .catch((err : any)=>{console.log(err);})
                        })
                    }
                });
            }
            console.log('arrayShow', arrayShow)
            setIsArrayShow(arrayShow)
        })
        
        getSubSystemContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await contract.methods.getAllSubsystem().call({
              from: accounts[0]
            })
            .then(async(response : any)=>{
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

    const handleHideForm = () =>{
        setIsShowForm(!isShowForm)
    }
    return ( 
        <Layout>
            <Toaster />
             <div className="p-6">
                <div className="flex items-center gap-3">
                    <div onClick={()=> router.back()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-9 h-9 text-[#FFD237] cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold">Back to Product</h1>
                </div>
                <div className="mt-10 w-full flex items-center justify-center">
                    <div className="bg-white w-[80%] min-h-[80vh] rounded-2xl flex flex-col items-center p-10">
                            {
                                !isShowForm &&
                                <>
                                    <h1 className="font-bold text-6xl">{batchNameValue}</h1>
                                    <p className="text-2xl mt-6">{categoryValue}</p>
                                </>
                            }
                        {/* {isShowUpgrade?
                            <>
                                <h1 className="font-bold text-6xl mt-4">Upload your file</h1>
                                <p className="text-2xl mt-6 mb-10">PNG, JPG and MP4 files are allowed</p>
                            </>
                        :    
                            <>
                                <h1 className="font-bold text-6xl">{batchNameValue}</h1>
                                <p className="text-2xl mt-6">{categoryValue}</p>
                                <div className="w-full flex jutify-start px-6">
                                    {isUpgrade && !isShowUpgrade && !isShowForm && categoryValue=== 'Fruit'&&
                                        <div className="px-8 py-6 text-white font-bold rounded-xl bg-[#7E59E7] cursor-pointer flex gap-1 items-center animate-bounce"
                                        onClick={()=>setIsShowUpgrade(true)}>
                                           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M208 144a15.78 15.78 0 0 1-10.42 14.94l-51.65 19l-19 51.61a15.92 15.92 0 0 1-29.88 0L78 178l-51.62-19a15.92 15.92 0 0 1 0-29.88l51.65-19l19-51.61a15.92 15.92 0 0 1 29.88 0l19 51.65l51.61 19A15.78 15.78 0 0 1 208 144Zm-56-96h16v16a8 8 0 0 0 16 0V48h16a8 8 0 0 0 0-16h-16V16a8 8 0 0 0-16 0v16h-16a8 8 0 0 0 0 16Zm88 32h-8v-8a8 8 0 0 0-16 0v8h-8a8 8 0 0 0 0 16h8v8a8 8 0 0 0 16 0v-8h8a8 8 0 0 0 0-16Z"/></svg>
                                            AI Classification
                                        </div> 
                                    } 
                                </div>
                            </>
                        } */}
                
                        {isShowForm ? 
                            <div className="w-full justify-center">
                                <div className="flex p-6 justify-center">
                                    <StepForm stepNumberId={stepNumberId} handleHideForm={handleHideForm} categoryValue={categoryValue} batchNameValue={batchNameValue} isUpgrade={isUpgrade}/>
                                </div> 
                            </div>

                        :
                        <div className="w-full">
                            <div className="flex p-6 gap-10 justify-start flex-wrap">
                                {   (isArrayShow.length > Number(isRole)) 
                                    &&
                                    (
                                    isRole !== '0'?
                                        (isRole === '1'?
                                            (    
                                                isArrayShow[Number(isRole)-1]?
                                                <div  className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                    <div className="w-full h-full px-6 py-10 bg-[#5FCCA0] flex items-center justify-between flex-col rounded-xl">
                                                        <h2 className="text-4xl font-bold text-white">Step</h2>
                                                        <p className="text-8xl font-bold text-white">{Number(isRole)}</p>
                                                        <div className="w-full">
                                                            <div className="px-6 py-4 bg-[white] rounded-xl flex justify-center text-xl font-bold text-black cursor-pointer" 
                                                            >Done</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div  className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                    <StepProcess stepId={Number(isRole)-1} handleHide={handleHideForm} setStepNumberId={setStepNumberId}/>
                                                </div>
                                            )
                                            :
                                            (    
                                                isArrayShow[Number(isRole)-1]?
                                                <div  className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                    <div className="w-full h-full px-6 py-10 bg-[#5FCCA0] flex items-center justify-between flex-col rounded-xl">
                                                        <h2 className="text-4xl font-bold text-white">Step</h2>
                                                        <p className="text-8xl font-bold text-white">{Number(isRole)}</p>
                                                        <div className="w-full">
                                                            <div className="px-6 py-4 bg-[white] rounded-xl flex justify-center text-xl font-bold text-black cursor-pointer" 
                                                            >Done</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                (
                                                    (Number(isRole) >0) &&isArrayShow[Number(isRole)-2]?
                                                        <div  className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                            <StepProcess stepId={Number(isRole)-1} handleHide={handleHideForm} setStepNumberId={setStepNumberId}/>
                                                        </div>
                                                    :
                                                        <div  className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                            <div className="w-full h-full px-6 py-10 bg-[#FE6A78] flex items-center justify-between flex-col rounded-xl">
                                                                <h2 className="text-4xl font-bold text-white">Step</h2>
                                                                <p className="text-8xl font-bold text-white">{Number(isRole)}</p>
                                                                <div className="w-full">
                                                                    <div className="px-6 py-4 bg-[white] rounded-xl flex justify-center text-xl font-bold text-black cursor-pointer" 
                                                                    >Disable</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                )
                                            )
                                        )

                                    :
                                    
                                    Array.from({ length: stepNumberValue }, (_, i) => (        
                                        isArrayShow[i]?
                                            <div key={i} className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                <div className="w-full h-full px-6 py-10 bg-[#5FCCA0] flex items-center justify-between flex-col rounded-xl">
                                                    <h2 className="text-4xl font-bold text-white">Step</h2>
                                                    <p className="text-8xl font-bold text-white">{i+1}</p>
                                                    <div className="w-full">
                                                        <div className="px-6 py-4 bg-[white] rounded-xl flex justify-center text-xl font-bold text-black cursor-pointer" 
                                                        >Done</div>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            (
                                                i===0? 
                                                (
                                                    isArrayShow[i]?
                                                    <div key={i} className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                        <div className="w-full h-full px-6 py-10 bg-[#5FCCA0] flex items-center justify-between flex-col rounded-xl">
                                                            <h2 className="text-4xl font-bold text-white">Step</h2>
                                                            <p className="text-8xl font-bold text-white">{i+1}</p>
                                                            <div className="w-full">
                                                                <div className="px-6 py-4 bg-[white] rounded-xl flex justify-center text-xl font-bold text-black cursor-pointer" 
                                                                >Done</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div key={i} className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                        <StepProcess stepId={i} handleHide={handleHideForm} setStepNumberId={setStepNumberId}/>
                                                    </div>
                                                )
                                                :
                                                (
                                                    (i >0) &&isArrayShow[i-1]?
                                                    <div key={i} className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                        <StepProcess stepId={i} handleHide={handleHideForm} setStepNumberId={setStepNumberId}/>
                                                    </div>
                                                :
                                                    <div key={i}  className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                        <div className="w-full h-full px-6 py-10 bg-[#FE6A78] flex items-center justify-between flex-col rounded-xl">
                                                            <h2 className="text-4xl font-bold text-white">Step</h2>
                                                            <p className="text-8xl font-bold text-white">{i+1}</p>
                                                            <div className="w-full">
                                                                <div className="px-6 py-4 bg-[white] rounded-xl flex justify-center text-xl font-bold text-black cursor-pointer" 
                                                                >Disable</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                
                                            )
                                        )
                                    )

                                    ) 
                                }
                            </div>
                        </div>
                        }

                    </div>
                </div>
                    
            </div>
        </Layout>
     );
}
 
export default ProductDetail;

const StepProcess: FC<StepProcessProps> = ({stepId, handleHide, setStepNumberId}) => {
    const handleClick = () => {
        handleHide();
        setStepNumberId(stepId);
    }
    return ( 
        <div className="w-full h-full px-6 py-10 bg-[#FFD66A] flex items-center justify-between flex-col rounded-xl hover:scale-110">
            <h2 className="text-4xl font-bold text-white">Step</h2>
            <p className="text-8xl font-bold text-white">{stepId+1}</p>
            <div className="w-full">
                <div className="px-6 py-4 bg-[white] rounded-xl flex justify-center text-xl font-bold text-black cursor-pointer" 
                    onClick={handleClick}>Add</div>
            </div>
        </div>
     );
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


const StepForm: FC<StepFormProps> = ({handleHideForm, stepNumberId, categoryValue, batchNameValue, isUpgrade}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
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

    const [productCategory, setProductCategory] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [responseImage, setResponseImage] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const params = useParams();
    const [linkImg, setLinkImg] = useState('')
    const [file, setFile] = useState<File>();
    const [productCodeValue, setProductCodeValue] = useState(0)
    const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ0M2MyNTQ0ZEQzRTBEOThmODA5RGIyOTFGYjJjOUVBQ0FCMDk0ZDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MTA5NzkzMjY2OCwibmFtZSI6Imx0YWsifQ.fsQKauAy7q2xFUK9iNipp2bivyvu2vIcg_iQOsuzJVU"

    async function storeNFT(image: any, name: any, description: any) {
        // create a new NFTStorage client using our API key
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
      
        // call client.store, passing in the image & metadata
        return nftstorage.store({
          image,
          name,
          description,
        });
    }

    async function convertImageToBlob(imageUrl :string, filename: string) {
        // Fetch the image data
        const response = await fetch(imageUrl);
        const blob = await response.blob();
      
        // Create a File object
        const file = new File([blob], filename, { type: blob.type });
      
        return file;
      }

      
    const handleUploadNFT = async () =>{
        if(responseImage !== ''){
            const randomCode = generateRandomNumber();
            const url = responseImage

            const fileName = randomCode.toString() + url.split("/static/")[1]

           return await convertImageToBlob(url, fileName)
            .then(async(file) => {
                // Access the file object here
                console.log('log file:', file);
                if(file){
                    const fileName = file.name;
                    const newFile = new File([file], fileName, {
                    type: file.type,
                    lastModified: file.lastModified,
                    });
        
                    const ipfsImage = await storeNFT(
                    newFile,
                    fileName,
                    "description"
                    ).then(async(success) => {
                    return await axios
                        .get(
                            `https://cloudflare-ipfs.com/ipfs/${success.ipnft}/metadata.json`
                        )
                        .then((imageURL) => {
                            const a = imageURL.data?.image;
                            const x = a.replace(
                                "ipfs://",
                                "https://cloudflare-ipfs.com/ipfs/"
                            );
                            console.log('link:', x);
                            setLinkImg(x);
                            return x
                        })
                        .catch((error) => console.log(error));
                    })
                    .catch((error) => console.log(error));
                    console.log('ipfsImage:', ipfsImage);
                    return ipfsImage
                }
            })
            .catch((error) => {
                console.error('Error converting image:', error);
            });
        }
    }

    const handleUpload = async(type:string) => {
        // console.log('selectedFile',selectedFile)
        if (file) {
            console.log('file',file)
            let fileType = file.type
            // if(!fileType.includes("image")){
            //     toast.error('Please choose file image!');
            // }else{
            //     const formData = new FormData();
            //     formData.append('file', file);
            //     await fetch(`https://machine.issc.ftisu.vn/${fileType.includes("image")?"upload":"uploadvideo"}`, {
            //         method: 'POST',
            //         body: formData,
            //         mode: 'cors',
            //         headers: {
            //             Accept: 'application/json',
            //         },
            //     })
            //     .then((response) => response.json())
            //     .then((data) => {
            //         if(type ==="img"){
            //             setResponseImage(data.value)
            //         }else{
            //             setVideoUrl(data.value)
            //         }
            //       })
            //     .catch((error) => {
            //         toast.error("An error has occurred")
            //         console.error('Error:', error);
            //     });
            // }
            const formData = new FormData();
                formData.append('file', file);
                await fetch(`https://machine.issc.ftisu.vn/${fileType.includes("image")?"upload":"uploadvideo"}`, {
                    method: 'POST',
                    body: formData,
                    mode: 'cors',
                    headers: {
                        Accept: 'application/json',
                    },
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('data.value', data.value)
                    setResponseImage(data.value)
                  })
                .catch((error) => {
                    toast.error("An error has occurred")
                    console.error('Error:', error);
                });
        }
    }
    

    useEffect(()=>{
        let batchId = params.params.split('/')[0];
        setProductCodeValue(Number(batchId))
        
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            SetDataUser(parsedData)
        }
        
        getBatchContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await contract.methods.getAllBatch().call({
              from: accounts[0]
            })
            .then((response : any)=>{ 
                response.forEach((product : any)=>{
                    if(product["batchId"] === batchId){
                        setProductCategory(product["categories"].toLowerCase()) 
                    }
                })
            
            })
            .catch((err : any)=>{console.log(err);})
        }) 

    },[])

    const onSubmit = async (data : any ) => {
        const dataNFT = await handleUploadNFT()
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if(stepNumberId === 0){
            await getProcessingContract().then(async(contract)=>{
                await contract.methods.addStep1(Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, dataNFT? dataNFT : '', dataUser.username, dataUser.usercccd, categoryValue)
                .send({from: accounts[0]})
                .then((res : any)=>{
                    console.log(res)
                    if(res.status){
                        console.log('status: ', res.status)
                        toast.success('Successfully submit');
                        handleHideForm();
                    }
                }).catch((err : any)=>{console.log(err)})
        })
        }else if(stepNumberId === 1){
        getProcessingContract().then(async (contract)=>{
            await contract.methods.addStep2(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, '', dataUser.username, dataUser.usercccd, categoryValue)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully submit');
                    handleHideForm();
                }
            }).catch((err : any)=>{console.log(err)})
        })
        }else if(stepNumberId === 2){
        getProcessingContract().then(async(contract)=>{
            await contract.methods.addStep3(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, '', dataUser.username, dataUser.usercccd, categoryValue)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully submit');
                    handleHideForm();
                }
            }).catch((err : any)=>{console.log(err)})
        })
        }else if(stepNumberId === 3){
        getProcessingContract().then(async(contract)=>{
            await contract.methods.addStep4(0,Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, '', dataUser.username, dataUser.usercccd, categoryValue)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully submit');
                    handleHideForm();
                }
            }).catch((err : any)=>{console.log(err)})
        })
        }else if(stepNumberId === 4){
        getProcessingContract().then(async(contract)=>{
            await contract.methods.addStep5(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, '', dataUser.username, dataUser.usercccd, categoryValue)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully submit');
                    handleHideForm();
                }
            }).catch((err : any)=>{console.log(err)})
        })
        }else if(stepNumberId === 5){
        getProcessingContract().then(async(contract)=>{
            await contract.methods.addStep6(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, '', dataUser.username, dataUser.usercccd, categoryValue)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully submit');
                    handleHideForm();
                }
            }).catch((err : any)=>{console.log(err)})
        })
        }else if(stepNumberId === 6){
        getProcessingContract().then(async(contract)=>{
            await contract.methods.addStep7(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, '', dataUser.username, dataUser.usercccd, categoryValue)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully submit');
                    handleHideForm();
                }
            }).catch((err : any)=>{console.log(err)})
        })
        }else if(stepNumberId === 7){
        getProcessingContract().then(async(contract)=>{
            await contract.methods.addStep8(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, '', dataUser.username, dataUser.usercccd, categoryValue)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully submit');
                    handleHideForm();
                }
            }).catch((err : any)=>{console.log(err)})
        })
        }
    }

    return ( 
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-[60%] p-10 rounded-xl flex flex-col items-center justify-center shadow-lg bg-white">
        <Toaster />
        <div className="w-full flex justify-center items-center mb-6">
            <h2 className="text-3xl font-bold">Create Step {stepNumberId+1}</h2>
            
        </div>
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="productname">Product Name:</label>
                <input type="text" id="productname" value={batchNameValue} disabled className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter product name"/>
            </div>
        </div>
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="date">Date:</label>
                <input type="date" id="date" className="ml-4 px-4 py-4 rounded-[10px] flex-1" {...register("date", { required: true })}/>
            </div>
            {errors.date && <span className="text-red-600 mt-4">*This field is required</span>}
        </div>
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter location" {...register("location", { required: true })}/>
            </div>
            {errors.location && <span className="text-red-600 mt-4">*This field is required</span>}
        </div>
        {
            isUpgrade && stepNumberId===0 && productCategory === 'fruit' &&
            <>
                 <div className="w-full flex justify-center gap-4 mt-10">
                    <div className="flex items-center flex-1">
                        <label htmlFor="photo">Photo:</label>
                        <input type="file" id="photo" 
                            onChange={e => {
                                setFile(e.target.files![0]);
                            }}  
                        className="ml-4 px-4 py-4 rounded-[10px] flex-1"/>
                    </div>
                    {file && <div className="btn" onClick={()=>handleUpload("img")}>Detect</div>}
                    {/* {errors.photo && <span className="text-red-600 mt-4">*This field is required</span>} */}
                </div>
                {responseImage && 
                <div className="w-full flex flex-col justify-center mt-10">
                    <a href={responseImage} target="_blank" className="font-semibold text-lg">Result: {responseImage}</a>
                </div>
                }
            </>
               
        }

        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="userName">User Name:</label>
                <input type="text" id="userName" value={dataUser.username && dataUser.username || ''} disabled className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter user name"/>
            </div>
        </div>
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="citizenId">Citizen Identification Number:</label>
                <input type="text" id="citizenId" value={dataUser.usercccd && dataUser.usercccd|| ''} disabled className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter citizen identification number"/>
            </div>
        </div>
        <div className="flex gap-2 mt-10">
            <div className="px-8 py-6 bg-[#E8E8E8] text-black font-bold" onClick={handleHideForm}>Cancel</div>
            <Button title="Create" className="btn"/>
        </div>
    </form>  
     );
}

function generateRandomNumber() {
    // Generate a random decimal number between 0 and 1
    const randomNumber = Math.random();
    
    // Multiply the random number by 100000 to get a number between 0 and 100000
    const scaledNumber = randomNumber * 100000;
    
    // Use Math.floor() to round down to the nearest integer
    const roundedNumber = Math.floor(scaledNumber);
    
    // Convert the rounded number to a string
    let result = roundedNumber.toString();
    
    // If the rounded number has less than 5 digits, prepend zeros to make it 5 digits long
    while (result.length < 5) {
      result = '0' + result;
    }
    return result;
  }
  