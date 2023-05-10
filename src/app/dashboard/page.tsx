'use client';
import { FC, useEffect } from "react";
import Sidebar from '../components/Sidebar/Sidebar';
import Layout from "../components/Layout";
import Button from "../components/Button";
import toast, { Toaster } from 'react-hot-toast';
import Image from "next/image";
interface DashboardProps {
    
}
 
const Dashboard: FC<DashboardProps> = () => {

    useEffect(()=>{
        toast.success('Welcome!');
    },[])

    return ( 
        <Layout>
            <div>
                <Toaster />
                <div className="flex-grow text-gray-800">
                    <main className="sm:px-10 sm:py-4 space-y-6">
                        <img className="w-full h-[25vh] object-cover" src="https://images.unsplash.com/photo-1464297162577-f5295c892194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt=""
                            />
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">                   
                        <div className="mr-6">
                        <h1 className="text-4xl font-semibold mb-2">Welcome To Dashboard</h1>           
                        </div>
                        <div className="flex flex-wrap items-start justify-end -mb-3">
                        <button className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create new product
                        </button>
                        </div>
                    </div>
                    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
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
                    </section>
                    </main>
                </div>
            </div>
        </Layout>
     );
}
 
export default Dashboard;