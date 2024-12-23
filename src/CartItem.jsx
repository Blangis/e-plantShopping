import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ CartItems, onRemoveFromCart, onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach(item => {
      const unitaryPrice = item.cost ? parseFloat(item.cost.replace(/[^0-9.-]+/g, "")) : 0;

        totalCost += item.quantity * unitaryPrice;
    });
    return totalCost.toFixed(2); // Aseguramos que el total tenga dos decimales
};



  const handleContinueShopping = (e) => {
    //e.preventDefault();
    onContinueShopping();
   
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
    dispatch(updateTotal()); // Actualizar el total después de incrementar la cantidad
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
        handleRemove(item); // Elimina el artículo si la cantidad llega a 1
    }
    dispatch(updateTotal());
};

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    dispatch(updateTotal()); // Actualizar el total después de eliminar el producto
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
   //Calculate the total for article
    const unitaryPrice = parseFloat(item.cost.replace(/[$,]/g, ''));
    return item.quantity*unitaryPrice;
  
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


