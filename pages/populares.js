import React from 'react';
import Layout  from '../componets/layouts/Layout';
import DetallesProducto from '../componets/layouts/DetalleProducto';
import useProductos from '../hooks/useProducto';

const Populares = ()=> {
  
	const { productos } = useProductos('votos');
	return (
		<div>
		  <Layout>
			<div className="listado-productos">
				<div className="contenedor">
				  <ul className="bg-white">
					  {productos.map(producto => (
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
	
	export default Populares
