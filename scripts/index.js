const urlApi = 'https://ctd-todo-api.herokuapp.com/v1/users/login';
window.addEventListener('load', function () {
	const formulario = this.document.forms[0];
	const inputEmail = document.querySelector('#email');
	const inputPass = document.querySelector('#pass');
	const mensajeError = document.querySelector('#mensajeError');

	formulario.addEventListener('submit', function (event) {
		event.preventDefault();

		if (validarVacio(inputEmail) || validarVacio(inputPass))
			mensajeError.classList.remove('oculto');
		else mensajeError.classList.add('oculto');

		// Validar Email
		if (validarVacio(inputEmail)) inputEmail.classList.add('error');
		else inputEmail.classList.remove('error');

		// Validar Pass
		if (validarVacio(inputPass)) inputPass.classList.add('error');
		else inputPass.classList.remove('error');

		if (!validarVacio(inputEmail) && !validarVacio(inputPass)) {
			const nuevosDatos = normalizar(inputEmail.value, inputPass.value);
			fetchApiLogin(urlApi, nuevosDatos);
		}
	});
});

function validarVacio(input) {
	return input.value == '';
}

function normalizar(email, pass) {
	return {
		email: email.trim(),
		password: pass,
	};
}

function fetchApiLogin(urlApi, nuevosDatos) {
	const payload = JSON.stringify(nuevosDatos);
	const settings = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: payload,
	};

	fetch(urlApi, settings)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
			// chequeamos que el usuario existe con la llegada del token
			if (data.jwt) {
				localStorage.setItem('token', data.jwt);
				mensajeError.classList.add('oculto');
				// redirijo a la vista correspondiente
				location.href = '/mis-tareas.html';
			} else {
				mensajeError.classList.remove('oculto');
			}
		});
}
