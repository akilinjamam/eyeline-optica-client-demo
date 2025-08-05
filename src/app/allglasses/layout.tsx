import Footer from '@/component/Footer';
import TopFooter from '@/component/TopFooter';
import Sidebar from '@/component/UI/Sidebar';
import React, { ReactNode } from 'react';

const Sunglasses = ({children}: {children:ReactNode}) => {
     return (
        <div className="w-full bg-blue-50 relative">
            <div className="w-full mx-auto flex items-start">
                <Sidebar/>
                {children}
            </div>
            <TopFooter/>
            <Footer/>
        </div>
    );
};

export default Sunglasses;