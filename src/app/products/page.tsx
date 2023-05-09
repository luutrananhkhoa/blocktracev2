'use client';
import { FC, useEffect, useState } from "react";
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
    stepNumber: number
}
const Products: FC<ProductsProps> = () => {
    const router = useRouter()
    const Listproducts : TableProductType[] = [
        { id: 1, productName: 'Product A', category: 'Category 1', stepNumber: 3 },
        { id: 2, productName: 'Product B', category: 'Category 2', stepNumber: 2 },
        { id: 3, productName: 'Product C', category: 'Category 1', stepNumber: 1 },
        { id: 4, productName: 'Product D', category: 'Category 3', stepNumber: 4 },
      ];
    const [listProduct, setListProduct] = useState<TableProductType[]>([])
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
         getBatchContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            contract.methods.getAllBatch().call({
              from: accounts[0]
            })
            .then((response : any)=>{
                console.log('List product:', response)
                let arrayList : TableProductType[] = [];
                response.map((product : any)=>{
                    let item = {
                        id: Number(product["batchId"]),
                        productName: product["batchName"],
                        category: product["categories"],
                        stepNumber: Number(product["numOfProcess"])
                    }
                    arrayList.push(item)
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
                    <Button title="Create" className="btn-red" onClick={() => router.push('/products/add')}/>
                </div>
                <div className="mt-10">
                    <div className="w-full px-6 py-5 flex items-center border-[1px] rounded-full bg-white mb-10  ">
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
                            <div className="text-lg font-medium text-gray-900">
                            {prd.category}
                            </div>
                            <div className="text-lg text-gray-500">
                            {prd.productName}
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg text-gray-900">{prd.stepNumber} steps</div>
                    </td>
                    <td className="flex gap-4 px-6 py-4">
                        <Link href={`/products/${prd.id}/${prd.stepNumber}`} className="text-lg px-10 py-4 rounded-full text-white font-semibold bg-[#FFD237] cursor-pointer">Edit</Link>
                        <Link href={`/batchdetails/${prd.id}`} className="text-lg px-10 py-4 rounded-full text-white font-semibold bg-green-400 cursor-pointer">View</Link>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    );
  };