let letraActual = '';
let numeroActual = '';
let listaNumerosSorteados = []; // Lista única de números sorteados
const letras = ['B', 'I', 'N', 'G', 'O'];
const numeroMaximo = 99; // Tenemos 99 números en total

// Asignar texto al elemento HTML
function asignarTextoElemento(selector, texto) {
    let elementoHTML = document.querySelector(selector);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    }
}

// Actualizar el número actual en la pantalla y en la tabla
function actualizarNumero() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento('#numeroActual', 'Ya se han sorteado todos los números.');
        let botonReiniciar = document.querySelector('#reiniciar');
        if (botonReiniciar) botonReiniciar.removeAttribute('disabled');
        return;
    }

    if (letraActual === '') {
        asignarTextoElemento('#numeroActual', 'Selecciona una letra primero.');
        return;
    }

    numeroActual = generarNumero();
    asignarTextoElemento('#numeroActual', `Número a jugar: ${numeroActual}`);
    actualizarTabla(letraActual, numeroActual);

    // El botón de verificar ganadores está habilitado después de cada número
    let botonVerificar = document.querySelector('#verificar');
    if (botonVerificar) botonVerificar.removeAttribute('disabled');
}

// Actualizar la letra actual en la pantalla
function actualizarLetra() {
    letraActual = generarLetra();
    asignarTextoElemento('#letraActual', `Letra a jugar: ${letraActual}`);
    asignarTextoElemento('#numeroActual', 'Presiona "Número a Jugar"');
}

// Actualizar la tabla con la letra y el número actual
function actualizarTabla(letra, numero) {
    if (letra && numero) {
        for (let i = 1; i <= 5; i++) {
            let celda = document.getElementById(`${letra}-${i}`);
            if (celda && !celda.textContent) { // Si la celda está vacía
                celda.textContent = numero;
                break;
            }
        }
    }
}

// Generar un número aleatorio único
function generarNumero() {
    let numeroGenerado;
    do {
        numeroGenerado = String(Math.floor(Math.random() * numeroMaximo + 1)).padStart(2, '0');
    } while (listaNumerosSorteados.includes(numeroGenerado)); // Asegurarse de que no se repita

    listaNumerosSorteados.push(numeroGenerado); // Agregar a la lista de números sorteados
    return numeroGenerado;
}

// Generar una letra aleatoria
function generarLetra() {
    return letras[Math.floor(Math.random() * letras.length)];
}

// Limpiar el contenido de la tabla de bingo
function limpiarTabla() {
    letras.forEach(letra => {
        for (let i = 1; i <= 5; i++) {
            let celda = document.getElementById(`${letra}-${i}`);
            if (celda) celda.textContent = ''; // Limpiar el contenido de cada celda
        }
    });
}

// Verificar si se ha ganado el bingo
function verificarGanador() {
    // Verifica si todas las celdas de todas las letras están llenas
    return letras.every(letra => {
        for (let i = 1; i <= 5; i++) {
            let celda = document.getElementById(`${letra}-${i}`);
            if (!celda || !celda.textContent) {
                return false; // Si alguna celda está vacía, no se ha ganado
            }
        }
        return true; // Todas las celdas están llenas para la letra actual
    });
}

// Mostrar mensaje y imagen de ganador
function mostrarMensajeGanador() {
    let contenedorVisualizacion = document.querySelector('.container__visualizacion');
    if (contenedorVisualizacion) {
        contenedorVisualizacion.innerHTML = `
            <div class="mensaje-ganador">
                <h2>¡Felicidades, has ganado!</h2>
                <p>¡Has completado todas las filas!</p>
                <img src="./img/ganador.png" alt="Imagen de felicitaciones" class="imagen-ganador" />
            </div>
        `;
    }
    let botonReiniciar = document.querySelector('#reiniciar');
    if (botonReiniciar) botonReiniciar.removeAttribute('disabled');
    let botonVerificar = document.querySelector('#verificar');
    if (botonVerificar) botonVerificar.setAttribute('disabled', 'true'); // Deshabilitar botón de verificar
    let botonNumero = document.querySelector('#numero-a-jugar');
    if (botonNumero) botonNumero.setAttribute('disabled', 'true'); // Deshabilitar botón de número a jugar
    let botonLetra = document.querySelector('#letra-a-jugar');
    if (botonLetra) botonLetra.setAttribute('disabled', 'true'); // Deshabilitar botón de letra a jugar
    asignarTextoElemento('#numeroActual', ''); // Limpiar el texto del número actual
    asignarTextoElemento('#letraActual', ''); // Limpiar el texto de la letra actual
}

// Inicializar las condiciones del juego
function condicionesIniciales() {
    listaNumerosSorteados = []; // Reiniciar la lista de números sorteados
    numeroActual = '';
    letraActual = '';
    asignarTextoElemento('#numeroActual', 'Número a jugar: -');
    asignarTextoElemento('#letraActual', 'Letra a jugar: -');
    limpiarTabla(); // Limpiar la tabla al reiniciar

    let botonReiniciar = document.querySelector('#reiniciar');
    if (botonReiniciar) botonReiniciar.setAttribute('disabled', 'true');

    let botonVerificar = document.querySelector('#verificar');
    if (botonVerificar) botonVerificar.setAttribute('disabled', 'true'); // Desactivar botón de verificar

    let botonNumero = document.querySelector('#numero-a-jugar');
    if (botonNumero) botonNumero.removeAttribute('disabled'); // Habilitar botón de número a jugar

    let botonLetra = document.querySelector('#letra-a-jugar');
    if (botonLetra) botonLetra.removeAttribute('disabled'); // Habilitar botón de letra a jugar

    // Ocultar el mensaje de felicitaciones si está visible
    let mensajeGanador = document.querySelector('.mensaje-ganador');
    if (mensajeGanador) mensajeGanador.remove();
}

// Reiniciar el juego
function reiniciarJuego() {
    condicionesIniciales(); // Llama a la función que restablece el juego
}

// Inicializa el juego al cargar la página
window.onload = condicionesIniciales;

// Añadir evento al botón de reinicio
document.querySelector('#reiniciar')?.addEventListener('click', reiniciarJuego);

// Añadir evento al botón de verificar ganador
document.querySelector('#verificar')?.addEventListener('click', () => {
    if (verificarGanador()) {
        mostrarMensajeGanador();
    } else {
        alert('No has ganado todavía. Sigue jugando.');
    }
});