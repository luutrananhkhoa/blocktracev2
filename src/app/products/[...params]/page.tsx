'use client';
import { FC, useEffect, useState } from "react";
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
    categoryValue: string
}

const ProductDetail: FC<ProductDetailProps> = () => {
    const router = useRouter();
    const params = useParams();
    const [stepNumberValue, setStepNumberValue] = useState(0)
    const [isShowForm, setIsShowForm] = useState(false)
    const [stepNumberId, setStepNumberId] = useState(1)
    const [batchNameValue, setBatchNameValue] = useState('')
    const [categoryValue, setCategoryValue] = useState('')
    const [isArrayShow, setIsArrayShow] = useState([])

    useEffect(()=>{
        let batchId = params.params.split('/')[0];
        let stepNumber = params.params.split('/')[1];
        setStepNumberValue(Number(stepNumber))

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
                        console.log('Product OK:', product)
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

       
        
    },[])

    const handleHideForm = () =>{
        setIsShowForm(!isShowForm)
    }
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

                {isShowForm ? 
                    <div className="w-full justify-center">
                        <div className="flex p-6 justify-center">
                            <StepForm stepNumberId={stepNumberId} handleHideForm={handleHideForm} categoryValue={categoryValue} batchNameValue={batchNameValue}/>
                        </div> 
                    </div>

                    :
                    <div className="mt-10 w-full flex items-center justify-center">
                        <div className="bg-white w-[80%] min-h-[80vh] rounded-2xl flex flex-col items-center p-10">
                            <h1 className="font-bold text-6xl">{batchNameValue}</h1>
                            <p className="text-2xl mt-6">{categoryValue}</p>
                            <div className="w-full">
                                <div className="flex p-6 gap-10 justify-start flex-wrap">
                                    {  Array.from({ length: stepNumberValue }, (_, i) => (
                                            isArrayShow[i]?
                                            <div className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center">
                                                 <div className="w-full h-full px-6 py-10 bg-[#fec652] flex items-center justify-between flex-col rounded-xl">
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
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </Layout>
     );
}
 
export default ProductDetail;

const StepProcess: FC<StepProcessProps> = ({stepId, handleHide, setStepNumberId}) => {
    const handleClick = () => {
        handleHide();
        setStepNumberId(stepId);
      };
    return ( 
        <div className="w-full h-full px-6 py-10 bg-[#726BDF] flex items-center justify-between flex-col rounded-xl">
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

const StepForm: FC<StepFormProps> = ({handleHideForm, stepNumberId, categoryValue, batchNameValue}) => {
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

    const params = useParams();
    const [productCodeValue, setProductCodeValue] = useState(0)

    useEffect(()=>{
        let batchId = params.params.split('/')[0];
        setProductCodeValue(Number(batchId))
        
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('user: ', parsedData)
            SetDataUser(parsedData)
        }
        
    },[])

    const onSubmit = async (data : any ) => {
        console.log('data: ', data)

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
          if(stepNumberId === 0){
            getProcessingContract().then((contract)=>{
                contract.methods.addStep1(Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
            getProcessingContract().then((contract)=>{
                contract.methods.addStep2(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
            getProcessingContract().then((contract)=>{
                contract.methods.addStep3(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
            getProcessingContract().then((contract)=>{
                contract.methods.addStep4(0,Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
            getProcessingContract().then((contract)=>{
                contract.methods.addStep5(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
            getProcessingContract().then((contract)=>{
                contract.methods.addStep6(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
            getProcessingContract().then((contract)=>{
                contract.methods.addStep7(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
            getProcessingContract().then((contract)=>{
                contract.methods.addStep8(0, Number(productCodeValue) , Number(dataUser.userid), Number(dataUser.teamid), batchNameValue, data.date, data.location, "", dataUser.username, dataUser.usercccd, categoryValue)
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
        className="h-full w-[60%] p-10 rounded-xl mt-10 flex flex-col items-center justify-center shadow-lg bg-white">
        <Toaster />
        <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Create Step {stepNumberId+1}</h2>
            <div className="btn" onClick={handleHideForm}>Cancel</div>
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
        {/* <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="photo">Photo:</label>
                <input type="file" id="photo" className="ml-4 px-4 py-4 rounded-[10px] flex-1"/>
            </div>
            {errors.photo && <span className="text-red-600 mt-4">*This field is required</span>}
        </div> */}
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
        <Button title="Create" className="btn mt-10"/>
    </form>  
     );
}