/*
	Debe integrar las funciones ya creadas en la librería utileria.js.  
*/

const form = document.querySelector('#auth-form');
const modeButtons = document.querySelectorAll('.mode-button');
const nameField = document.querySelector('#name-field');
const nameInput = document.querySelector('#name');
const passwordInput = document.querySelector('#password');
const formTitle = document.querySelector('#form-title');
const formSubtitle = document.querySelector('#form-subtitle');
const submitLabel = document.querySelector('#submit-label');
const formStatus = document.querySelector('#form-status');
let mode = 'login';

if (modeButtons.length > 0) {
	modeButtons.forEach((button) => {
	/*================================================================*/ //ESTO CAMBIA DE INICIAR SESIÓN A REGISTRARSE
		button.addEventListener('click', () => {
			mode = button.dataset.mode;
			modeButtons.forEach((item) => {
				const active = item === button;
				item.classList.toggle('is-active', active);
				item.setAttribute('aria-selected', active);
			});

			const registering = mode === 'register';
			if (nameField) nameField.hidden = !registering;
	/*=================================================================================================================================*/ //ESTO CAMBIA LOS SUBTITULOS DE CADA PALABRA 
			if (formTitle) formTitle.textContent = registering ? 'Crea tu cuenta' : 'Inicia sesion';
			if (formSubtitle) formSubtitle.textContent = registering ? 'Empieza a organizar tus ideas hoy.' : 'Entra a tu cuenta para continuar.';
			if (submitLabel) submitLabel.textContent = registering ? 'Crear mi cuenta' : 'Entrar a mi cuenta';
	/*==================================================================================================================================*/ //VARIABLES DECLARADAS EN PASSWORD DEL HTML
			if (passwordInput) passwordInput.autocomplete = registering ? 'new-password' : 'current-password';
			if (formStatus) formStatus.textContent = '';
		});
	});
}

/*==========================================================================================================*/ //VER Ó OCULTAR CONTRASEÑA
document.querySelector('.show-password')?.addEventListener('click', (event) => {
	const visible = passwordInput.type === 'text';
	passwordInput.type = visible ? 'password' : 'text';
	event.currentTarget.textContent = visible ? 'Ver' : 'Ocultar';
	event.currentTarget.setAttribute('aria-label', visible ? 'Mostrar contrasena' : 'Ocultar contrasena');
});

/*===================================================================================*/ //CUANDO SE TE OLVIDA LA CONTRASEÑA 
document.querySelector('#forgot-link')?.addEventListener('click', (event) => {
	event.preventDefault();
	if (formStatus) formStatus.textContent = 'Te enviaremos un enlace para recuperar tu cuenta.';
});

/*===================================================================================*/

