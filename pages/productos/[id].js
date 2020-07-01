import React, { useEffect, useContext,  useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import { css } from '@emotion/core';

import Layout from '../../componets/layouts/Layout';

import Error404 from '../../componets/layouts/404';

import styled from '@emotion/styled';

const ContenedorProducto = styled.div`
	@media(min-width:768px) {
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 2rem;
	}
`

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
			const obtenerProducto = async () => {
				const productoQuery = await firebase.db.collection('productos').doc(id);
				const producto = await productoQuery.get();
				
				if(producto.exists) {
					guardarProducto( producto.data());
				} else {
					 guadarError( true );
				}
			}

			obtenerProducto();
		}
	},[id]);

	if(Object.keys(producto).length === 0) return 'cargando...';

	const { comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos } = producto;

	if(error) return <Error404 />
	return (
			<Layout>
				<>
					{ error &&  <Error404 /> }
					<div className="contenedor">
						<h1
						css= {css`
							text-align: center;
							margin-top: 5rem;
						`}
						>{nombre}</h1>
						<ContenedorProducto>
							<div>
								1
							</div>
							<aside>
								2
							</aside>
						</ContenedorProducto>
					</div>
				</>
			</Layout>
		);	
	
}	
	
export default Producto;