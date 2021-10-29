// Chequear que existe un usuario loggeado
const usuarioLoggeado = localStorage.getItem('token');
if (!usuarioLoggeado) {
	location.replace('/');
}