function validarEmail(email) {
	// Expresión regular para validar el formato del email
	var regex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

	// Validar el formato del email
	if (!regex.test(email)) {
		return false;
	}

	// Separar el nombre de usuario y el dominio del email
	var partes = email.split("@");
	var usuario = partes[0];
	var dominio = partes[1];

	// Validar que el usuario y el dominio no estén vacíos
	if (usuario.length === 0 || dominio.length === 0) {
		return false;
	}

	// Validar que el usuario y el dominio no contengan caracteres especiales
	var caracteresEspeciales = /[!#$%&'*/=?^_`{|}~]/;

	if (caracteresEspeciales.test(usuario) || caracteresEspeciales.test(dominio)) {
		return false;
	}
	return true;
}

//Ejemplo de uso
var email = "davidramos@gmail.com";
	if (validarEmail(email)) {
		console.log("Email válido");
	} else {
	console.log("Email inválido");
}

/*================================================================================================================================*/

function validarTexto(text) {
	//Expresión regular para validar el formato del texto
	var regex = /^[a-zA-ZáéíóúüýñÁÉÍÓÚÜÑ\s]+$/;

	//test(); actua como un booleano.
	return regex.test(text);

}

//Ejemplo de uso
var text = "WEIUDDUý eee"
	if (validarTexto(text)) {
		console.log("texto valido");
	} else {
		console.log("texto inválido");
}

/*================================================================================================================================*/
function validarPassword(password){
	var valida = true;

	if ( password.length >= 8 ) {
			console.log("longitud valida");
	} else {
		console.log("longitud inválida");
		valida = false;
	}

	if ( password.match(/[A-Z]/) ) {
		console.log("Correcto");
	} else {
		console.log("Debe tener al menos una letra en Mayuscula");
		valida = false;
	}
	
	if ( password.match(/\d/) ) {
		console.log("Correcto");
	} else {
		console.log("Debe tener al menos un numero");
		valida = false;
	}

	var espacios = false;
	var cont = 0;

	while (!espacios && (cont < password.length)) {
		if (password.charAt(cont) == " ")
			espacios = true;
		cont++;
	}

	if (espacios) {
		console.log ("La contraseña no puede contener espacios en blanco");
		return false;
	}

	if (/[!@#$%^&*(),.?":{}|<>_+\-\[\]\\\/;'`~]/.test(password)) {
		console.log("Correcto");
	} else {
		console.log("Debe tener al menos un caracter especial");
		valida = false;
	}

	return valida;
}

//Ejemplo de uso
var password = "Hola12/";
validarPassword(password);

/*================================================================================================================================*/

if (form) {
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		document.querySelectorAll('.field').forEach((field) => field.classList.remove('has-error'));
		document.querySelectorAll('.error-message').forEach((message) => { message.textContent = ''; });
		formStatus.textContent = '';
		formStatus.style.color = '';
		let valid = true;
		const email = document.querySelector('#email');

		const setError = (input, mensaje) => {
			input.closest('.field').classList.add('has-error');
			input.closest('.field').querySelector('.error-message').textContent = mensaje;
			valid = false;
		};

		if (mode === 'register') {
			const nombre = nameInput.value.trim();
			if (!nombre) setError(nameInput, 'Completa este campo.');
			else if (!validarTexto(nombre)) setError(nameInput, 'Escribe un nombre válido (solo letras).');
		}

		const emailValue = email.value.trim();
		if (!emailValue) setError(email, 'Completa este campo.');
		else if (!validarEmail(emailValue)) setError(email, 'Escribe un email válido.');

		const passwordValue = passwordInput.value;
		if (!passwordValue) setError(passwordInput, 'Completa este campo.');
		else if (!validarPassword(passwordValue))
			setError(passwordInput, 'Mínimo 8 caracteres, una mayúscula, un número y un carácter especial.');

		if (valid) {
			formStatus.style.color = 'green';
			formStatus.textContent = mode === 'register' ? 'Cuenta creada. Ya puedes comenzar.' : 'Sesión iniciada correctamente.';
			// --- Conexion con el INDEX ---
			const usuarioNombre = emailValue.split('@')[0];
			sessionStorage.setItem('usuarioLogueado', JSON.stringify({ nombre: usuarioNombre, email: emailValue }));

			setTimeout(() => {
				window.location.href = 'index.html';
			}, 800);
			// --------------------------------------------------------
		} else {
			formStatus.style.color = '#c00';
			formStatus.textContent = 'Revisa los campos marcados en rojo.';
		}
	});
}

