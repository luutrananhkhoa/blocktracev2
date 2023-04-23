'use client';
import { FC } from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useRouter } from 'next/navigation'
interface ProductsProps {
    
}

const Products: FC<ProductsProps> = () => {
    const router = useRouter()

    return ( 
        <Layout>
             <div className="p-6">
                <div>
                    <h1>Product</h1>
                </div>
                <Button title="Add" className="btn-red" onClick={() => router.push('/products/stepone')}/>
            </div>
        </Layout>
     );
}
 
export default Products;