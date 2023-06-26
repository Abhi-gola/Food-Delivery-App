import React from 'react';
import trash from "./delete.png";
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3 className="text-white">The Cart is Empty!</h3>
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5000/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="container mt-5">
      <table className="table table-hover">
        <thead>
          <tr className="text-success fs-4">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Option</th>
            <th scope="col">Amount</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <td className="text-white">{index + 1}</td>
              <td className="text-white">{food.name}</td>
              <td className="text-white">{food.qty}</td>
              <td className="text-white">{food.size}</td>
              <td className="text-white">₹{food.price}</td>
              <td>
                <button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                  <img src={trash} alt="delete" style={{ height: '20px' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-white h5">Total Price: ₹{totalPrice}/-</div>
      <div>
        <button className="btn btn-success mt-4" onClick={handleCheckOut}>Check Out</button>
      </div>
    </div>
  );
}
