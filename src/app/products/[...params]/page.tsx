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

interface ProductDetailProps {
    
}

interface StepProcessProps {
    stepId: number,
    handleHide: () => void,
    setStepNumberId: (id: number) => void
}

interface StepFormProps {
    handleHideForm: () => void,
    stepNumberId: number
}

const ProductDetail: FC<ProductDetailProps> = () => {
    const router = useRouter();
    const params = useParams();
    const [stepNumberValue, setStepNumberValue] = useState(0)
    const [isShowForm, setIsShowForm] = useState(false)
    const [stepNumberId, setStepNumberId] = useState(1)

    useEffect(()=>{
        console.log('route:', params.params)

        let batchId = params.params.split('/')[0];
        let stepNumber = params.params.split('/')[1];
        setStepNumberValue(Number(stepNumber))
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
                    <h1 className="text-4xl font-bold">Product 1</h1>
                </div>
                {isShowForm ? 
                    <div className="w-full justify-center">
                        <div className="flex p-6 justify-center">
                            <StepForm stepNumberId={stepNumberId} handleHideForm={handleHideForm}/>
                        </div> 
                    </div>

                    :
                    <div className="flex p-6 gap-10 justify-start flex-wrap">
                        {Array.from({ length: stepNumberValue }, (_, i) => (
                            <div key={i} className="min-h-[450px] w-[20%] rounded-xl mt-10 flex flex-col items-center justify-center shadow-lg bg-white">
                                <StepProcess stepId={i} handleHide={handleHideForm} setStepNumberId={setStepNumberId}/>
                            </div>
                        ))}
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
        <div className="w-full h-full px-6 py-10 bg-white flex items-center justify-between flex-col rounded-xl">
            <h2 className="text-4xl font-bold text-[#FFD237]">Step {stepId+1}</h2>
            <div className="w-full">
                <div className="px-6 py-4 bg-[#9252FE] rounded-full flex justify-center text-xl font-bold text-white cursor-pointer" 
                    onClick={handleClick}>Create</div>
            </div>
        </div>
     );
}

const StepForm: FC<StepFormProps> = ({handleHideForm, stepNumberId}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const params = useParams();
    const [productCodeValue, setProductCodeValue] = useState(0)

    useEffect(()=>{
        let batchId = params.params.split('/')[0];
        setProductCodeValue(Number(batchId))

        console.log('stepNumerId', stepNumberId)
    },[])

    const onSubmit = async (data : any ) => {
        console.log('data: ', data)

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
          if(stepNumberId === 0){
            getProcessingContract().then((contract)=>{
                contract.methods.addStep1(productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
                contract.methods.addStep2("",productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
                contract.methods.addStep3("", productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
                contract.methods.addStep4("", productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
                contract.methods.addStep5("", productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
                contract.methods.addStep6("", productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
                contract.methods.addStep7("", productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
                contract.methods.addStep8("",productCodeValue ,data.productname, data.date, data.location, "", data.userName, data.citizenId, "")
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
            <div className="px-6 py-4 bg-[#9252FE] rounded-lg flex justify-center text-xl font-bold text-white cursor-pointer" onClick={handleHideForm}>Cancel</div>
        </div>
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="productname">Product Name:</label>
                <input type="text" id="productname" className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter product name" {...register("productname", { required: true })}/>
            </div>
            {errors.productname && <span className="text-red-600 mt-4">*This field is required</span>}
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
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="photo">Photo:</label>
                <input type="file" id="photo" className="ml-4 px-4 py-4 rounded-[10px] flex-1"/>
            </div>
            {errors.photo && <span className="text-red-600 mt-4">*This field is required</span>}
        </div>
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="userName">User Name:</label>
                <input type="text" id="userName" className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter user name" {...register("userName", { required: true })}/>
            </div>
            {errors.userName && <span className="text-red-600 mt-4">*This field is required</span>}
        </div>
        <div className="w-full flex flex-col justify-center mt-10">
            <div className="flex items-center">
                <label htmlFor="citizenId">Citizen Identification Number:</label>
                <input type="text" id="citizenId" className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter citizen identification number"  {...register("citizenId", { required: true })}/>
            </div>
            {errors.citizenId && <span className="text-red-600 mt-4">*This field is required</span>}
        </div>
        <Button title="Create" className="btn-yellow mt-10"/>
    </form>  
     );
}