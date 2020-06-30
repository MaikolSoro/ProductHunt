import React, { useEffect, useState, useContext} from 'react';
import Layout  from '../componets/layouts/Layout';
import { FirebaseContext } from '../firebase';

const [productos, guardarProductos] = useState([]);
const { firebase } = useContext(FirebaseContext);

useEffect(() =>{
  const obtenerProductos = ()=> {
    firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
  }
  obtenerProductos();

}, []);

function manejarSnapshot(snapshot) {
  const productos = snapshot.docs.map(doc => {
    return {
      id:doc.id,
      ...doc.data()
    }
  });
  guardarProductos(productos);
}

export default function Home() {
  return (
    <div>
        <Layout>
          <h1>Inicio</h1>
        </Layout>
    </div>
  )
}
