import React, { useEffect, useState } from 'react'
import Layout from '../componets/layouts/Layout';
import { useRouter } from 'next/router';
import DetallesProducto from '../componets/layouts/DetalleProducto';
import useProductos from '../hooks/useProducto';

const Buscar = () => {

  const router = useRouter();
  const { query: { q }} = router;

  // Todos los productos
  const { productos } = useProductos('creado');
  const [ resultado, guardarResultado ] = useState([]);

  useEffect(() => {
      const busqueda = q.toLowerCase();
      const filtro =  productos.filter(producto => {
        return (
          producto.nombre.toLowerCase().includes(busqueda) || 
          producto.descripcion.toLowerCase().includes(busqueda)
        )
      });
      guardarResultado(filtro);
      
  }, [ q, productos ]);


  return (
    <div>
      <Layout>
        <div className="listado-productos">
            <div className="contenedor">
              <ul className="bg-white">
                  {resultado.map(producto => (
                      <DetallesProducto
                          key={producto.id}
                          producto={producto}
                      />
                  ))}
              </ul>
            </div>
        </div>
      </Layout>
    </div>
  )
}

export default Buscar