import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import '../styles/Home.css'

export const Productos = () => {

  const baseUrl = "http://localhost/phpmyadmin/ApiPhpKonecta/";
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [Producto, setProducto] = useState({
    id: '',
    Nombre: '',
    Referencia: '',
    Precio: 0,
    Peso: 0,
    Categoria: '',
    Stock: 0,
    Fecha: ''
  });

  let date = new Date();
  let output = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getDate()).padStart(2, '0');

  const handleChange = e => {
    const { name, value } = e.target;
    setProducto((prevState) => ({
      ...prevState,
      [name]: value
    }))
    console.log(setProducto);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPost = async () => {
    var f = new FormData();
    const { Nombre, Referencia, Precio, Peso, Categoria, Stock, Fecha } = Producto;
    f.append("Nombre", Nombre);
    f.append("Referencia", Referencia);
    f.append("Precio", Precio);
    f.append("Peso", Peso);
    f.append("Categoria", Categoria);
    f.append("Stock", Stock);
    f.append("Fecha", Fecha);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
      .then(response => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionPut = async () => {
    var f = new FormData();
    const { Nombre, Referencia, Precio, Peso, Categoria, Stock, Fecha } = Producto;
    f.append("Nombre", Nombre);
    f.append("Referencia", Referencia);
    f.append("Precio", Precio);
    f.append("Peso", Peso);
    f.append("Categoria", Categoria);
    f.append("Stock", Stock);
    f.append("Fecha", Fecha);
    await axios.post(baseUrl, f, { params: { id: Producto.id } })
      .then(response => {
        var dataNueva = data;
        dataNueva.map(Prod => {
          if (Prod.id === Producto.id) {
            Prod.Nombre = Nombre;
            Prod.Referencia = Referencia;
            Prod.Precio = Precio;
            Prod.Peso = Peso;
            Prod.Categoria = Categoria;
            Prod.Stock = Stock;
            Prod.Fecha = Fecha;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      }).catch(error => {
        console.log(error);
      })
  }

  const peticionDelete = async () => {
    var f = new FormData();
    f.append("METHOD", "DELETE");
    await axios.post(baseUrl, f, { params: { id: Producto.id } })
      .then(response => {
        setData(data.filter(prod => prod.id !== Producto.id));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
  }

  const seleccionarProducto = (Prod, caso) => {
    setProducto(Prod);

    (caso === "Editar") ?
      abrirCerrarModalEditar() :
      abrirCerrarModalEliminar()
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <br />
      <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
      <br /><br />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Referencia</th>
            <th>Precio</th>
            <th>Peso</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(Prod => (
            <tr key={Prod.id}>
              <td>{Prod.id}</td>
              <td>{Prod.Nombre}</td>
              <td>{Prod.Referencia}</td>
              <td>{Prod.Precio} <strong>COP</strong></td>
              <td>{Prod.Peso} <strong>LB</strong></td>
              <td>{Prod.Categoria}</td>
              <td>{Prod.Stock}</td>
              <td>{Prod.Fecha}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarProducto(Prod, "Editar")}>Editar</button> {"  "}
                <button className="btn btn-danger" onClick={() => seleccionarProducto(Prod, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}


        </tbody>

      </table>


      <Modal isOpen={modalInsertar}>
        <ModalHeader>Insertar Producto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="Nombre" onChange={handleChange} required />
            <br />
            <label>Referencia: </label>
            <br />
            <input type="text" className="form-control" name="Referencia" onChange={handleChange} required />
            <br />
            <label>Precio: </label>
            <br />
            <input type="number" className="form-control" name="Precio" onChange={handleChange} required />
            <br />
            <label>Peso: </label>
            <br />
            <input type="number" className="form-control" name="Peso" onChange={handleChange} required />
            <br />
            <label>Categoria: </label>
            <br />
            <input type="text" className="form-control" name="Categoria" onChange={handleChange} required />
            <br />
            <label>Stock: </label>
            <br />
            <input type="number" className="form-control" name="Stock" onChange={handleChange} required />
            <br />
            <label>Fecha de creación: </label>
            <br />
            <input type="date" className="form-control" name="FechaCreación" value={output} disabled />
          </div>

        </ModalBody>
        <ModalFooter>
          <button type='submit' className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>



      <Modal isOpen={modalEditar} >
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name="Nombre" onChange={handleChange} value={Producto && Producto.Nombre} />
            <br />
            <label>Referencia: </label>
            <br />
            <input type="text" className="form-control" name="Referencia" onChange={handleChange} value={Producto && Producto.Referencia} />
            <br />
            <label>Precio: </label>
            <br />
            <input type="number" className="form-control" name="Precio" onChange={handleChange} value={Producto && Producto.Precio} />
            <br />
            <label>Peso: </label>
            <br />
            <input type="number" className="form-control" name="Peso" onChange={handleChange} value={Producto && Producto.Peso} />
            <br />
            <label>Categoria: </label>
            <br />
            <input type="text" className="form-control" name="Categoria" onChange={handleChange} value={Producto && Producto.Categoria} />
            <br />
            <label>Stock: </label>
            <br />
            <input type="number" className="form-control" name="Stock" onChange={handleChange} value={Producto && Producto.Stock} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar este Producto {Producto && Producto.Nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}