import React, { useEffect, useState } from 'react';
import OrderCard from './order-card';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '@/app/store/order-history/slice';
import { fetchOrders } from '@/app/service/orders';
import { Product } from '@/app/model/product';
import { fetchProducts } from '@/app/service/products';

const Dashboard = () => {
  
  const dispatch = useDispatch();

  const token = useSelector((state: any) => {
    return state.token.token;
  });

  const orders = useSelector((state: any) => {
    return state.orderHistory?.orders;
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const retrieveProducts = () => {
      try {
        fetchProducts(setProducts);
      } catch (error) {
        // Handle error
      }
    };
    retrieveProducts();
  }, []);


  useEffect(() => {
    const retrieveOrders = () => {
      try {
        fetchOrders(token, (data: any) => {dispatch(setOrders(data))});
      } catch (error) {
        // Handle error
      }
    };
    retrieveOrders();
  }, []);




  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
        {orders?.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} products= {products}/>)
        ) : (
          <p>No orders found.</p>
        )}
      </div>

    </div>
  );
};

export default Dashboard;