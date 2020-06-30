import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout  from '../componets/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../componets/ui/Formulario';

import firebase from '../firebase';

// validaciones

import useValidation from '../hooks/useValidation';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
	nombre:  '',
	email:   '',
	password:''
}

const CrearCuenta = () => {

	const [error, guardarError] = useState(false);

	const {
		valores,
		errores,
		handleSubmit,
		handleChange, handleBlur} = useValidation(STATE_INICIAL, validarCrearCuenta, crearCuenta )

	const { nombre, email, password } = valores;
	// crear un usuario nuevo
	 async function crearCuenta() {
		try {
			
			await firebase.registrar(nombre, email, password);
			Router.push('/');
		} catch (error) {
			console.log('Hubo un error al crear el usuario', error.message);
			guardarError(error.message);
		}
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
				>Crear Cuenta</h1>
				<Formulario
				onSubmit={handleSubmit}
				noValidate
				>
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

					{error && <Error>{ error }</Error>}
						
					<Campo>
						<label htmlFor="email">Email</label>
							<input type="email"
							id="email"
							placeholder=" Tu Email"
							name= "email"
							value={email}
							onChange={handleChange}
							onBlur={handleBlur}
						 />
					</Campo>
					{errores.email && <Error>{ errores.email }</Error>}
					<Campo>
						<label htmlFor="password">Password</label>
							<input type="password"
							id="password"
							placeholder=" Tu Password"
							name= "password"
							value={password}
							onChange={handleChange}
							onBlur={handleBlur}
						 />
					</Campo>
					{errores.password && <Error>{ errores.password }</Error>}
					<InputSubmit 
							type ="submit"
							value="Crear cuenta" 
						/>
						
	
				</Formulario>
				</>
			</Layout>
		</div>
	);
}

export default CrearCuenta

