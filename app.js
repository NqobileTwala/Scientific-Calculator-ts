var display = document.getElementById("display");
var resetOnNextNumber = false;
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
        var expression = display.value;
        expression = expression.replace(/(\d)(\()/g, "$1*$2");
        expression = expression
            .replace(/sqrt\(/g, "Math.sqrt(")
            .replace(/ln\(/g, "Math.log(")
            .replace(/exp\(/g, "Math.exp(")
            .replace(/cos\(/g, "Math.cos(")
            .replace(/sin\(/g, "Math.sin(")
            .replace(/tan\(/g, "Math.tan(")
            .replace(/sq\(/g, "Math.pow(");
        var openParentheses = (expression.match(/\(/g) || []).length;
        var closeParentheses = (expression.match(/\)/g) || []).length;
        if (openParentheses > closeParentheses) {
            expression += ")".repeat(openParentheses - closeParentheses);
        }
        display.value = Function('"use strict"; return (' + expression + ")")();
        resetOnNextNumber = true;
    }
    catch (error) {
        display.value = "Error";
        resetOnNextNumber = true;
    }
}
window.clearDisplay = clearDisplay;
window.backspace = backspace;
window.insert = insert;
window.toggleSign = toggleSign;
window.calculate = calculate;
