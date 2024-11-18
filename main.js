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

// Manejar la escritura en el campo de petición
petition.addEventListener("keydown", (event) => {
    const nonPrintableKeys = ["CapsLock", "Shift", "Control", "Alt", "Tab", "Enter"];

    if (event.key === ".") {
        capturingHiddenAnswer = true; // Activa el modo de captura
        fakeIndex = 0; // Reinicia el índice del texto falso
        visibleText = petition.value; // Guarda el texto visible antes del punto
        event.preventDefault(); // Evita que el punto aparezca
    } else if (capturingHiddenAnswer) {
        if (event.key === "Backspace") {
            // Borra el último carácter de la respuesta oculta y retrocede en el texto falso
            if (answer.length > 0) {
                answer = answer.slice(0, -1);
                if (fakeIndex > 0) fakeIndex--;
            }
        } else if (!nonPrintableKeys.includes(event.key)) {
            // Agrega caracteres a la respuesta oculta y avanza en el texto falso
            answer += event.key;
            if (fakeIndex < fakeText.length) fakeIndex++;
        }
        // Actualiza el campo visible con el texto inicial y el texto falso sincronizado
        petition.value = visibleText + fakeText.slice(0, fakeIndex);
        event.preventDefault(); // Evita que el navegador maneje el input directamente
    }
});

// Manejar el botón de respuesta
boton.addEventListener("click", () => {
    // Mostrar el contenedor de loading
    loadingContainer.style.display = "flex"; // Asegura que se muestra el loading
    responseContainer.style.display = "none"; // Asegura que la respuesta esté oculta inicialmente

    // Simular el tiempo de procesamiento (2 segundos)
    setTimeout(() => {
        loadingContainer.style.display = "none"; // Oculta el loading
        responseContainer.style.display = "block"; // Muestra la respuesta
        respuesta.textContent = answer; // Muestra la respuesta oculta
        petition.value = "";
        question.value = "";
        answer = ""; // Limpia la respuesta oculta
        capturingHiddenAnswer = false; // Reinicia el estado

    }, 2000); // 2000 ms = 2 segundos
});
