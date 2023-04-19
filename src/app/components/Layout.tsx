import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar/Sidebar";

interface LayoutProps {
    children: ReactNode
}
 
const Layout: FC<LayoutProps> = ({children}) => {
    return ( 
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="p-10 bg-[#F7F7F7] text-black flex-grow">
                {children}
            </div>
        </div>
     );
}
 
export default Layout;