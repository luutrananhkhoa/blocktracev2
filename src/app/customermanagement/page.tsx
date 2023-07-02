'use client';
import { FC, useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {getUserContract as getUserContract} from "../contracts/userContract";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import SidebarCustomer from "../components/SidebarCustomer";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { getBatchContract } from "../contracts/batchContract";

interface CustomerManagementProps {
    
}
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomerManagement: FC<CustomerManagementProps> = () => {
    const router = useRouter()
    const [countUsers, setCountUsers] = useState(0)
    const [countProducts, setCountProducts] = useState(0)
    //Chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
            position: 'top' as const,
            },
            title: {
            display: true,
            text: 'Chart',
            },
        },
        maintainAspectRatio: false
    };

    const labels = ['Statistics'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Users',
            data: [countUsers],
            backgroundColor: 'rgb(144,194,243)',
          },
          {
            label: 'Products',
            data:  [countProducts],
            backgroundColor: 'rgb(236,210,150)',
          },
        ],
      };


    const handleStarter = () =>{
      router.push('/customerproduct');
    }

    useEffect(()=>{
      toast.success('Welcome!');
      getUserContract().then(async (contract) =>  {
          const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          await contract.methods.getAllUser().call({
            from: accounts[0]
          })
          .then(async(response : any)=>{
              console.log('users: ',response)
              setCountUsers(response.length)
              })
          })
      .catch((err : any)=>{console.log(err);}) 
      
      getBatchContract().then(async (contract) =>{
          const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          await contract.methods.getAllBatch().call({
            from: accounts[0]
          })
          .then((response : any)=>{
              console.log('products: ',response)
              setCountProducts(response.length)
          })
          .catch((err : any)=>{console.log(err);})
        })
  },[])

    return ( 
        <div className="min-h-screen flex">
            <SidebarCustomer />
            <div className="min-h-screen flex-col flex flex-1">
              <div className="p-10 bg-[#FDFDFD]">
                  <h1 className="text-4xl font-bold">Home</h1>
                  <div className="w-full h-[35vh] mt-10 bg-[#3F2A8C] rounded-2xl flex flex-col items-center justify-center">
                    <h1 className="text-5xl font-bold text-white">Get started with BlockTrace</h1>
                    <p className="text-[#BDBCF1] font-semibold mt-8 text-lg w-[30%] text-center">Securely store and protect your valuable products with our blockchain-based support system.</p>
                    <div className="mt-8 px-12 py-5 text-xl rounded-full font-semibold text-[#3F2A8C] bg-[#7FEEC4] cursor-pointer" onClick={handleStarter}>Get Starter</div>
                  </div>
              </div>
              <div className="w-full p-6 flex bg-[#FDFDFD]">
                  <div className="flex-1 w-[20vh] h-[50vh]">
                      <Bar options={options} data={data} />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-center gap-6 bg-[#FDFDFD]">
                      <div className="flex items-center p-8 bg-[#FFFCF1] rounded-xl">
                          <div className="inline-flex flex-shrink-0 items-center justify-center p-8 text-[#FFE460] bg-[#FFFFF4] rounded-full mr-6">
                              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>
                          </div>
                          <div>                                        
                              <span className="block text-gray-500 font-semibold mb-2">Users</span>
                              <span className="block text-4xl font-bold text-[#303B5A]">{countUsers? countUsers : "19"}</span>
                          </div>
                      </div>
                      <div className="flex items-center p-8 bg-[#F2FAFF] rounded-lg">
                          <div className="inline-flex flex-shrink-0 items-center justify-center p-8 text-[#9BC9E1] bg-[#DEF0FF] rounded-xl mr-6">
                              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><path fill="currentColor" d="M7.303.04a.5.5 0 0 1 .394 0L14.5 2.956l-7 3l-7-3L7.303.04ZM0 3.83v7.67c0 .2.12.38.303.46L7 14.83v-8l-7-3Zm8 3l7-3v7.67a.5.5 0 0 1-.303.46L8 14.83v-8Z"/></svg>
                          </div>
                          <div>
                              <span className="block text-gray-500 font-semibold mb-2">Products</span>
                              <span className="block text-4xl font-bold text-[#303B5A]">{countProducts? countProducts: "55"}</span>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>
     );
}
 
export default CustomerManagement;