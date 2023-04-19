'use client';
import Button from "@/app/components/Button";
import Layout from "@/app/components/Layout";
import { redirect } from "next/navigation";
import { FC, useState } from "react";

interface StepOneProps {
    
}
 
const StepOne: FC<StepOneProps> = () => {
    const [goToProduct, setGoToProduct] = useState(false)

    if(goToProduct){
        return redirect('/products')
    }
    return ( 
        <Layout>
            <div>
                <Button title="Back to product" onClick={()=>setGoToProduct(true)}/>
            </div>
        </Layout>
     );
}
 
export default StepOne;