import React, { useEffect, useContext,  useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import { css } from '@emotion/core';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import Layout from '../../componets/layouts/Layout';

import Error404 from '../../componets/layouts/404';

import styled from '@emotion/styled';

import { Campo, InputSubmit } from '../../componets/ui/Formulario';

import Boton from '../../componets/ui/Boton';


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
								<p>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} )} </p>
								<img src={urlImagen} />
	                            <p>{descripcion}</p>

								<h2>Agrega tu comentario</h2>
								<form>
								
									<Campo>
										<input  type=""
												name="mensaje"
												
										/>
									</Campo>
									<InputSubmit  
											type="submit"
											value="Agregar Comentario"
									/>
								</form>
								<h2 css={css`
									margin: 2rem 0;
								`}>Comentarios</h2>
								{comentarios.map(comentario => (
									<li>
										<p>{comentario.nombre}</p>
										<p>Escrito por: {comentario.usuarioNombre}</p>
									</li>
								))}
							</div>
							<aside>
								<Boton  
									target="_blank"
									bgColor="true"
									href={url}
								>Visitar URL</Boton>

								<div 
								css={css`
									margin-top: 5rem;
								`}
								>
								<p css={css`
									text-align: center;
								`}>{votos} Votos</p>

								</div>
								<Boton>
									Votar
								</Boton>
							</aside>
						</ContenedorProducto>
					</div>
				</>
			</Layout>
		);	
	
}	
	
export default Producto;