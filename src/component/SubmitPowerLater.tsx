import { useState } from "react";


const SubmitPowerLater = () => {
    const [loading, setLoaiding] = useState<string>('')
    console.log(setLoaiding)
    return (
        <div className="px-2">
            <div>
                    
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="text"
                        name="name"
                        id=""
                        placeholder="YOUR NAME"
                    />
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="text"
                        name="email"
                        id=""
                        placeholder="Email"
                    />
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="number"
                        name="phoneNumber"
                        id=""
                        placeholder="Phone Number *"
                        onWheel={(e) => e.currentTarget.blur()}
                    />
                    <br /><br />
                    <textarea
                        className="w-full rounded-md p-4 border border-gray-400"
                        name="address"
                        id=""
                        placeholder="Address *"
                    />
                </div>
                <br />
                <div className="flex items-center justify-center w-full h-[20px]">
                    {
                        loading !== 'pending...'
                        ?
                        <button  type='submit' className="bg-blue-900 rounded-3xl px-4 py-2 text-white font-bold cursor-pointer">
                            Save & Add to Cart
                        </button>
                        :
                        <button disabled className="bg-blue-500 rounded-3xl px-4 py-2 text-white font-bold cursor-not-allowed">
                            Please Wait...
                        </button>
                    }
                </div>
        </div>
        
    );
};

export default SubmitPowerLater;