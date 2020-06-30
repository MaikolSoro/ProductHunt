import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout  from '../componets/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../componets/ui/Formulario';

import firebase from '../firebase';

// validaciones

import useValidation from '../hooks/useValidation';
import ValidarLogin from '../validacion/ValidarLogin';

const STATE_INICIAL = {
	email:   '',
	password:''
}


const Login = () => {

	const [error, guardarError] = useState(false);

	const {
		valores,
		errores,
		handleSubmit,
		handleChange, handleBlur} = useValidation(STATE_INICIAL, ValidarLogin, login )

	const { email, password } = valores;
	
	async function login() {
		 try {
			await firebase.login(email, password);
			 Router.push('/');
		 } catch (error) {
			console.log('Hubo un error al autenticar usuario', error.message);
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
				>Iniciar Sesión</h1>
				<Formulario
				onSubmit={handleSubmit}
				noValidate
				>
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
					{error && <Error>{ error }</Error>}
					<InputSubmit 
							type ="submit"
							value="Iniciar Sesión" 
						/>
						
	
				</Formulario>
				</>
			</Layout>
		</div>
	);
}
export default Login

