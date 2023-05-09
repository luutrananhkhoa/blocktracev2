'use client';
import { FC, useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import Layout from "@/app/components/Layout";
import {getProcessingContract as getProcessingContract} from "../../contracts/processingContract";
import Button from "@/app/components/Button";

interface BatchDetailsProps {
    
}
 
const BatchDetails: FC<BatchDetailsProps> = () => {
    const params = useParams();
    const [BatchIdValue, setBatchIdValue] = useState(0)
    const [dataStep1, setDataStep1] = useState([])

    useEffect(()=>{
        let batchId = params.batchid;
        setBatchIdValue(Number(batchId))

        const accounts = window.ethereum.request({
            method: "eth_requestAccounts",
        });

        getProcessingContract().then((contract) =>{
            contract.methods.getAllStep1().call({
              from: accounts[0]
            })
            .then((response : any)=>{
              console.log('List step 1:', response)
              const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
              setDataStep1(filteredArr)
              console.log('Data 1: ', filteredArr)
            })
            .catch((err : any)=>{console.log(err);})
          })
    },[])

    return ( 
        <Layout>
            <div className="p-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Tracking</h1>
                    <Button className="btn-yellow" title="Go to products"/>
                </div>
                <div>
                    <p className="font-semibold text-gray-600">5 steps - 3 complete</p>
                </div>
                <div className="mt-12 w-full">
                    <div className="flex gap-4 h-[30vh] w-full">
                        <div className="h-full">
                            <div className="px-6 py-4 bg-black text-white rounded-lg">Step 1</div>
                            <div className="h-full text-center mt-6 after:content-[''] after:h-full after:w-1 after:border-l after:border-blue-100 after:border-4 after:inline-block dark:after:border-black"></div>
                        </div>
                        <div className="w-ful h-full bg-white flex-1 p-6 rounded-lg">
                            <h2>dsadsa</h2>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>

     );
}
 
export default BatchDetails;