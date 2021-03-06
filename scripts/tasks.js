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
	obtenerTareas(`${urlApi}/tasks`, jwt);
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
			location.href = 'index.html';
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
	function obtenerTareas(url, token) {
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
				obtenerTareas(`${urlApi}/tasks`, jwt);
			});
	}
	function renderizarInfo(listado) {
		if (listado.length > 0) {
			tareasPendientes.innerHTML = '';
		}
		tareasTerminadas.innerHTML = '';
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
		modificarTarea(`${urlApi}/tasks`, jwt);
		borrarTarea(`${urlApi}/tasks`, jwt);
	}
	function modificarTarea(url, token) {
		const botonesTerminar = document.querySelectorAll('.change');
		botonesTerminar.forEach((boton) => {
			boton.addEventListener('click', function (event) {
				const payload = {};
				if (event.target.classList.contains('fa-undo-alt')) {
					payload.completed = false;
				} else {
					payload.completed = true;
				}
				const settings = {
					method: 'PUT',
					headers: {
						'Content-type': 'application/json',
						authorization: token,
					},
					body: JSON.stringify(payload),
				};
				fetch(`${url}/${boton.id}`, settings)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						obtenerTareas(url, jwt);
					});
			});
		});
	}
	function borrarTarea(url, token) {
		const botonesBorar = document.querySelectorAll('button i.fa-trash-alt');
		botonesBorar.forEach((boton) => {
			boton.addEventListener('click', function () {
				const settings = {
					method: 'DELETE',
					headers: {
						authorization: token,
					},
				};
				fetch(`${url}/${boton.id}`, settings)
					.then((response) => response.json())
					.then((data) => {
						console.log(data);
						obtenerTareas(url, jwt);
					});
			});
		});
	}
	/* -------------------------------------------------------------------------- */
});
