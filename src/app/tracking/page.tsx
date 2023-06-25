'use client';
import { FC, useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useRouter } from 'next/navigation';
import {getBatchContract as getBatchContract} from "../contracts/batchContract";
import Link from "next/link";
import { getProcessingContract } from "../contracts/processingContract";
import { MultiStep } from "../components/AddStep";
import Image from "next/image";

interface ProductsProps {
    
}

interface LocationProps {
    batchId: number,
}

interface TableProductProps {
    products: TableProductType[];
    setIsShowLocation:  ( boolean: boolean ) => void;
    setIsValueBatch:  ( id: number ) => void;
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

interface DataStep {
    productName: string,
    batchId: string,
    userName: string,
    location: string,
    date: string,
    categories: string
}


const Tracking: FC<ProductsProps> = () => {
    const router = useRouter()
    const [listProduct, setListProduct] = useState<TableProductType[]>([])
    const [isShowLocation, setIsShowLocation] = useState(false)
    const [isValueBatch, setIsValueBatch] = useState(0)
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
        const storedData = localStorage.getItem('user_data');
        let userType = ''
        let userTeamId = ''
        let userId = ''
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            console.log('user: ', parsedData)
            userType = parsedData.usertype 
            userTeamId = parsedData.teamid 
            userId = parsedData.userid 
            SetDataUser(parsedData)
        }

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
                    if(userType.includes('Team')){
                        console.log('Team')
                        if(product.teamId.toString() === userTeamId){
                            console.log('Save Team')
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
                            console.log('Save Personal')
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
                console.log('arrayList', arrayList)
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
                    <h1 className="text-4xl font-bold">Product Tracking</h1>
                    {isShowLocation && <div className="btn-yellow" onClick={()=>setIsShowLocation(false)}>Cancel</div>}
                </div>
                <div className="mt-10">
                    <div className="w-full px-6 py-5 flex items-center border-[1px] rounded-lg bg-white mb-10  ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h- mr-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <input type="text" className="text-xl border-0 flex-1 outline-none" placeholder="Search" onChange={e=>onChangeFilter(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-center">
                    {isShowLocation?
                        <Location batchId={isValueBatch} />
                        :
                        <TableProduct products={listProductFilter} setIsShowLocation={setIsShowLocation} setIsValueBatch={setIsValueBatch}/>
                    }
                    </div>
                </div>
                <span id="noProductFilter" className="w-full flex justify-center mt-10"></span>
            </div>
        </Layout>
     );
}
 
export default Tracking;

const TableProduct: FC<TableProductProps>  = ({ products, setIsShowLocation, setIsValueBatch }) => {
    const router = useRouter()
    const handleClickTracking = ( id :number) => {
        setIsShowLocation(true)
        setIsValueBatch(id)
    }
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
                        <div onClick={()=>handleClickTracking(prd.id)} className="text-lg px-10 py-4 rounded-lg text-white font-semibold bg-[#726BDF] cursor-pointer">Track</div>
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    );
};

