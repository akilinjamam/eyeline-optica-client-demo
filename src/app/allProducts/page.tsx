import Footer from "@/component/Footer";
import TopFooter from "@/component/TopFooter";
import ProductGallery from "@/component/UI/ProductGallery";
import Sidebar from "@/component/UI/Sidebar";
import { FC } from "react";


const AllProducts:FC = () => {
    return (
        <div className="w-full bg-blue-50 relative">
            <div className="w-full mx-auto flex items-start">
                <Sidebar/>
                <ProductGallery/>
            </div>
            <TopFooter/>
            <Footer/>
        </div>
    );
};

export default AllProducts;