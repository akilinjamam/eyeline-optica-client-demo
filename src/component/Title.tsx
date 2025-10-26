import React from 'react';

const Title: React.FC<{ value: string }> = ({ value }) => {
  return (
    <div className="w-[90%] flex items-center gap-4 mx-auto px-2">
      <hr className="flex-grow border-t border-gray-300" />
      <p className="whitespace-nowrap text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-center text-black">
        {value}
      </p>
      <hr className="flex-grow border-t border-gray-300" />
    </div>
  );
};

export default Title;
