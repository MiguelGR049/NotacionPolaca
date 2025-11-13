import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../dist/public/css/main.css';

let operaciones = [];

const inputOperacion = document.getElementById("operacion_np");
const inputNormal = document.getElementById("normal");
const inputResultado = document.getElementById("resultado");
const btnResolver = document.getElementById("btn_resolver");
const btnAlmacenar = document.getElementById("btn_almacenar");
const btnLimpiar = document.getElementById("btn_limpiar");

function prefijaANormal(expresion) {
    const pila = [];
    const tokens = expresion.trim().split(/\s+/).reverse();

    tokens.forEach(token => {
        if (esOperador(token)) {
            const op1 = pila.pop();
            const op2 = pila.pop();
            const expr = `(${op1} ${token} ${op2})`;
            pila.push(expr);
        } else {
            pila.push(token);
        }
    });

    return pila.pop();
}

function esOperador(t) {
    return ["+", "-", "*", "/", "^"].includes(t);
}

function evaluarPrefija(expresion) {
    const tokens = expresion.trim().split(/\s+/).reverse();
    const pila = [];

    tokens.forEach(token => {
        if (esOperador(token)) {
            const a = parseFloat(pila.pop());
            const b = parseFloat(pila.pop());
            switch (token) {
                case '+': pila.push(a + b); break;
                case '-': pila.push(a - b); break;
                case '*': pila.push(a * b); break;
                case '/': pila.push(a / b); break;
                case '^': pila.push(a ** b); break;
            }
        } else {
            pila.push(token);
        }
    });

    return pila.pop();
}

btnResolver.addEventListener("click", () => {
    const expresion = inputOperacion.value.trim();

    if (!expresion) {
        alert("Por favor, ingresa una operación en notación polaca.");
        return;
    }

    try {
        const normal = prefijaANormal(expresion);
        const resultado = evaluarPrefija(expresion);

        inputNormal.value = normal;
        inputResultado.value = resultado;
    } catch (e) {
        alert("Ocurrió un error al procesar la operación. Revisa la expresión ingresada.");
    }
});

btnAlmacenar.addEventListener("click", () => {
    const expresion = inputOperacion.value.trim();
    const normal = inputNormal.value.trim();
    const resultado = inputResultado.value.trim();

    if (!expresion || !normal || !resultado) {
        alert("Primero resuelve una operación antes de almacenarla.");
        return;
    }

    operaciones.push({ expresion, normal, resultado });
    alert("Operación almacenada correctamente ✅");
    console.log("Historial de operaciones:", operaciones);
});

btnLimpiar.addEventListener("click", () => {
    inputOperacion.value = "";
    inputNormal.value = "";
    inputResultado.value = "";
});
