import { FC } from "react";

interface HeaderProps {
    
}
 
const Header: FC<HeaderProps> = () => {
    return ( 
        <div className="w-full">
            <div>
                <p>Admin</p>
                <p>admin@admin.com</p>
            </div>
        </div>
     );
}
 
export default Header;