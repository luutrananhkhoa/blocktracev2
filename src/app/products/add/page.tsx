'use client';
import AddForm from "@/app/components/AddForm";
import AddStep from "@/app/components/AddStep";
import Button from "@/app/components/Button";
import Layout from "@/app/components/Layout";
import { redirect } from "next/navigation";
import { FC, useState } from "react";

interface AddProductProps {
    
}
 
const AddProduct: FC<AddProductProps> = () => {
    const [goToProduct, setGoToProduct] = useState(false)
    const [isShowModal, setIsShowModal] = useState(true)

    if(goToProduct){
        return redirect('/products')
    }
    return ( 
        <Layout>
            <div className="w-full p-6">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold">Add Product</h1>
                    <Button title="Cancel" className="btn" onClick={()=>setGoToProduct(true)}/>
                </div>
                <div className="w-full min-h-[50vh] mt-10 flex flex-col items-center justify-center">
                    {isShowModal && 
                    <AddStep />}
                        
                    {/* <div>
                        <AddForm process={5}/>
                    </div> */}
                </div>
            </div>
        </Layout>
     );
}
 
export default AddProduct;

