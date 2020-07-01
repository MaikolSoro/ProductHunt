import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Layout from '../../componets/layouts/Layout';

import Error404 from '../../componets/layouts/404';


const Producto = () => {

	// state del componente
	const [producto, guardarProducto] = useState({});
	const [error, guadarError] = useState(false);
	


	//Routing para obtener el id actual
	const router = useRouter();
	const { query: { id }} = router;

	// context de firebase
	const { firebase } = useContext(FirebaseContext);

	useEffect(() =>{
			if(id) {
				console.log('Ya hay in id', id);
			}
			obtenerProducto = async () => {
				const productQuery = await firebase.db.collection('productos').doc(id);
				const producto = await productoQuery.get();
				
				if(producto.exists()) {
					guardarProducto( producto.data());
					console.log('si existe')
				} else {
					 guadarError( true );
					console.log('no existe')
				}
			}

			obtenerProducto();
	},[id]);

	if(error) return <Error404 />
	return (
			<Layout>
				<>
				{ error &&  <Error404 /> }
				</>
				
			</Layout>
		);	
	
}	
	
export default Producto;