/* ==========================================================================
   Agregado de Jordi: Lógica de index.html (Sidebar, Navbar, Captura y Modal)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

	// Comprobar si estamos en la pantalla index.html
	const navUserName = document.getElementById('navUserName');
	const capturaForm = document.getElementById('capturaForm');

	if (navUserName || capturaForm) {

		// 1. Protección de ruta y carga de usuario en Navbar
		const sessionData = sessionStorage.getItem('usuarioLogueado');
		if (!sessionData) {
			window.location.href = 'login.html';
			return;
		}

		const usuario = JSON.parse(sessionData);
		if (navUserName) {
			navUserName.textContent = usuario.nombre || usuario.email;
		}

		// 2. Navbar: Dropdown de Usuario y Salir del Sistema
		const userDropdownBtn = document.getElementById('userDropdownBtn');
		const userDropdownMenu = document.getElementById('userDropdownMenu');
		const logoutBtn = document.getElementById('logoutBtn');

		if (userDropdownBtn && userDropdownMenu) {
			userDropdownBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				userDropdownMenu.classList.toggle('is-visible');
			});

			document.addEventListener('click', () => {
				userDropdownMenu.classList.remove('is-visible');
			});
		}

		if (logoutBtn) {
			logoutBtn.addEventListener('click', (e) => {
				e.preventDefault();
				sessionStorage.removeItem('usuarioLogueado');
				window.location.href = 'login.html';
			});
		}

		// 3. Sidebar y Botón Hamburguesa
		const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
		const sidebar = document.getElementById('sidebar');

		if (sidebarToggleBtn && sidebar) {
			sidebarToggleBtn.addEventListener('click', () => {
				sidebar.classList.toggle('is-closed');
			});
		}

		// Submenú en Sidebar (Usuarios -> Captura)
		const submenuToggles = document.querySelectorAll('.submenu-toggle');
		submenuToggles.forEach(toggle => {
			toggle.addEventListener('click', () => {
				const parent = toggle.closest('.has-submenu');
				if (parent) parent.classList.toggle('is-active');
			});
		});

		// 4. Formulario Captura de Alumnos y Validaciones
		if (capturaForm) {
			capturaForm.addEventListener('submit', (e) => {
				e.preventDefault();

				// Limpiar errores previos
				document.querySelectorAll('#capturaForm .field').forEach(f => f.classList.remove('has-error'));
				document.querySelectorAll('#capturaForm .error-message').forEach(m => m.textContent = '');

				const username = document.getElementById('capturaUser').value.trim();
				const email = document.getElementById('capturaEmail').value.trim();
				const password = document.getElementById('capturaPassword').value;
				const numControl = document.getElementById('capturaNumControl').value.trim();
				const edadVal = document.getElementById('capturaEdad').value.trim();
				const edad = parseInt(edadVal, 10);

				let isValid = true;

				const setError = (inputId, errId, message) => {
					const input = document.getElementById(inputId);
					const errSpan = document.getElementById(errId);
					if (input && errSpan) {
						input.closest('.field').classList.add('has-error');
						errSpan.textContent = message;
					}
					isValid = false;
				};

				// Validar Usuario
				if (!username) setError('capturaUser', 'err-capturaUser', 'Ingresa el nombre de usuario.');

				// Validar Email (usando validarEmail de David)
				if (!email) {
					setError('capturaEmail', 'err-capturaEmail', 'Ingresa el correo electrónico.');
				} else if (typeof validarEmail === 'function' && !validarEmail(email)) {
					setError('capturaEmail', 'err-capturaEmail', 'Formato de correo inválido.');
				}

				// Validar Contraseña (usando validarPassword de David)
				if (!password) {
					setError('capturaPassword', 'err-capturaPassword', 'Ingresa la contraseña.');
				} else if (typeof validarPassword === 'function' && !validarPassword(password)) {
					setError('capturaPassword', 'err-capturaPassword', 'Debe tener mínimo 8 caracteres, 1 mayúscula, 1 número y 1 especial.');
				}

				// Validar Número de Control (Exactamente 6 dígitos)
				const regexNumControl = /^\d{6}$/;
				if (!numControl) {
					setError('capturaNumControl', 'err-capturaNumControl', 'Ingresa el número de control.');
				} else if (!regexNumControl.test(numControl)) {
					setError('capturaNumControl', 'err-capturaNumControl', 'El número de control debe tener exactamente 6 dígitos numéricos.');
				}

				// Validar Edad
				if (!edadVal || isNaN(edad) || edad <= 0) {
					setError('capturaEdad', 'err-capturaEdad', 'Ingresa una edad válida.');
				}

				// Si todo es válido, desplegar Modal de Edad
				if (isValid) {
					openEdadModal(username, edad);
				}
			});
		}

		// 5. Modal de Edad
		const edadModal = document.getElementById('edadModal');
		const closeModalBtn = document.getElementById('closeModalBtn');
		const acceptModalBtn = document.getElementById('acceptModalBtn');
		const modalBody = document.getElementById('modalBody');

		function openEdadModal(nombre, edad) {
			if (!edadModal || !modalBody) return;
			const esMayor = edad >= 18;
			modalBody.innerHTML = `
				<p><strong>Alumno:</strong> ${nombre}</p>
				<p><strong>Edad:</strong> ${edad} años</p>
				<div class="status-badge ${esMayor ? 'is-success' : 'is-warning'}">
					${esMayor ? '✔ El alumno es <strong>MAYOR DE EDAD</strong>.' : '⚠ El alumno es <strong>MENOR DE EDAD</strong>.'}
				</div>
			`;
			edadModal.classList.add('is-open');
		}

		function closeModal() {
			if (edadModal) edadModal.classList.remove('is-open');
		}

		if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
		if (acceptModalBtn) acceptModalBtn.addEventListener('click', closeModal);
		if (edadModal) {
			edadModal.addEventListener('click', (e) => {
				if (e.target === edadModal) closeModal();
			});
		}
	}
});