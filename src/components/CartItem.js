import React from 'react'
import '../styles/Cart.css';
export const CartItem = (props) => {

  const { cartItems, onAdd, onRemove } = props;
  const itemsPrecio = cartItems.reduce((a, c) => a + c.qty * c.Precio, 0);

  const baseUrl = "http://localhost/phpmyadmin/ApiPhpKonecta/";

  // const peticionPostVentas = async () => {
  //   if(cartItems === undefined) {return}
  //   var f = new FormData();
  //   const { id, qty } = cartItems;
  //   f.append("id", id);
  //   f.append("qty", qty);
  //   f.append("METHOD", "POSTVENTAS");
  //   await axios.post(baseUrl, f)
  //     .then(response => {
  //       setCartItems(cartItems.concat(response.cartItems));
  //     }).catch(error => {
  //       console.log(error);
  //     })
  // }

  return (
    <aside className='CartItem'>
      <h2><i className="cart fa-solid fa-cart-shopping"></i>  Cart Items ( {cartItems.length} )</h2>
      <div>{cartItems.length === 0 && <div>Cart is empty</div>}</div>
      {cartItems.map((item) => (
        <div key={item.id} className="row">
          <div>{item.Nombre}</div>
          <div>
            <button onClick={() => onAdd(item)} className="btnAdd">
              +
            </button>
            <button onClick={() => onRemove(item)} className="btnRemove">
              -
            </button>
          </div>
          <div>
            {item.qty} x {item.Precio} <strong>COP</strong>
          </div>
        </div>
      ))}
      {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">{itemsPrecio}COP </div>
            </div>
            <div className="row">
              {/*onClick={() => peticionPostVentas()} */}
               <button className='btn btn-success'> 
                 Comprar
              </button> 
            </div>
          </>
        )}
    </aside>
  )
}
