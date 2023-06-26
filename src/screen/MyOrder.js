import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return; // Handle the case when userEmail is not available

        try {
            const response = await fetch('http://localhost:5000/api/myorderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order data');
            }

            const data = await response.json();
            setOrderData(data.orderData.order_data.reverse());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498522271744-cdd435c13f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")', height: '230vh', backgroundSize: 'cover' }}>
            <Navbar />
                <div className="container">
                    {orderData.length > 0 ? (
                        orderData.map((item, index) => {
                            const orderDate = item[0].Order_data;

                            return (
                                <div key={index}>
                                    {orderDate && (
                                        <div className="my-5">
                                            <h4 className="text-center">Order Date: {orderDate}</h4>
                                            <hr />
                                        </div>
                                    )}

                                    <div className="row">
                                        {item.slice(1).map((arrayData) => (
                                            <div key={arrayData.id} className="col-12 col-md-6 col-lg-3">
                                                <div className="card mb-4">
                                                    <img
                                                        src={arrayData.image}
                                                        alt={arrayData.name}
                                                        className="card-img-top"
                                                    />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{arrayData.name}</h5>
                                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                                            <span className="badge bg-secondary">
                                                                Quantity: {arrayData.qty}
                                                            </span>
                                                            <span className="badge bg-success">
                                                                Size: {arrayData.size}
                                                            </span>
                                                            <span className="badge bg-info">
                                                                Price: ₹{arrayData.price}/-
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center my-5">
                            <h4>No order data available</h4>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
