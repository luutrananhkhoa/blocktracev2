'use client';
import AddStep from "@/app/components/AddStep";
import Button from "@/app/components/Button";
import Layout from "@/app/components/Layout";
import SidebarCustomer from "@/app/components/SidebarCustomer";
import { getBatchContract } from "@/app/contracts/batchContract";
import { getUserContract } from "@/app/contracts/userContract";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import emailjs from '@emailjs/browser';

interface AddProductOwnerProps {
    
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

interface Batch {
    batchId : string | null,
    batchName : string | null,
    categories : string | null,
    numOfProcess : string | null,
}

const AddProductOwner: FC<AddProductOwnerProps> = () => {
    const router = useRouter()
    const [codeValue, setCodeValue] = useState<string>('')
    const [verifyCode, setVerifyCode] = useState<string>('')
    const [verifyCodInput, setVerifyCodeInput] = useState<string>('')
    const [currentDate, setCurrentDate] = useState<string>('')
    const [listAllProducts, setListAllProducts] = useState([])
    const [listAllOwner, setListAllOwner] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [isSendGmail, setIsSendGmail] = useState(false)
    const [isShowInfo, setIsShowInfo] = useState(false)
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
    const [dataBatch, SetDataUBatch] = useState<Batch>({
        batchId: null,
        batchName: null,
        categories: null,
        numOfProcess: null
    })

    const onCheckVerify = () =>{
        if(verifyCode === verifyCodInput){
            setIsAdd(true)
            toast.success('Confirmation Successful!')
        }else{
            toast.error('Confirmation failed!')
        }
    }

    //EmailJS
    const sendEmail = () =>{
        const min = 10000000;
        const max = 99999999;
        const veriCode = Math.floor(Math.random() * (max - min + 1)) + min;
        setVerifyCode(veriCode.toString())

        const templateParams = {
            from_email : 'BLOCKTRACE',
            to_email: '19520636@gm.uit.edu.vn',
            username: 'Khoa',
            confirmationCode: veriCode,
        };
        
        emailjs.send('service_n1iynk4','template_0wgwajc', templateParams, 'McUIWs_FHXPZgmsAI')
            .then((response) => {
               console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
               console.log('FAILED...', err);
            });
    }

    //Get current Date
    const CurrentDate = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = currentDate.getFullYear();
      
        const formattedDate = `${day}/${month}/${year}`;
      
        return formattedDate;
    };

      
    const onCheck = async () =>{
        let flag = false
        let flagOwner = false

        listAllProducts.map((product)=>{
          if(product["batchId"] === codeValue){
            flag = true
          }
        })

        listAllOwner.map((product : any)=>{    
            if(product["batchId"] ===  codeValue){
                flagOwner = true
            }
        })

        if(flag && !flagOwner){
            toast.success("Product is available")
            // setIsAdd(true)
            setIsShowInfo(false)
            setIsSendGmail(true)
        }else if(!flag && !flagOwner){
            toast.error("Product is not exsist")
            setIsShowInfo(false)
            setIsAdd(false)
            setIsSendGmail(false)
        }else if(flag && flagOwner){
            console.log(' fle 3')
            toast.error("Product already has owner")
            setIsShowInfo(false)
            setIsAdd(false)
            setIsSendGmail(false)
        }
    }

    //Add info after checking
    const handleAddInfo = () =>{
        const customerDataStorage = localStorage.getItem('customer_data');
        const currentDate = CurrentDate().toString();
        setCurrentDate(currentDate)
        if(customerDataStorage){
            const parsedData = JSON.parse(customerDataStorage);
            SetDataUser(parsedData)
            console.log('customerDataStorage', parsedData)
        }else{
            toast.error("Customer's data not found")
        }

        listAllProducts.map((product)=>{
            if(product["batchId"] === codeValue){
                console.log('product: ', product)
                let item ={
                    batchId: product["batchId"],
                    batchName: product["batchName"],
                    categories: product["categories"],
                    numOfProcess: product["numOfProcess"],
                }
                SetDataUBatch(item)
            }
        })
        setIsShowInfo(true)
    }

    //Add Product after reviewing
    const handleAddProduct = async () =>{
        console.log('Add function')
        let addressWallet = ''
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        addressWallet = accounts[0]
        getUserContract().then((contract)=>{
            contract.methods.addOwner(dataBatch.batchId, dataBatch.batchName, dataUser.username, currentDate, dataUser.useremail, dataUser.userphone)
            .send({from: addressWallet})
            .then((res : any)=>{
                console.log(res)
                if(res.status){
                    console.log('status: ', res.status)
                    toast.success('Successfully create batch');
                    router.push('/customerproduct');
                }
            }).catch((err : any)=>{console.log(err)})
        })
    }

