import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartItem } from './CartItem'
import axios from 'axios';
import '../styles/Home.css'

export const Home = () => {

  const baseUrl = "http://localhost/phpmyadmin/ApiPhpKonecta/";
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionGet();
  }, [])

  const ButtonDisble = (Bandera) => {

    return Bandera
  }

  const onAdd = (data) => {
    const exist = cartItems.find(x => x.id === data.id);
    if (exist) {
      setCartItems(cartItems.map((x) =>
        x.id === data.id ? { ...exist, qty: exist.qty + 1 } : x
      )
      );

    } else {
      setCartItems([...cartItems, { ...data, qty: 1 }])
    }
  }

  const onRemove = (data) => {
    const exist = cartItems.find((x) => x.id === data.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== data.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === data.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div>
      <div className='Card-Product'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(Prod => (
              <tr key={Prod.id}>
                <td>{Prod.id}</td>
                <td>{Prod.Nombre}</td>
                <td>{Prod.Precio} <strong>COP</strong></td>
                <td>{Prod.Stock}</td>
                <td>
                  <button onClick={() => onAdd(Prod)} className="btn btn-success" disabled={ButtonDisble()} >añadir al carrito</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CartItem onRemove={onRemove} onAdd={onAdd} setCartItems={setCartItems} cartItems={cartItems} ></CartItem>
      </div> 
    </div>
  )
}
