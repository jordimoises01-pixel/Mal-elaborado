
/**
 * @param {string} correo 
 * @returns {boolean} 
 */
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

/**
 * @param {string} texto 
 * @returns {boolean} 
 */
function soloLetras(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return regex.test(texto);
}

/**
 * @param {number|string} numero 
 * @param {number} maxLongitud 
 * @returns {boolean} 
 */
function validarLongitud(numero, maxLongitud) {
    const str = String(numero).trim();
    return str.length > 0 && str.length <= maxLongitud;
}

/**
 * @param {string|Date} fechaNacimiento 
 * @returns {number} ¿
 */
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    if (isNaN(nacimiento.getTime())) return 0;

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad < 0 ? 0 : edad;
}

/**
 * @param {string|Date} fechaNacimiento 
 * @returns {boolean} 
 */
function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

/**
 * @param {string} password 
 * @returns {boolean} 
 */
function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
}

/**
 * @param {string} curp 
 * @returns {boolean} 
 */
function validarCURP(curp) {
    const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/i;
    return regex.test(String(curp).trim());
}

/**
 * @param {string|number} cp 
 * @returns {boolean} 
 */
function validarCP(cp) {
    const regex = /^\d{5}$/;
    return regex.test(String(cp).trim());
}