const urlApi = 'https://ctd-todo-api.herokuapp.com/v1/users';

window.addEventListener('load', function () {
	const formulario = document.querySelector('form');
	const botonSubmit = document.querySelector('form button');
	const inputNombre = document.querySelector('#nombre');
	const inputApellido = document.querySelector('#apellido');
	const inputEmail = document.querySelector('#email');
	const inputPass = document.querySelector('#pass');
	const inputRePass = document.querySelector('#rePass');
	const mensajeVacioNombre = this.document.querySelector('#vacioNombre');
	const mensajeVacioApellido = this.document.querySelector('#vacioApellido');
	const mensajeVacioEmail = this.document.querySelector('#vacioEmail');
	const mensajeVacioPass = this.document.querySelector('#vacioPass');
	const mensajeVacioRePass = this.document.querySelector('#vacioRePass');
	const mensajePassIguales = this.document.querySelector('#passIguales');
	const mensajeError = document.querySelector('#mensajeError');

	formulario.addEventListener('submit', function (evento) {
		evento.preventDefault();
		//Validar Nombre
		if (validarVacio(inputNombre)) {
			inputNombre.classList.add('error');
			mensajeVacioNombre.classList.remove('oculto');
		} else {
			inputNombre.classList.remove('error');
			mensajeVacioNombre.classList.add('oculto');
		}
		// Validar Apellido
		if (validarVacio(inputApellido)) {
			inputApellido.classList.add('error');
			mensajeVacioApellido.classList.remove('oculto');
		} else {
			inputApellido.classList.remove('error');
			mensajeVacioApellido.classList.add('oculto');
		}
		// Validar Email
		if (validarVacio(inputEmail)) {
			inputEmail.classList.add('error');
			mensajeVacioEmail.classList.remove('oculto');
		} else {
			inputEmail.classList.remove('error');
			mensajeVacioEmail.classList.add('oculto');
		}
		// Validar Pass
		if (validarVacio(inputPass)) {
			inputPass.classList.add('error');
			mensajeVacioPass.classList.remove('oculto');
		} else {
			inputPass.classList.remove('error');
			mensajeVacioPass.classList.add('oculto');
		}
		// Validar RePass
		if (validarVacio(inputRePass)) {
			inputRePass.classList.add('error');
			mensajeVacioRePass.classList.remove('oculto');
		} else if (inputPass.value !== inputRePass.value) {
			inputRePass.classList.add('error');
			mensajePassIguales.classList.remove('oculto');
		} else {
			inputRePass.classList.remove('error');
			mensajePassIguales.classList.add('oculto');
			mensajePassIguales.classList.add('oculto');
		}
		// Extraer datos y enviarlos a la API
		if (
			!validarVacio(inputNombre) &&
			!validarVacio(inputApellido) &&
			!validarVacio(inputEmail) &&
			!validarVacio(inputPass) &&
			!validarVacio(inputRePass) &&
			inputPass.value == inputRePass.value
		) {
			const nuevosDatos = normalizar(
				inputNombre.value,
				inputApellido.value,
				inputEmail.value,
				inputPass.value
			);
			fetchApiSingup(urlApi, nuevosDatos);
			// Resetear formulario
		}
	});
});

function validarVacio(input) {
	return input.value == '';
}

// Normalizar los datos
function normalizar(nombre, apellido, email, pass) {
	return {
		firstName: nombre.toLowerCase().trim(),
		lastName: apellido.toLowerCase().trim(),
		email: email.trim(),
		password: pass,
	};
}
function fetchApiSingup(urlApi, nuevosDatos) {
	const payload = JSON.stringify(nuevosDatos);
	const configuraciones = {
		method: 'POST',
		body: payload,
		headers: {
			'Content-type': 'application/json',
		},
	};
	fetch(urlApi, configuraciones)
		.then((response) => response.json())
		.then((json) => {
			console.log('recurso creado:');
			console.log(json);
			if (json.jwt) {
				// redirijo a la vista correspondiente
				mensajeError.classList.add('oculto');
				location.href = './index.html';
			} else {
				mensajeError.classList.remove('oculto');
			}
		});
}
