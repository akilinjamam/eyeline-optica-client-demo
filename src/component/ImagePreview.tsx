import Image, { StaticImageData } from 'next/image';
import {FC} from 'react';
import imageOne from '../../public/images/glass-1.png';
import imageTwo from '../../public/images/glass-2.png';
import imageThree from '../../public/images/glass-3.png';
import imageFour from '../../public/images/glass-4.png';
import imageFive from '../../public/images/glass-5.png';
import imageSix from '../../public/images/glass-6.png';

const ImagePreview:FC = () => {
type Element = {
    id: number;
    name: string;
    image: StaticImageData;
};
    const elements:Element[] = [
        {
            id: 1,
            name: 'Eyeglasses',
            image: imageOne
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: imageTwo
        },
        {
            id: 3,
            name: 'Special Glasses',
            image: imageThree
        },
        {
            id: 4,
            name: 'Contact Lenses',
            image: imageFour
        },
        {
            id: 5,
            name: 'Power Sunglasses', 
            image: imageFive
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: imageSix
        }
        
    ]
    return (
        <div className='w-full px-6 py-4  flex items-center justify-center'>
            {
                elements.map((element:Element) => (
                    <div key={element.id} className=' mb-4 bg-white w-[180px] h-[150px] p-2 mx-4'>
                        <div className='bg-blue-100 h-[110px] flex items-center justify-center'>
                            <Image height={120} width={120} src={element.image} alt="" className='w-[full]  rounded-md mx-auto' />
                        </div>
                        <p className='text-sm font-semibold text-center  text-blue-300 mt-1.5'>{element.name}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default ImagePreview;