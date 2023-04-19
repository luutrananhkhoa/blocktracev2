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
             <div>
                <Button title="Add" onClick={() => router.push('/products/stepone')}/>
            </div>
        </Layout>
     );
}
 
export default Products;