/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomerHistorySingle from '@/component/CustomerHistorySingle';
import { TData } from '@/ts-definition/types';
import { notFound } from 'next/navigation';
import React from 'react';

async function getSinglePaymentHistory(id: string) {

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}payment-history/get-single-payment-history/${id}`
  );

  if (!response.ok) return null;
  return response.json();
}

type ParamsPromise = Promise<{ id: string }>;

const PaymentHistorySingle = async ({
  params,
}: {
  params: ParamsPromise;
}) => {

    const { id } = await params;
      const payment = (await getSinglePaymentHistory(id)) as TData<any>;
      
      if (!payment?.data) return notFound();
      
      const singlePayment = payment?.data?.data as any;
      console.log(singlePayment?.data)

    return <CustomerHistorySingle item={singlePayment}/>
};

export default PaymentHistorySingle;