'use client';
import { FC, useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useRouter } from 'next/navigation';
import {getBatchContract as getBatchContract} from "../contracts/batchContract";
import Link from "next/link";

interface ProductsProps {
    
}

interface TableProductProps {
    products: TableProductType[];
}

interface TableProductType {
    id: number,
    productName: string,
    category: string,
    stepNumber: number,
    userRole: string | null
    
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
    usertype : string,
    teamid : string
}
const Products: FC<ProductsProps> = () => {
    const router = useRouter()
    const [listProduct, setListProduct] = useState<TableProductType[]>([])
    const [dataUser, SetDataUser] = useState<User>({
        dateofbirth: '',
        useraddress: '',
        usercccd: '',
        useremail: '',
        userid: '',
        username: '',
        userole: '',
        userphone: '',
        usertype: '',
        teamid: ''
    })
    const [listProductFilter, setListProductFilter] = useState<TableProductType[]>(listProduct)

    const filterProductsByKeyword = (keyword: string): TableProductType[] => {
        const filteredProducts = listProduct.filter((product) => {
            return (
                product.productName.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        return filteredProducts;
    }

    const onChangeFilter =  (keywordFilter: string) =>{
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
        const storedData = localStorage.getItem('user_data');
        let userType = ''
        let userTeamId = ''
        let userId = ''
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            userType = parsedData.usertype 
            userTeamId = parsedData.teamid 
            userId = parsedData.userid 
            SetDataUser(parsedData)
        }

        getBatchContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            await contract.methods.getAllBatch().call({
              from: accounts[0]
            })
            .then(async(response : any)=>{
                let arrayList : TableProductType[] = []; 
                await response.map((product : any)=>{
                    if(userType.includes('Team')){
                        if(product.teamId.toString() === userTeamId.toString()){
                            let item = {
                                id: Number(product["batchId"]),
                                productName: product["batchName"],
                                category: product["categories"],
                                stepNumber: Number(product["numOfProcess"]),
                                userRole: dataUser.userole
                            }
                            arrayList.push(item)
                        }
                    }else if(userType.includes('Personal')){
                        if(product.userId.toString() === userId){
                            let item = {
                                id: Number(product["batchId"]),
                                productName: product["batchName"],
                                category: product["categories"],
                                stepNumber: Number(product["numOfProcess"]),
                                userRole: dataUser.userole
                            }
                            arrayList.push(item)
                        }
                    }
                   
                })
                setListProduct(arrayList)
                setListProductFilter(arrayList)
            
            })
            .catch((err : any)=>{console.log(err);})
        })  
       
      },[])
    return ( 
        <Layout>
             <div className="p-6">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Product</h1>
                    {(dataUser.userole === '0' || dataUser.usertype === 'Personal') &&
                        <Button title="Create" className="btn" onClick={() => router.push('/products/add')}/>
                    }
                </div>
                <div className="mt-10">
                    <div className="w-full px-6 py-5 flex items-center border-[1px] rounded-lg bg-white mb-10  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h- mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type="text" className="text-xl border-0 flex-1 outline-none" placeholder="Search" onChange={e=>onChangeFilter(e.target.value)} />
                    </div>
                    <div>
                        <TableProduct products={listProductFilter} />
                    </div>
                </div>
                <span id="noProductFilter" className="w-full flex justify-center mt-10"></span>
            </div>
        </Layout>
     );
}
 
export default Products;

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
              Number of processes
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
                            <div className="text-lg text-gray-500">
                            {prd.category}
                            </div>
                            <div className="text-lg font-medium text-gray-900">
                            {prd.productName}
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{prd.stepNumber} steps</div>
                    </td>
                    <td className="flex gap-4 px-6 py-4">
                        {prd.userRole === '0'? <></>:<Link href={`/products/${prd.id}/${prd.stepNumber}`} className="text-lg px-10 py-4 rounded-lg text-white font-semibold bg-[#726BDF] cursor-pointer">Edit</Link>}
                        <Link href={`/batchdetails/${prd.id}`} className="text-lg px-10 py-4 rounded-lg text-white font-semibold bg-[#22252D] cursor-pointer">View</Link>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    );
  };