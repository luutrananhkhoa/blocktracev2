'use client';
import { FC, useEffect } from "react";
import Sidebar from '../components/Sidebar/Sidebar';
import Layout from "../components/Layout";
import Button from "../components/Button";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";
import { useSelector } from 'react-redux';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Link from "next/link";

interface DashboardProps {
    
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard: FC<DashboardProps> = () => {
    const user = useSelector((state: any) => state.user.user);
    console.log('dispatch', user)

    //Chart
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            // text: 'Chart.js Line Chart',
          },
        },
        maintainAspectRatio: false
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    const data = {
        labels,
        datasets: [
          {
            label: 'Fruit',
            data: [123, -343, 2, 45, 123, -12, 22],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Others',
            data: [333, -11, 232, -45, 54, 32, 222],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };

    useEffect(()=>{
        toast.success('Welcome!');
    },[])

    return ( 
        <Layout>
            <div>
                <Toaster />
                <div className="flex-grow text-gray-800">
                    <main className="sm:px-10 sm:py-4 space-y-6">
                        <div className="w-full h-[30vh] bg-[#DAD8FA] rounded-xl flex">
                            <div className="flex-1 flex items-center justify-center">
                                <div className="flex gap-6 flex-col w-[75%]">
                                    <h1 className="text-4xl font-bold">Welcome back <span className="p-2 bg-[#726BDF] text-white">Blocktrace</span></h1>
                                    <p className="font-semibold text-xl">When an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center items-end">
                                <Image src="/imgfordashboard2.png" className="w-[50%]" width="800" height="800" alt="Logo" />
                            </div>
                        </div>
                        {/* <img className="w-full h-[25vh] object-cover" src="https://images.unsplash.com/photo-1464297162577-f5295c892194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""
                            /> */}
                        <div className="mt-10 flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">                   
                            <div className="mr-6">
                                <h1 className="text-2xl font-bold mb-2">Dashboard</h1>           
                            </div>
                            <div className="flex flex-wrap items-start justify-end -mb-3">
                                <Link href={'/products/add'} className="inline-flex px-5 py-3 text-white bg-[#726BDF] hover:bg-[#5853AF] focus:bg-purple-700 rounded-md ml-6 mb-3">
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Create new product
                                </Link>
                            </div>
                        </div>
                        {/* <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold">89562</span>
                                    <span className="block text-gray-500">Users</span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold">27.6%</span>
                                    <span className="block text-gray-500">CTR</span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="inline-block text-2xl font-bold">3m 45s</span>
                                    <span className="inline-block text-xl text-gray-500 font-semibold">(-32%)</span>
                                    <span className="block text-gray-500">Average</span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold">956</span>
                                    <span className="block text-gray-500">Products</span>
                                </div>
                            </div>
                        </section> */}
                        <div className="w-full flex">
                            <div className="flex-1 w-[20vh] h-[50vh]">
                                <Line options={options} data={data} />
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-center gap-6">
                                <div className="flex items-center p-8 bg-[#FFFCF1] rounded-xl">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center p-8 text-[#FFE460] bg-[#FFFFF4] rounded-full mr-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>
                                    </div>
                                    <div>                                        
                                        <span className="block text-gray-500 font-semibold mb-2">Users</span>
                                        <span className="block text-4xl font-bold text-[#303B5A]">101</span>
                                    </div>
                                </div>
                                <div className="flex items-center p-8 bg-[#F2FAFF] rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center p-8 text-[#9BC9E1] bg-[#DEF0FF] rounded-xl mr-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 15 15"><path fill="currentColor" d="M7.303.04a.5.5 0 0 1 .394 0L14.5 2.956l-7 3l-7-3L7.303.04ZM0 3.83v7.67c0 .2.12.38.303.46L7 14.83v-8l-7-3Zm8 3l7-3v7.67a.5.5 0 0 1-.303.46L8 14.83v-8Z"/></svg>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 font-semibold mb-2">Products</span>
                                        <span className="block text-4xl font-bold text-[#303B5A]">54</span>
                                    </div>
                                </div>
                                <div className="flex items-center p-8 bg-[#EAFFF8] rounded-lg">
                                    <div className="inline-flex flex-shrink-0 items-center justify-center p-8 text-[#8AC6AF] bg-[#F6FFFD] rounded-xl mr-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1200 1200"><path fill="currentColor" d="M600 0C268.629 0 0 268.629 0 600s268.629 600 600 600s600-268.629 600-600S931.371 0 600 0zm-1.216 333.625c55.343.728 101.183 45.781 116.413 103.191c5.807 23.424 6.462 47.188.608 71.998c-8.827 34.929-26.498 69.048-59.423 90.008l47.986 22.796l114.021 55.205c11.199 4.8 16.793 14.399 16.793 28.8v110.372c0 22.763 1.808 42.393-26.406 50.418H388.792c-27.134-.391-28.258-27.874-27.622-50.418V705.623c0-14.4 6.009-24.415 18.009-30.016l117.591-53.989L542.401 600c-20.8-13.6-37.202-32.383-49.202-56.383c-14.41-31.684-20.123-72.814-9.612-110.411c13.288-50.962 54.904-96.748 115.197-99.581zm-195.593 50.38c17.601 0 33.587 5.215 47.986 15.615c-3.993 11.198-7.375 23.009-10.183 35.41c-2.799 12.398-4.217 25.38-4.217 38.981c0 20.001 2.796 39.199 8.396 57.6c5.599 18.399 13.61 35.217 24.013 50.418c-4.801 6.399-11.187 11.993-19.188 16.793l-88.83 40.805c-12 6.4-21.599 15.376-28.799 26.977c-7.2 11.6-10.79 24.619-10.79 39.02v110.372h-87.576c-12.705-.198-21.286-13.002-21.619-26.368V685.221c0-12 4.384-20.013 13.184-24.013L358.777 600c-34.417-21.156-51.021-59.395-52.773-101.976c.606-52.462 34.992-109.661 97.187-114.019zm393.58 0c55.291.874 95.229 55.691 97.227 114.02c-.304 38.595-15.369 75.863-50.418 100.798l130.813 62.386c8.8 4.8 13.184 12.812 13.184 24.013v104.407c-.132 12.392-6.82 25.103-21.58 26.367h-90.008V705.623c0-14.4-3.59-27.419-10.79-39.02s-16.8-20.576-28.8-26.976c-37.304-17.339-80.146-29.784-108.017-58.814c20.8-32 31.193-67.601 31.193-106.802c0-24.8-4.384-49.214-13.184-73.214c14.452-9.541 31.558-16.524 50.38-16.792z"/></svg>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 font-semibold mb-2">Subsystem</span>
                                        <span className="block text-4xl font-bold text-[#303B5A]">10</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </Layout>
     );
}
 
export default Dashboard;