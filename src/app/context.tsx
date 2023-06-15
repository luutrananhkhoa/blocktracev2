"use client";

import React, {useEffect} from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useRouter, usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

const AppContext = (props: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(()=>{   
    const isLogin = localStorage.getItem('isLogin');

    // If the user is logged in, redirect them to the home page.
    if ((isLogin && isLogin === 'true') || pathname.includes("login")) {
    }else{
      router.push('/login');
    }
  },[])
  return <Provider store={store}>{props.children}</Provider>;
};

export default AppContext;
