import React, { useState } from 'react';
import Slider from 'react-slick';

const OrderCard = ({ order, products }) => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const extractFieldFromProduct = (id: number, field) => {
    const product = products.find(elem => elem.id === id);
    if (!product) {
      return null;
    }
    return product[field];
  }

  const toggleDetails = () => setDetailsVisible(!isDetailsVisible);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
        <button
          onClick={toggleDetails}
          className="text-blue-500 hover:text-blue-700"
        >
          {isDetailsVisible ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      <div className="text-gray-700 mb-4">
        <div><span className="font-bold">Date:</span> {order.date}</div>
        <div><span className="font-bold">Total:</span> ${order.total.toFixed(2)}</div>
      </div>
      {isDetailsVisible && (
        <div className="relative">
          {
            order.orderItems.length === 1 && 
            <div key={order.orderItems[0].idProduct} className="p-4">
              <img src={extractFieldFromProduct(order.orderItems[0].idProduct, 'image')} alt={extractFieldFromProduct(order.orderItems[0].idProduct, 'title')} className="w-full h-64 object-contain" />
              <h3 className="text-lg font-semibold">{extractFieldFromProduct(order.orderItems[0].idProduct, 'title')}</h3>
              <p className="text-gray-600">${order.orderItems[0].unitPrice.toFixed(2)}</p>
            </div>
          }
          {
            order.orderItems.length !== 1 && 
            <Slider {...settings}>
              {order.orderItems.map((orderItem: any) => (
                <div key={orderItem.id} className="p-4">
                  <img src={extractFieldFromProduct(orderItem.idProduct, 'image')} alt={extractFieldFromProduct(orderItem.idProduct, 'title')} className="w-full h-64 object-contain" />
                  <h3 className="text-lg font-semibold">{extractFieldFromProduct(orderItem.idProduct, 'title')}</h3>
                  <p className="text-gray-600">${orderItem.unitPrice.toFixed(2)}</p>
                </div>
              ))}
            </Slider>
          }
          
        </div>
      )}
    </div>
  );
};

export default OrderCard;