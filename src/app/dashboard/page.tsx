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
                            <span className="block text-gray-500">Average Engagement Time</span>
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
                    <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
                        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                        <div className="px-6 py-5 font-semibold border-b border-gray-100">Your insights will appear here soon.</div>
                        <div className="p-4 flex-grow">
                            <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
                        </div>
                        </div>
                        <div className="flex items-center p-8 bg-white shadow rounded-lg">
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                        <div>
                            <span className="block text-2xl font-bold">25</span>
                            <span className="block text-gray-500">Lections left</span>
                        </div>
                        </div>
                        <div className="flex items-center p-8 bg-white shadow rounded-lg">
                        <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <span className="block text-2xl font-bold">139</span>
                            <span className="block text-gray-500">Hours spent on lections</span>
                        </div>
                        </div>
                        <div className="row-span-3 bg-white shadow rounded-lg">
                        <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                            <span>Users By Country ID</span>
                            <button type="button" className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
                            USERS
                            <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            <ul className="p-6 space-y-6">
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                
                                </div>
                                <span className="text-gray-600">United States</span>
                                <span className="ml-auto font-semibold">9.3</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                </div>
                                <span className="text-gray-600">Spain</span>
                                <span className="ml-auto font-semibold">8.9</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                </div>
                                <span className="text-gray-600">United Kingdom</span>
                                <span className="ml-auto font-semibold">8.7</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                </div>
                                <span className="text-gray-600">Malaysia</span>
                                <span className="ml-auto font-semibold">8.2</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                </div>
                                <span className="text-gray-600">Russia</span>
                                <span className="ml-auto font-semibold">8.2</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                </div>
                                <span className="text-gray-600">Canada</span>
                                <span className="ml-auto font-semibold">8.1</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                </div>
                                <span className="text-gray-600">India</span>
                                <span className="ml-auto font-semibold">7.9</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                </div>
                                <span className="text-gray-600">Australia</span>
                                <span className="ml-auto font-semibold">7.7</span>
                            </li>
                            </ul>
                        </div>
                        </div>
                        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
                        <div className="px-6 py-5 font-semibold border-b border-gray-100">WHAT ARE YOUR TOP CAMPAIGNS?</div>
                        <div className="p-4 flex-grow">
                            <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
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