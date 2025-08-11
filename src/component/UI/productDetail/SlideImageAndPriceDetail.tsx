import { GlassCardProps } from '@/ts-definition/interfaces';
import Image from 'next/image';
import Accordion from '../Accordion';
import { eyeglass } from './accordionData';

const SlideImageAndPriceDetail = ({product}: {product:GlassCardProps}) => {
    return (
        <div className="p-2 h-[90vh] overflow-y-scroll">
            <div className="w-full h-[200px]  mx-auto flex items-center justify-between">
                <div className="w-[40%] h-full bg-gray-200 flex items-center justify-center">
                    <Image src={product.image} alt="single-img" />
                </div>
                <div className="w-[60%] h-[200px] p-1">
                    <div className="flex justify-between font-bold">
                        <label htmlFor="">Price</label>
                        <p>{product.price}</p>
                    </div>
                    <br />
                    <hr />
                <div className="flex justify-between font-bold">
                        <label htmlFor="">Total:</label>
                        <p>{product.price}</p>
                    </div>
                </div>
            </div>

            {/* Your lens selection content goes here */}
            <div className="">
                <Accordion item={eyeglass}/>
            </div>
        </div>
    );
};

export default SlideImageAndPriceDetail;