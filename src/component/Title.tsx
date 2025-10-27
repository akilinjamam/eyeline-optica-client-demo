import React from 'react';

const Title: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div>
        <div className="w-[90%] lg:flex md:flex hidden items-center gap-4 mx-auto px-2">
          <hr className="flex-grow border-t border-gray-300" />
          <p className="whitespace-nowrap text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center text-black">
            {value}
          </p>
          <hr className="flex-grow border-t border-gray-300" />
      </div>
      <div className='lg:hidden md:hidden block px-5 font-bold text-blue-700 text-xl'>
          {value}
      </div>
    </div>
  );
};

export default Title;
