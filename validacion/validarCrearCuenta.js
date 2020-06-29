export default function validarCrearCuenta(valores) {

	let errores = {};

	// validar el nombre del usuario

	if(!valores.nombre) {
		errores.nombre = "El nombre es obligatorio";
	}

	// Validar el email

	if(!valores.email) {
		errores.email = "El email es obligatorio";
	} else  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){

		errores.email = "Email no válido";
	}

	// Validar el password
	if(!valores.password) {
		errores.password = "El password es obligatorio";
	} else if(valores.password.length < 6) {
		errores.password = 'El password deber ser al menos 6 carácteres'
	}

	return errores;
}