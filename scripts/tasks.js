window.addEventListener('load', () => {
	const formulario = document.querySelector('form');
	const nuevaTareaInfo = document.querySelector('#nuevaTarea');

	obtenerUsuario('https://ctd-todo-api.herokuapp.com/v1/users/getMe');
	obtenerTareas('https://ctd-todo-api.herokuapp.com/v1/tasks');

	formulario.addEventListener('submit', function (evento) {
		evento.preventDefault();
		const datos = {
			description: nuevaTareaInfo.value,
			completed: false,
		};
		crearTarea('https://ctd-todo-api.herokuapp.com/v1/tasks', datos);
	});
});

function obtenerUsuario(urlApi) {
	const pUserInfo = document.querySelector('.user-info p');
	const settings = {
		method: 'GET',
		headers: {
			authorization: localStorage.getItem('token'),
		},
	};
	fetch(urlApi, settings)
		.then((response) => response.json())
		.then((data) => {
			pUserInfo.innerHTML = data.firstName + ' ' + data.lastName;
		});
}

function obtenerTareas(urlApi) {
	const settings = {
		method: 'GET',
		headers: {
			authorization: localStorage.getItem('token'),
		},
	};
	fetch(urlApi, settings)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});
}
function crearTarea(urlApi, nuevosDatos) {
	const payload = JSON.stringify(nuevosDatos);
	console.log(payload);
	const settings = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
			authorization: localStorage.getItem('token'),
		},
		body: payload,
	};
	fetch(urlApi, settings)
		.then((response) => response.json())
		.then((data) => {
			console.log(data);
		});
}
