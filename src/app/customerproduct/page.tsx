'use client';
import { FC, useEffect, useState } from "react";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import {getUserContract as getUserContract} from "../contracts/userContract";
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import SidebarCustomer from "../components/SidebarCustomer";
import { getBatchContract } from "../contracts/batchContract";

interface CustomerProductProps {
    
}
interface TableProductProps {
  products: TableProductType[];
}

interface TableProductType {
  id: number,
  productName: string,
  ownerName: string,
  dateTime: string,
}

const CustomerProduct: FC<CustomerProductProps> = () => {
    const router = useRouter()
    const [listUsers, setListUsers] = useState([])
    const [addressWallet, setAddressWallet] = useState<string>('')
    const [codeValue, setCodeValue] = useState<string>('')
    const [gmailvalue, setGmailValue] = useState<string>('')
    const [listProductsCustomer, setListProductsCustomer] = useState([])
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [listProduct, setListProduct] = useState<TableProductType[]>([])

    const onHandleConnect = async ()=>{
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if(accounts){
         //  console.log(accounts[0])
          setAddressWallet(accounts[0])
          let meta = document.getElementById('addressMetamask') as HTMLInputElement
          if(meta){
              meta.value = accounts[0]
          }
      }
    }

    const onCheck = () =>{
      let flag = false
      listProductsCustomer.map((listProductsCustomer)=>{
        if(listProductsCustomer["batchId"] === codeValue){
          flag = true
        }
      })
      if(flag){
        toast.success("Product is available")
      }else{
        toast.error("Product is not available")
      }
    }

    const [listProductFilter, setListProductFilter] = useState<TableProductType[]>(listProduct)

    function filterProductsByKeyword(keyword: string): TableProductType[] {
        const filteredProducts = listProduct.filter((product) => {
            return (
                product.productName.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        
        return filteredProducts;
    }

    const onChangeFilter = (keywordFilter: string) =>{
        const arrayFilter = filterProductsByKeyword(keywordFilter)
        const element = document.querySelector('#noProductFilter') as HTMLDivElement;
        if(arrayFilter.length === 0){
            setListProductFilter([])
            if (element) {
                element.innerText = 'No products found matching your search criteria.';
            }
        }else{
            setListProductFilter(arrayFilter);
            if (element) {
                element.innerText = '';
            }
        }
    }

   useEffect(()=>{
      
    getUserContract().then(async (contract) =>  {
      const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
      });
      contract.methods.getAllOwner().call({
        from: accounts[0]
      })
      .then((response : any)=>{
          console.log('List owner:', response)
          let arrayList : TableProductType[] = []; 
          response.map((product : any)=>{
            let item = {
              id: Number(product["batchId"]),
              productName: product["productName"],
              ownerName: product["ownerName"],
              dateTime: product["dateTime"],
            }
            arrayList.push(item)
          })
          setListProduct(arrayList)
          setListProductFilter(arrayList)
      })
      .catch((err : any)=>{console.log(err);})
    })  

    // getUserContract().then(async (contract) =>  {
    //   const accounts = await window.ethereum.request({
    //       method: "eth_requestAccounts",
    //   });
    //   contract.methods.getAllOwner().call({
    //     from: accounts[0]
    //   })
    //   .then((response : any)=>{
    //       console.log('List owner:', response)
    //       // setListProducts(response)
    //   })
    //   .catch((err : any)=>{console.log(err);})
    // }) 

   },[])
    return ( 
        <div className="min-h-screen flex">
            <SidebarCustomer />
            <div className=" w-full min-h-screen bg-[#f8f8fa]">
              <Toaster />
                <div className="w-full p-10 bg-white">
                  <h1 className="text-4xl font-bold">Product</h1>
                </div>
                <div className="bg-[#f8f8fa] p-10">
                  <div className="flex items-center justify-between">
                    <div className="px-6 py-5 flex items-center border-[1px] rounded-xl bg-[#FDFDFD] w-[30%] ">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h- mr-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                      </svg>
                      <input type="text" className="text-xl border-0 flex-1 outline-none" placeholder="Search" onChange={e=>onChangeFilter(e.target.value)}/>
                    </div>
                    <Link href={'/customerproduct/add'} className="btn flex items-center gap-4 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/></svg>
                      Add Product   
                    </Link>
                  </div>
                  <div className="mt-10">
                        <TableProduct products={listProductFilter} />
                  </div>
                  <span id="noProductFilter" className="w-full flex justify-center mt-10"></span>
                </div>
                {/* <div className="p-10 w-[30%] h-[35vh] mt-10 bg-[#3F2A8C] rounded-2xl flex flex-col items-center justify-center">
                  <p className="text-xl font-bold text-white">Add new product</p>
                  <div className="mt-10">
                    <div className="flex bg-white p-2 rounded-full">
                      <input type="text" className="p-4 rounded-l-full outline-none border-0" onChange={(e)=>setCodeValue(e.target.value)} placeholder="Enter code"/>
                      <div className="px-8 py-4 bg-[#7FEEC4] rounded-r-full font-bold text-[#3F2A8C] cursor-pointer"onClick={onCheck}>Check</div>
                    </div>
                  </div>

                </div> */}
            </div>
        </div>
     );
}
 
export default CustomerProduct;

const TableProduct: FC<TableProductProps>  = ({ products }) => {
  const router = useRouter()
  return (
    <table className="min-w-full divide-y shadow-md divide-gray-200 text-lg">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            Id
          </th>
          <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            Product Name
          </th>
          <th scope="col" className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
          {products.map((prd)=>{
              return <tr key={prd.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg text-gray-900">{prd.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                          <div className="text-lg font-medium text-gray-900">
                          {prd.productName}
                          </div>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg text-gray-900">{prd.dateTime}</div>
                  </td>
                  <td className="flex gap-4 px-6 py-4">
                      <Link href={`/batchdetails/${prd.id}`} className="text-lg px-10 py-4 rounded-xl text-white font-semibold bg-green-400 cursor-pointer">View</Link>
                  </td>
              </tr>
          })}
      </tbody>
    </table>
  );
};