import React from 'react';

export const PaymentForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <input type="text" placeholder="Wallet Address" className="p-2 border rounded" />
      <button className="bg-emerald-600 text-white p-2 rounded">Submit Payment</button>
    </form>
  );
};