const Location: FC<LocationProps> = ({batchId}) =>{
    
    const [productData, setProductData] = useState<TableProductType>({
        id: 0,
        productName: '',
        category: '',
        stepNumber: 0,
        userRole: ''
    })
    const [productDataLastStep, setProductDataLastStep] = useState<DataStep>({
        productName: '',
        batchId: '',
        userName: '',
        location: '',
        date: '',
        categories: ''
    })
    const [stopNumber, setStopNumber] = useState(0)

    useEffect( ()=>{
        let stepNumber = 0
        getBatchContract().then(async (contract) =>  {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            contract.methods.getAllBatch().call({
              from: accounts[0]
            })
            .then(async(response : any)=>{
                await response.map((product : any)=>{
                    if(Number(product["batchId"]) === batchId){
                        console.log('Product OK:', product)
                        let item = {
                            id: product["batchId"],
                            productName: product["batchName"],
                            category: product["categories"],
                            stepNumber: product["numOfProcess"],
                            userRole: ''
                        }
                        stepNumber = Number(product["numOfProcess"])
                        setProductData(item)
                        console.log('stepNumber', stepNumber)
                    }
                })

                const arrayShow : any = []

                for (let stepNumberId = 0; stepNumberId < stepNumber; stepNumberId++) {
                    await getProcessingContract().then( async (contract) => {
                        const addStepFunction = await stepNumberId === 0 ? contract.methods.getAllStep1 :
                                                stepNumberId === 1 ? contract.methods.getAllStep2 :
                                                stepNumberId === 2 ? contract.methods.getAllStep3 :
                                                stepNumberId === 3 ? contract.methods.getAllStep4 :
                                                stepNumberId === 4 ? contract.methods.getAllStep5 :
                                                stepNumberId === 5 ? contract.methods.getAllStep6 :
                                                stepNumberId === 6 ? contract.methods.getAllStep7 :
                                                stepNumberId === 7 ? contract.methods.getAllStep8 :
                                                null;
    
                        if (addStepFunction) {
                            await getProcessingContract().then( async (contract) =>{
                                const accounts = await window.ethereum.request({
                                    method: "eth_requestAccounts",
                                });
                                await addStepFunction().call({
                                    from: accounts[0]
                                })
                                .then((response : any)=>{
                                    console.log('1111', stepNumberId)
                                    const filteredArr = response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                                    
                                    console.log('22222', filteredArr)

                                    const filteredArrFinal = filteredArr[0]

                                    if(filteredArrFinal && filteredArrFinal.length > 0){
                                        arrayShow.push(true)
                                    }else{
                                        arrayShow.push(false)
                                    }
                                })
                                .catch((err : any)=>{console.log(err);})
                            })
                        }   
                    });
                }

                let stopNumber = 0;
                arrayShow.forEach((item:any, index:number)=>{
                    if(item){
                        stopNumber++
                    }
                })

                console.log('3333333')
                console.log('stopNumber', stopNumber)
                console.log('arrayShow.length', arrayShow)
                console.log('arrayShow.length', arrayShow.length)

                setStopNumber(stopNumber)
                
                if(stopNumber!==0){
                    getProcessingContract().then(async (contract) =>{
                        const addStepFinal =
                        stopNumber === 1 ? contract.methods.getAllStep1 :
                        stopNumber === 2 ? contract.methods.getAllStep2 :
                        stopNumber === 3 ? contract.methods.getAllStep3 :
                        stopNumber === 4 ? contract.methods.getAllStep4 :
                        stopNumber === 5 ? contract.methods.getAllStep5 :
                        stopNumber === 6 ? contract.methods.getAllStep6 :
                        stopNumber === 7 ? contract.methods.getAllStep7 :
                        stopNumber === 8 ? contract.methods.getAllStep8 :
                        null;
                        const accounts = await window.ethereum.request({
                            method: "eth_requestAccounts",
                        });

                        addStepFinal().call({
                            from: accounts[0]
                        })
                        .then(async(response : any)=>{
                            const filteredArr = await response.filter((obj : any) => Number(obj["batchId"]) === Number(batchId));
                            const filteredArrFinal = filteredArr[0]
                            if(filteredArrFinal && filteredArrFinal.length > 0){
                                let item = {
                                    productName: filteredArrFinal["productName"],
                                    batchId: filteredArrFinal["batchId"],
                                    userName: filteredArrFinal["userName"],
                                    location: filteredArrFinal["location"],
                                    date: filteredArrFinal["date"],
                                    categories: filteredArrFinal["categories"]
                                }
                                console.log('productDataLastStep Final', item)
                                setProductDataLastStep(item)
                            }
                        })
                        .catch((err : any)=>{console.log(err);})
                    })
                }   
                
            })
            .catch((err : any)=>{console.log(err);})

        })

        
    }, [])

    return (
        <div className="w-[50%] flex flex-col items-center gap-4 bg-white shadow-md h-[60vh] text-lg p-10">
            <Image src="/NewLogo.png" className="w-[10%] mb-2" width="640" height="480" alt="Logo" />
            <Image src="/logoLocation.png" className="w-[20%] mb-6" width="640" height="480" alt="Logo" />
            <MultiStep stepNumber={productData.stepNumber} />
            {stopNumber === 0 ? 
            <>
                <h1 className="font-semibold text-4xl text-[#22252D]">There are no records for this product</h1>
            </> 
            :
            <div className="w-full flex mt-6">
                <div className="flex-1">
                    <div className="flex flex-col gap-2 items-center">
                        <p className="font-semibold text-gray-500 text-xl">Import Date </p>
                        <h1 className="font-semibold text-5xl text-[#726BDF]">{productDataLastStep.date}</h1>
                    </div>
                </div>
                <div className="flex-1 flex flex-col ml-10 gap-6 text-2xl">
                    <div className="flex gap-2">
                        <p className="font-semibold">Import Place: </p>
                        <h1 className="text-[#fec652] font-bold">{productDataLastStep.location}</h1>
                    </div>
                    <div className="flex gap-2">
                        <p className="font-semibold">Product Name: </p>
                        <h1>{productDataLastStep.productName}</h1>
                    </div>
                    <div className="flex gap-2">
                        <p className="font-semibold">Importer: </p>
                        <h1>{productDataLastStep.userName}</h1>
                    </div>
                    {Number(productData.stepNumber) === Number(stopNumber)? 
                     <div className="flex gap-2">
                        <p className="font-semibold text-[#fec652]">Complete</p>
                    </div>
                    :
                    <div className="flex gap-2">
                        <p className="font-semibold">Currently Step: </p>
                        <h1>{stopNumber}</h1>
                    </div>}
                </div>
            </div>}        
        </div>
    )
  }