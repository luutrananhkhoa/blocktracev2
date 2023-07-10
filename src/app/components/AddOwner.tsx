import React, { FC, useState } from 'react'
import Button from './Button';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { getUserContract } from '../contracts/userContract';
import { useParams, useRouter } from 'next/navigation'
import { getBatchContract } from '../contracts/batchContract';

interface AddOwnerProps {
  StepName: string,
  setIsShowFormOwner: (value: boolean) => void

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

const AddOwner: FC <AddOwnerProps> = ({ StepName ,setIsShowFormOwner}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const params = useParams();
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

  const onSubmit = async (data : any ) => {
    let batchId = params.params.split('/')[0];
      const storedData = localStorage.getItem('user_data');
      let dataUser = {
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
      }
      if (storedData) {
          const parsedData = JSON.parse(storedData);
          dataUser = parsedData
      }

      if(StepName === "Manufacturer"){
        let dataStep = {
          batchId: batchId,
          productCode: "",
          manufacturerId: dataUser.userid,
          dateTime: data.date
        }       
        await getBatchContract().then(async (contract) =>  {
          const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          await contract.methods.getAllBatch().call({
            from: accounts[0]
          })
          .then(async(response : any)=>{
             response.forEach((item : any)=>{
              if(item["batchId"] === batchId){
                dataStep.productCode = item["verifyCode"];
              }
             })
          })
          .catch((err : any)=>{console.log(err);})
        }) 
        getUserContract().then(async(contract)=>{
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await contract.methods.addOwner(Number(dataStep.batchId), Number(dataStep.batchId), Number(dataStep.manufacturerId), dataStep.dateTime)
          .send({from: accounts[0]})
          .then((res : any)=>{
              console.log(res)
              if(res.status){
                  console.log('status: ', res.status)
                  toast.success('Successfully Add');
              }
          }).catch((err : any)=>{console.log(err)})
        })

      }else if(StepName === "Distributor"){
        //For distributor
        let dataStep = {
          productOwnerId: "",
          distributorId: dataUser.userid
         }
        await getUserContract().then(async(contract)=>{
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await  contract.methods.getAllOwner().call({
              from: accounts[0]
          })
          .then((res : any)=>{
              console.log('res distributor',res)
              res.forEach((item : any)=>{
                if(item["batchId"]=== batchId){
                  dataStep.productOwnerId = item["productOwnerId"]
                }
              })
          }).catch((err : any)=>{console.log(err)})
       })
       getUserContract().then(async(contract)=>{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await contract.methods.addDistributorId(Number(dataStep.productOwnerId), Number(dataStep.distributorId))
        .send({from: accounts[0]})
        .then((res : any)=>{
            console.log(res)
            if(res.status){
                console.log('status: ', res.status)
                toast.success('Successfully Add');
            }
        }).catch((err : any)=>{console.log(err)})
       })
      }else if(StepName === "Retailer"){
        //For Retailer
        let dataStep = {
          productOwnerId: "",
          martketId: dataUser.userid
         }
        await getUserContract().then(async(contract)=>{
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await  contract.methods.getAllOwner().call({
              from: accounts[0]
          })
          .then((res : any)=>{
              console.log('res Retailer',res)
              res.forEach((item : any)=>{
                if(item["batchId"]=== batchId){
                  dataStep.productOwnerId = item["productOwnerId"]
                }
              })
          }).catch((err : any)=>{console.log(err)})
       })
       console.log('dataStep Retailer',dataStep)
       getUserContract().then(async(contract)=>{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await contract.methods.addMartketId(Number(dataStep.productOwnerId), Number(dataStep.martketId))
        .send({from: accounts[0]})
        .then((res : any)=>{
            console.log(res)
            if(res.status){
                console.log('status: ', res.status)
                toast.success('Successfully Add');
            }
        }).catch((err : any)=>{console.log(err)})
       })
      }else if(StepName === "Staff"){
        //For Staff
        let dataStep = {
          productOwnerId: "",
          staffId: dataUser.userid
         }
        await getUserContract().then(async(contract)=>{
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await  contract.methods.getAllOwner().call({
              from: accounts[0]
          })
          .then((res : any)=>{
              console.log('res Staff',res)
              res.forEach((item : any)=>{
                if(item["batchId"]=== batchId){
                  dataStep.productOwnerId = item["productOwnerId"]
                }
              })
          }).catch((err : any)=>{console.log(err)})
       })
       getUserContract().then(async(contract)=>{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await contract.methods.addStaffId(Number(dataStep.productOwnerId), Number(dataStep.staffId))
        .send({from: accounts[0]})
        .then((res : any)=>{
            console.log(res)
            if(res.status){
                console.log('status: ', res.status)
                toast.success('Successfully Add');
            }
        }).catch((err : any)=>{console.log(err)})
       })
      }else if(StepName === "Customer"){
        //For Customer
        let dataStep = {
          productOwnerId: "",
          customerId: data.customerid
         }
        await getUserContract().then(async(contract)=>{
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          await  contract.methods.getAllOwner().call({
              from: accounts[0]
          })
          .then((res : any)=>{
              console.log('res Customer',res)
              res.forEach((item : any)=>{
                if(item["batchId"]=== batchId){
                  dataStep.productOwnerId = item["productOwnerId"]
                }
              })
          }).catch((err : any)=>{console.log(err)})
       })
       getUserContract().then(async(contract)=>{
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        await contract.methods.addCustomerId(Number(dataStep.productOwnerId), Number(dataStep.customerId))
        .send({from: accounts[0]})
        .then((res : any)=>{
            console.log(res)
            if(res.status){
                console.log('status: ', res.status)
                toast.success('Successfully Add');
            }
        }).catch((err : any)=>{console.log(err)})
       })
      }
  }
  const handleCancel = () =>{
    setIsShowFormOwner(false)
  }
  return (
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-[60%] p-10 rounded-xl flex flex-col items-center justify-center shadow-lg bg-white">
        <Toaster />
        <div className="w-full flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">ADD {StepName.toUpperCase()}</h2>
            <svg onClick={()=>handleCancel()} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"/></svg> 
        </div>
        {StepName === "Manufacturer"
        &&
        <div className="w-full flex flex-col justify-center mt-10">
          <div className="flex items-center">
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" className="ml-4 px-4 py-4 rounded-[10px] flex-1" {...register("date", { required: true })}/>
          </div>
          {errors.date && <span className="text-red-600 mt-4">*This field is required</span>}
        </div> 
        }
      {StepName === "Customer"
        &&
        <div className="w-full flex flex-col justify-center mt-10">
          <div className="flex items-center">
              <label htmlFor="customerid">Customer Id:</label>
              <input type="text" id="date" className="ml-4 px-4 py-4 rounded-[10px] flex-1" {...register("customerid", { required: true })}/>
          </div>
          {errors.customerid && <span className="text-red-600 mt-4">*This field is required</span>}
        </div> 
        }
        {/* <div className="w-full flex flex-col justify-center mt-10">
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
        </div> */}
        <div className="flex gap-2 mt-10">
            <Button title="ADD" className="btn"/>
        </div>
    </form>  
  )
}

export default AddOwner