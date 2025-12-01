const display = document.getElementById("display");
let resetOnNextNumber = false;
function clearDisplay() {
    display.value = "0";
    resetOnNextNumber = false;
}
function backspace() {
    display.value = display.value.slice(0, -1) || "0";
}
function insert(value) {
    if (resetOnNextNumber && !isNaN(parseFloat(value))) {
        display.value = "";
        resetOnNextNumber = false;
    }
    if (display.value === "0")
        display.value = "";
    if (value === "sqrt") {
        display.value += "sqrt(";
    }
    else if (value === "sq") {
        display.value += "sq(";
    }
    else {
        display.value += value;
    }
}
function toggleSign() {
    if (display.value.startsWith("-")) {
        display.value = display.value.slice(1);
    }
    else {
        display.value = "-" + display.value;
    }
}
function calculate() {
    try {
        let expression = display.value;
        let result = parseSimpleMath(expression);
        display.value = result.toString();
        resetOnNextNumber = true;
    }
    catch (error) {
        display.value = "Error";
        resetOnNextNumber = true;
    }
}
function parseSimpleMath(expr) {
    expr = expr.replace(/\s/g, '');
    expr = expr.replace(/(\d+)\(/g, '$1*(');
    let tokens = expr.match(/[\d.]+|[+\-*/()]/g) || [];
    if (tokens.length === 0)
        return 0;
    let result = parseFloat(tokens[0]) || 0;
    for (let i = 1; i < tokens.length - 1; i += 2) {
        let op = tokens[i];
        let next = parseFloat(tokens[i + 1]) || 0;
        switch (op) {
            case '+':
                result += next;
                break;
            case '-':
                result -= next;
                break;
            case '*':
                result *= next;
                break;
            case '/':
                result /= next;
                break;
        }
    }
    return result;
}
window.clearDisplay = clearDisplay;
window.backspace = backspace;
window.insert = insert;
window.toggleSign = toggleSign;
window.calculate = calculate;
