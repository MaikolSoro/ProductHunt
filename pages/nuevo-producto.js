import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Router, { useRouter } from 'next/router';
import Layout  from '../componets/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../componets/ui/Formulario';

import firebase from '../firebase';
import { FirebaseContext } from '../firebase';
// validaciones

import useValidation from '../hooks/useValidation';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
	nombre:  '',
	empresa:   '',
	// imagen:'',
	url: '',
	descripcion: ''
}

const NuevoProducto = () => {

	const [error, guardarError] = useState(false);

	const {
		valores,
		errores,
		handleSubmit,
		handleChange, handleBlur} = useValidation(STATE_INICIAL, validarCrearProducto, crearProducto )

	const { nombre, empresa, url, descripcion } = valores;

	// hook de routing para redireccionar
	const router = useRouter();

	//context con las operaciones crud de firebase

	const { usuario, firebase } = useContext(FirebaseContext);

	// crear un usuario nuevo
	 async function crearProducto() {
		// si el usuario no esta autenticado llevar al login

		if(!usuario) {
			return  router.push('/login');
		}

		// crear el objeto de nuevo producto

		const producto = {
			nombre,
			empresa,
			url,
			descripcion,
			votos: 0,
			comentarios: [],
			creado: Date.now()
		}

		// insertar en la base de datos

		firebase.db.collection('productos').add(producto);

	}

	return(
		<div>
			<Layout>
				<>
				<h1
				css={css`
				text-align: center;
				margin-top: 5rem;
				`}
				>Nuevo Producto</h1>

				<Formulario
				onSubmit={handleSubmit}
				noValidate
				>
					<fieldset>
						<legend>Información General</legend>
				
						<Campo>
							<label htmlFor="nombre">Nombre</label>
								<input type="Text"
								id="nombre"
								placeholder="Tu nombre"
								name= "nombre"
								value={nombre}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>

						{errores.nombre && <Error>{ errores.nombre }</Error>}

						<Campo>
							<label htmlFor="empresa">Empresa</label>
								<input type="Text"
								id="empresa"
								placeholder="Nombre Empresa o Compañia"
								name= "empresa"
								value={empresa}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>

						{errores.empresa && <Error>{ errores.empresa }</Error>}

						{/* <Campo>
							<label htmlFor="imagen">Imagen</label>
								<input type="file"
								id="imagen "
								name= "imagen"
								value={imagen}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>

						{errores.imagen && <Error>{ errores.imagen }</Error>} */}

						<Campo>
							<label htmlFor="url">URL</label>
								<input type="url"
								id="url "
								name= "url"
								placeholder="URL de tu producto"
								value={url}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>

						{errores.url && <Error>{ errores.url }</Error>}

					</fieldset>

					<fieldset>
						<legend>Sobre tu producto</legend>

						<Campo>
							<label htmlFor="descripcion">Descripcion</label>
								<textarea
								id="descripcion "
								name= "descripcion"
								value={descripcion}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</Campo>

						{errores.descripcion && <Error>{ errores.descripcion }</Error>}
					</fieldset>

					{error && <Error>{ error }</Error>}
						
					<InputSubmit 
							type ="submit"
							value="Crear Producto" 
						/>
						
	
				</Formulario>
				</>
			</Layout>
		</div>
	);
}
export default NuevoProducto

