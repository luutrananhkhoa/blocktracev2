'use client';
import { FC, useCallback, useEffect, useState } from "react"
import Button from "./Button";
import { useForm } from "react-hook-form";
import {getBatchContract as getBatchContract} from "../contracts/batchContract";
import toast, { Toaster } from 'react-hot-toast';
import { redirect, useRouter  } from "next/navigation";

type AddStepProps = {
}

interface MultiStepsProps {
    stepNumber: number;
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

const AddStep: FC<AddStepProps> = () => {
    const router = useRouter();
    const [stepNumberValue, setStepNumberValue] = useState('1')
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
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const generateVerificationCode = useCallback(() => {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var code = '';
        for (var i = 0; i < 8; i++) {
          code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
      },[])
 
    const onSubmit = async (data : any ) => {
        console.log('data: ', data)
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        let verificationCode = generateVerificationCode();
        console.log('verificationCode', verificationCode)
        getBatchContract().then(async(contract)=>{
            await contract.methods.addBatch(dataUser.userid, dataUser.teamid, data.productname, Number(data.process), data.category, verificationCode)
            .send({from: accounts[0]})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully create batch');
                    router.push('/products');
                }
            }).catch((err : any)=>{console.log(err)})
        })
    }
    useEffect(()=>{
        const storedData = localStorage.getItem('user_data');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('user: ', parsedData)
            SetDataUser(parsedData)
        }

    },[])
    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            className="h-full w-[60%] p-10 rounded-xl mt-10 flex flex-col items-center justify-center shadow-lg bg-white">
            <Toaster />
            <h2 className="text-3xl font-bold mb-8">Add a Product</h2>
            <MultiStep stepNumber={Number(stepNumberValue)} />
            <div className="w-full flex flex-col justify-center mt-10">
                <div className="flex items-center">
                    <label htmlFor="productname">Product Name:</label>
                    <input type="text" id="productname" className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter product name" {...register("productname", { required: true })}/>
                </div>
                {errors.productname && <span className="text-red-600 mt-4">*This field is required</span>}
            </div>
            <div className="w-full flex justify-bee items-center mt-6">
                <label htmlFor="process">Number of Processes:</label>
                <select className="ml-4 my-8 px-4 py-4 border-solid border-gray border-2 rounded-xl flex-1" id="process" 
                {...register("process", { required: true })} 
                onChange={(e)=>setStepNumberValue(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            </div>
            <div className="w-full flex justify-bee items-center">
                <label htmlFor="category">Category:</label>
                <input type="text" id="category" className="ml-4 px-4 py-4 rounded-[10px] flex-1" placeholder="Enter category" {...register("category", { required: true })}/>
            </div>
            <Button title="Create" className="btn mt-10"/>
        </form>  
        )
}

export default AddStep

export const MultiStep: FC<MultiStepsProps> = ({stepNumber}) =>{
    const steps = Array.from({ length: stepNumber }, (_, i) => i + 1);
    const classLastLi ='flex w-full justify-center items-center flex-1';
    const classNormalLi ="flex w-full justify-center items-center text-white dark:text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-[#9252FE]";
    const classSpan ='flex items-center justify-center text-white w-10 h-10 bg-[#9252FE] rounded-full lg:h-12 lg:w-12 dark:bg-[#9252FE] shrink-0';
    return (
        <ol className="flex items-center justify-center w-full">
            {steps.map((step, index) => (
                 <li key={step} className={ index === steps.length -1 ? classLastLi : classNormalLi}>
                    <span className={classSpan}>
                        {step}
                    </span>
                </li>
            ))}
        </ol>
    )
}
