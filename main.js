const petition = document.getElementById("input-petition");
const question = document.getElementById("input-question");
const boton = document.getElementById("start-btn");
const respuesta = document.getElementById("response-text");
const responseContainer = document.getElementById("response");
const loadingContainer = document.getElementById("loading-container");

let fakeText = "Por favor responde esta pregunta importante."; // Texto falso predefinido
let fakeIndex = 0; // Índice del texto falso
let answer = ""; // Respuesta oculta
let capturingHiddenAnswer = false; // Estado de captura
let visibleText = ""; // Parte visible del texto antes del punto

// Detectar teclas específicas (como Backspace)
petition.addEventListener("keydown", (event) => {
    if (capturingHiddenAnswer && event.key === "Backspace") {
        // Retroceder en la respuesta oculta y el texto falso
        if (answer.length > 0) {
            answer = answer.slice(0, -1);
            if (fakeIndex > 0) fakeIndex--;
        }
        petition.value = visibleText + fakeText.slice(0, fakeIndex);
        event.preventDefault(); // Evita la acción predeterminada
    }
});

// Manejar entrada de texto (soporte para móviles y PC)
petition.addEventListener("input", () => {
    const currentValue = petition.value;

    // Detectar el punto y activar el modo de captura
    if (!capturingHiddenAnswer && currentValue.includes(".")) {
        capturingHiddenAnswer = true;
        fakeIndex = 0; // Reinicia el índice del texto falso
        visibleText = currentValue.split(".")[0]; // Guarda el texto antes del punto
        petition.value = visibleText; // Restablece solo el texto visible
        return; // Salir aquí, ya que el punto no debe añadirse a la respuesta
    }

    // Si estamos en modo de captura
    if (capturingHiddenAnswer) {
        const inputChar = currentValue.replace(visibleText + fakeText.slice(0, fakeIndex), ""); // Detecta cambios

        if (inputChar.length > 0) {
            // Agregar caracteres a la respuesta oculta
            answer += inputChar;
            if (fakeIndex < fakeText.length) fakeIndex++;
        }

        // Actualizar el campo visible con texto falso
        petition.value = visibleText + fakeText.slice(0, fakeIndex);
    }
});

// Manejar el botón de respuesta
boton.addEventListener("click", () => {
    // Mostrar el contenedor de loading
    loadingContainer.style.display = "flex";
    responseContainer.style.display = "none";

    setTimeout(() => {
        loadingContainer.style.display = "none"; // Oculta el loading
        responseContainer.style.display = "block"; // Muestra la respuesta
        respuesta.textContent = answer; // Muestra la respuesta
        petition.value = ""; // Resetea el campo de petición
        question.value = ""; // Resetea el campo de pregunta
        answer = ""; // Limpia la respuesta oculta
        capturingHiddenAnswer = false; // Reinicia el estado
    }, 2000); // 2000 ms = 2 segundos
});
