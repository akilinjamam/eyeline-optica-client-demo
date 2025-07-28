import React from 'react';

const Title:React.FC<{value:string}> = ({value}) => {
    return (
        <div  className="w-[90%] flex items-center gap-4 mx-auto">
            <hr className="flex-grow border-t border-gray-300" />
                <p className="whitespace-nowrap text-[36px] font-medium">{value}</p>
            <hr className="flex-grow border-t border-gray-300" />
        </div>
    );
};

export default Title;