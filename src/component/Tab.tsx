import {FC} from 'react';

const Tab:FC = () => {
    const elements = [
        {id: 1, name: 'EYEGLASSES'},
        {id: 2, name: 'SUNGLASSES'},
        {id: 3, name: 'LENSES'},
        {id: 4, name: 'CONTACT LENSES'},
        {id: 5, name: 'BRAND'},
        {id: 6, name: 'TELEMEDICINE SERVICE'},
        {id: 7, name: 'PATIENT CARE'},
        {id: 8, name: 'ACCESSORIES'},
        {id: 9, name: 'ABOUT US'}
    ]
    return (
        <div className='w-full px-6 py-4 bg-blue-50'>
            <div className='max-w-7xl mx-auto flex items-center justify-between gap-2'>
                {
                elements.map((element) => (
                    <button
                        key={element.id}
                        className='px-4 py-2 text-[14px] font-semibold hover:bg-blue-200 rounded-md transition'
                    >
                        {element.name}
                    </button>
                ))
                }
            </div>
        </div>
    );
};

export default Tab;