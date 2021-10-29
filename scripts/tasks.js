window.addEventListener('load', () => {
	/* -------------------------------- Variables ------------------------------- */
	const pUserInfo = document.querySelector('.user-info p');
	const urlApi = 'https://ctd-todo-api.herokuapp.com/v1';
	const jwt = localStorage.getItem('token');
	const formulario = document.querySelector('form');
	const inputNuevaTarea = document.querySelector('#nuevaTarea');
	const tareasPendientes = document.querySelector('.tareas-pendientes');
	const tareasTerminadas = document.querySelector('.tareas-terminadas');
	const cerrarSesion = document.querySelector('#closeApp');
	/* -------------------------------------------------------------------------- */

	obtenerNombreUsuario(`${urlApi}/users/getMe`, jwt);
	obtenerlistaTareas(`${urlApi}/tasks`, jwt);

	formulario.addEventListener('submit', function (evento) {
		evento.preventDefault();
		const nuevaTareaInfo = {
			description: inputNuevaTarea.value,
			completed: false,
		};
		crearNuevaTarea(`${urlApi}/tasks`, jwt, nuevaTareaInfo);
		formulario.reset();
	});

	cerrarSesion.addEventListener('click', function () {
		const respuesta = confirm('¿Desea cerrar sesión?');
		if (respuesta) {
			location.href = './index.html';
			localStorage.removeItem('token');
		}
	});
	/* -------------------------------- Funciones ------------------------------- */
	function obtenerNombreUsuario(url, token) {
		const settings = {
			method: 'GET',
			headers: {
				authorization: token,
			},
		};
		fetch(url, settings)
			.then((response) => response.json())
			.then((data) => {
				pUserInfo.innerHTML = data.firstName + ' ' + data.lastName;
			});
	}
	function obtenerlistaTareas(url, token) {
		const settings = {
			method: 'GET',
			headers: {
				authorization: token,
			},
		};
		fetch(url, settings)
			.then((response) => response.json())
			.then((data) => {
				renderizarInfo(data);
			});
	}
	function crearNuevaTarea(url, token, payload) {
		const settings = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				authorization: token,
			},
			body: JSON.stringify(payload),
		};
		fetch(url, settings)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
	}
	function renderizarInfo(listado) {
		listado.forEach((tarea) => {
			if (tarea.completed) {
				tareasTerminadas.innerHTML += `<li class="tarea">
				<div class="done"></div>
				<div class="descripcion">
				<p class="nombre">${tarea.description}</p>
				<div>
				<button><i id="${tarea.id}" class="fas
				fa-undo-alt change"></i></button>
				<button><i id="${tarea.id}" class="far
				fa-trash-alt"></i></button>
				</div>
				</div>
				</li>`;
			} else {
				tareasPendientes.innerHTML += `<li class="tarea">
				<div class="not-done change" id="${tarea.id}"></div>
				<div class="descripcion">
				<p class="nombre">${tarea.description}</p>
                <p class="timestamp"><i class="farfa-calendar-alt"></i> ${tarea.createdAt}</p>
				</div> 
				</li>`;
			}
		});
	}
	/* -------------------------------------------------------------------------- */
});
