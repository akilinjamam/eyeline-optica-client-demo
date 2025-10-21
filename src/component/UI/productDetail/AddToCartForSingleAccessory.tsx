/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddToCartForSingleAccessory = ({cartInfo}: {cartInfo:any}) => {
    const [loading, setLoading] = useState<string>('');

    const router = useRouter();
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const {name, phoneNumber, email, address} = e.target;

        const cartData = {
            customerName: name.value,
            phoneNumber:phoneNumber.value, 
            email: email.value,
            address:address.value,
            items: [
                {   ...cartInfo,
                    submitType:"single Accessory",
                }
            ],
            totalAmount: Number(cartInfo.subtotal),
            deliveryFee: 70,
        }
        setLoading('pending...')
        console.log(cartData)
       try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}cart/create-cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartData),
        });
        

        const data = await res.json();
        console.log(data)
        if(data.success){
            setLoading('');
            window.dispatchEvent(new Event("cartUpdated"));
            localStorage.setItem("token", data?.data?.token)
             router.push("/cart");
        }

       } catch (error) {
        console.log(error)
       }
    }
    return (
        <form onSubmit={handleSubmit} action="">
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
        </form>
        
    );
};

export default AddToCartForSingleAccessory;