    useEffect(()=>{
      
        getBatchContract().then(async (contract) =>  {
          const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          contract.methods.getAllBatch().call({
            from: accounts[0]
          })
          .then((response : any)=>{
              console.log('List product:', response)
              setListAllProducts(response)
            //   setListProduct(arrayList)
            //   setListProductFilter(arrayList)
          })
          .catch((err : any)=>{console.log(err);})
        })  

        getUserContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            contract.methods.getAllOwner().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List owner:', response)
                setListAllOwner(response)
                // response.map((product : any)=>{
                    
                //     if(product["batchId"] ===  codeValue){
                //         console.log(' flagOwner = true')
                //         flagOwner = true
                //     }
                // })
                // setListProducts(response)
            })
            .catch((err : any)=>{console.log(err);})
        })
       },[])

    // if(goToProduct){
    //     return redirect('/products')
    // }
    return ( 
        <div className="min-h-screen flex">
            <SidebarCustomer />
            <div className=" w-full min-h-screen bg-[#f8f8fa]">
                <Toaster />
                <div className="w-full p-10 bg-white">
                    <h1 className="text-4xl font-bold">Product</h1>
                </div>
                <div className="bg-[#f8f8fa] p-10">
                    <div className="w-full p-6">
                        <h1 className="text-3xl font-bold">Add Product</h1>
                    </div>
                    <div className="w-full flex p-6 gap-8">
                        <div className="bg-white p-4 flex-4">
                            <h2 className="text-xl mb-4 font-bold">Check Product</h2>
                            <div className="flex gap-4">
                                <input type="text" className="px-6 py-4 border-[1px] outline-none" placeholder="Enter code" onChange={(e)=>setCodeValue(e.target.value)}/>
                                <div className="btn" onClick={onCheck}>
                                    Check
                                </div>
                            </div>
                            {isSendGmail &&
                                <div className="btn mt-10 text-center cursor-pointer" onClick={sendEmail}>
                                Send
                            </div>}

                            <h2 className="text-xl mb-4 mt-4 font-bold">Verification code:</h2>
                            <div className="flex gap-4">
                                <input type="text" className="px-6 py-4 border-[1px] outline-none" placeholder="Enter code" onChange={(e)=>setVerifyCodeInput(e.target.value)}/>
                                <div className="btn-red cursor-pointer" onClick={onCheckVerify}>
                                    OK
                                </div>
                            </div>
                            {isAdd &&  
                                <div className="btn-yellow mt-10 text-center cursor-pointer" onClick={handleAddInfo}>
                                    Add
                                </div>}
                           
                        </div>
                        {!isShowInfo?
                            <div className="bg-white p-10 flex-1 flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 16 16"><g fill="currentColor"><path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5a.5.5 0 0 1-.5.5a.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5a.5.5 0 0 1-.5-.5Z"/><path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM6 8h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1Z"/></g></svg>
                                <p className="text-3xl mt-6">Please enter the product code</p>
                            </div>
                        :
                            <div className="bg-white p-4 flex-1 flex flex-col items-center">
                                <div className="w-full flex flex-col items-center">
                                    <h1 className="text-3xl font-bold ">Information</h1>
                                    <p className="mt-2 text-sm font-semibold text-red-600">*Please double-check all the information before saving the product details into the blockchain.</p>
                                </div>
                                <div className="w-[50%] mt-8 flex flex-col gap-6 font-semibold text-xl">
                                    <div>
                                        Product Name: {dataBatch.batchName}
                                    </div>
                                    <div>
                                        Product Category: {dataBatch.categories}
                                    </div>
                                    <div>
                                        Number of Process: {dataBatch.numOfProcess}
                                    </div>
                                    <div>
                                        Owner: {dataUser.username}
                                    </div>
                                    <div>
                                        Date: {currentDate}
                                    </div>
                                    <div>
                                        Email:  {dataUser.useremail}
                                    </div>
                                    <div>
                                        Phone Number:  {dataUser.userphone}
                                    </div>
                                </div>
                                <div className="w-full flex gap-8 justify-end">
                                    <div onClick={()=>setIsShowInfo(false)} className="btn mt-10 text-center">
                                        Cancel
                                    </div>
                                    <div className="btn-red mt-10 text-center" onClick={handleAddProduct}>
                                        Add
                                    </div>
                                </div>
                            </div>
                        }
                    
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AddProductOwner;

