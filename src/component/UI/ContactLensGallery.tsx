import ContactLensCardAuto from './ContactLensCardAuto';
import { TContactLens, } from '@/ts-definition/types';

const ContactLensGallery = ({data}: {data:TContactLens[]}) => {

    return (
        <div className=' w-full'>
            <div className='w-full bg-gray-200 py-2 px-3 flex items-center justify-end' >
                <div className='flex items-center justify-between w-auto '>
                    <label htmlFor="" className='text-blue-500 mx-2'>SORT BY:</label>
                    <select name="" id="" className='border border-black'>
                        <option value="hello">Best Sellers</option>
                        <option value="hello">hello</option>
                        <option value="hello">hello</option>
                    </select>
                </div>
            </div>
            <section className='w-full p-2 flex items-center justify-center '>
                <div className='flex gap-2 flex-wrap w-[70%] md:w-full lg:w-full '>
                    {
                        data?.map(({color, name, brand, salesPrice, images, _id }: TContactLens, index: number) => <ContactLensCardAuto color={color} images={images}  salesPrice={salesPrice} name={name} brand={brand} _id={_id} key={index}/> )
                    }
                </div>
            </section>
        </div>
    );
};

export default ContactLensGallery;