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
let previousValue = ""; // Almacena el valor anterior del campo
let defaultAnswer = "No logro visualizar la respuesta..."

// Manejar entrada de texto (compatible con móviles y PC)
petition.addEventListener("input", () => {
    const currentValue = petition.value;

    // Detectar el punto y activar el modo de captura
    if (!capturingHiddenAnswer && currentValue.includes(".")) {
        capturingHiddenAnswer = true;
        fakeIndex = 0; // Reinicia el índice del texto falso
        visibleText = currentValue.split(".")[0]; // Guarda el texto antes del punto
        previousValue = visibleText; // Establece el texto visible como el anterior
        petition.value = visibleText; // Restablece solo el texto visible
        return; // Salir aquí, ya que el punto no debe añadirse a la respuesta
    }

    // Si estamos en modo de captura
    if (capturingHiddenAnswer) {
        const expectedText = visibleText + fakeText.slice(0, fakeIndex); // Texto esperado en el campo
        if (currentValue.length < expectedText.length) {
            // Si el valor actual es menor, detectamos un borrado (Backspace)
            if (answer.length > 0) {
                answer = answer.slice(0, -1);
                if (fakeIndex > 0) fakeIndex--;
            }
        } else {
            // Si se ingresaron nuevos caracteres
            const inputChar = currentValue.replace(expectedText, ""); // Detecta cambios precisos
            if (inputChar.length > 0) {
                answer += inputChar;
                if (fakeIndex < fakeText.length) fakeIndex++;
            }
        }

        // Actualizar el campo visible con texto falso
        petition.value = visibleText + fakeText.slice(0, fakeIndex);
        previousValue = petition.value; // Actualiza el valor anterior
    }
});

// Manejar el botón de respuesta
boton.addEventListener("click", () => {
    // Mostrar el loading
    loadingContainer.style.display = "flex";
    responseContainer.classList.remove("show"); // Asegura que la respuesta esté oculta

    setTimeout(() => {
        // Ocultar el loading y mostrar la respuesta
        loadingContainer.style.display = "none";
        responseContainer.classList.add("show"); // Muestra la respuesta con animación

        // Mostrar la respuesta adecuada
        if (capturingHiddenAnswer && answer.length > 0) {
            respuesta.textContent = answer;
        } else {
            respuesta.textContent = defaultAnswer;
        }

        // Reiniciar campos y variables
        petition.value = "";
        question.value = "";
        answer = "";
        capturingHiddenAnswer = false;
        previousValue = "";
    }, 2000); // Espera de 2 segundos para el loading
});
