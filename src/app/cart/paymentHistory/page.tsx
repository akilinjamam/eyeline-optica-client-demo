'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '@/app/cart/page';
import { Loader2, CheckCircle } from 'lucide-react';

interface TAccessoryItems {
    name: string;
    barcode: string;
    brand: string;
    discount: number;
    category: string;
    quantity: number;
    stock: boolean;
    purchasePrice: number;
    salesPrice: number;
    sold: number;
    description: string;
    measurement: string;
}

interface PaymentItem {
  _id: string;
  payableAmount: number;
  quantity: number;
  dueAmount: number;
  deliveryFee: number;
  subtotal: number;
  status: string;
  createdAt: string;
  productId?: { name: string; salesPrice: number };
  lensId?: { name: string; salesPrice: number };
  contactLensId?: { name: string; salesPrice: number };
  accessoryId?: { types: string; items:TAccessoryItems[] };
  dealsDiscount?: number;
  discountOn?:string;
}

const statusFlow = ['Order received', 'processsing', 'packaging', 'on the way', 'delivered'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const statusColors: Record<string, string> = {
  'Order received': 'bg-gray-200 text-gray-700',
  processsing: 'bg-yellow-100 text-yellow-700',
  packaging: 'bg-blue-100 text-blue-700',
  'on the way': 'bg-orange-100 text-orange-700',
  delivered: 'bg-green-100 text-green-700',
};

const CustomerHistory = () => {
  const [history, setHistory] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decoded: JwtPayload = jwtDecode(token);
        const customerId = decoded.customerId;
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}payment-history/get-payment-history/${customerId}`
        );

        if (!res.ok) throw new Error('Failed to fetch history');
        const data = await res.json();
        setHistory(data.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );

  if (!history.length)
    return (
      <div className="text-center text-gray-500 py-20 text-sm">
        No order history found.
      </div>
    );

 

  return (
    <div className='w-full bg-white min-h-[100vh]'>
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        🧾 Your Order History
      </h2>

      <div className="space-y-4">
        {history.map((item) => {
          return (
            <div
              key={item._id}
              className="border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-all"
            >
              <div className="">
                <div>
                  {item?.productId?.name && (
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {item?.productId?.name || 'Unknown Product'}
                    </p>
                  )}
                  {item?.lensId?.name && (
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {item?.lensId?.name || 'Unknown Product'}
                    </p>
                  )}
                  {item?.contactLensId?.name && (
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {item?.contactLensId?.name || 'Unknown Product'}
                    </p>
                  )}
                  {item?.accessoryId && (
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {item?.accessoryId?.items
                        ?.map((value: TAccessoryItems) => value.name)
                        ?.join('+') || 'Unknown Product'}
                    </p>
                  )}
                  <br />
                  <p className="text-xs text-gray-500 flex items-center justify-between">
                    <span>
                      Qty: {item.quantity} × {item.subtotal}
                    </span>
                    <span className="font-medium">
                      ৳{item.subtotal * item.quantity}
                      
                    </span>
                   
                  </p>
                  <p className="text-xs text-gray-500 flex items-center justify-between">
                    <label htmlFor="">Delivery Fee:</label>
                    <span className="font-medium"> ৳{item.deliveryFee}</span>
                  </p>
                  <hr className="my-2" style={{ color: 'gray' }} />
                  <p className="text-xs text-gray-500 flex items-center justify-between">
                    <label htmlFor="">Total: </label>
                    <span className="font-medium">
                      ৳{item.deliveryFee + item.subtotal * item.quantity}
                    </span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Ordered on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                  {item?.discountOn !== "no-discount" && <p className='bg-gray-200 p-1 text-xs text-gray-400 mt-1'>{item?.discountOn} {item?.dealsDiscount}%</p> }
                  <br />
                  <div className="">
                  <p className="text-sm text-blue-600 font-semibold">
                    Paid: ৳{item.payableAmount}
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">
                    Cash On Delivery: ৳{item.dueAmount}
                  </p>
                </div>
                </div>

                
              </div>

            <div className="mt-5 pt-3 border-t border-gray-100">
            {/* For mobile (vertical view) */}
            <div className="flex flex-col gap-4 sm:hidden">
                {statusFlow.map((status, index) => {
                const isActive = statusFlow.indexOf(item.status) >= index;
                return (
                    <div key={status} className="flex items-center gap-3">
                    <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                        }`}
                    >
                        {isActive ? <CheckCircle size={14} /> : <Loader2 size={14} />}
                    </div>
                    <div className="flex-1">
                        <p
                        className={`text-[13px] ${
                            isActive ? 'text-blue-600 font-medium' : 'text-gray-400'
                        }`}
                        >
                        {status}
                        </p>
                        {index < statusFlow.length - 1 && (
                        <div
                            className={`ml-3 border-l-2 h-5 ${
                            isActive ? 'border-blue-500' : 'border-gray-200'
                            }`}
                        ></div>
                        )}
                    </div>
                    </div>
                );
                })}
            </div>

  {/* For tablet & desktop (horizontal view) */}
  <div className="hidden sm:flex flex-wrap items-center justify-between gap-3 sm:gap-4">
    {statusFlow.map((status, index) => {
      const isActive = statusFlow.indexOf(item.status) >= index;
      return (
        <div
          key={status}
          className="flex flex-col items-center flex-1 min-w-[70px] sm:min-w-[100px] text-center"
        >
          <div className="relative flex items-center justify-center w-full">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
              }`}
            >
              {isActive ? <CheckCircle size={14} /> : <Loader2 size={14} />}
            </div>
            {index < statusFlow.length - 1 && (
              <div
                className={`absolute top-1/2 left-[50%] sm:left-[60%] translate-y-[-50%] h-0.5 w-full -z-0 ${
                  isActive ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
          <p
            className={`mt-2 text-[11px] sm:text-xs ${
              isActive ? 'text-blue-600 font-medium' : 'text-gray-400'
            }`}
          >
            {status}
          </p>
        </div>
      );
    })}
  </div>
            </div>


            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
