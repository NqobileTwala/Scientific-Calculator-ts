const display: HTMLInputElement = document.getElementById("display") as HTMLInputElement;
let resetOnNextNumber: boolean = false;

function clearDisplay(): void {
  display.value = "0";
  resetOnNextNumber = false;
}

function backspace(): void {
  display.value = display.value.slice(0, -1) || "0";
}

function insert(value: string): void {
  if (resetOnNextNumber && !isNaN(parseFloat(value))) {
    display.value = "";
    resetOnNextNumber = false;
  }
  if (display.value === "0") display.value = "";
  
  if (value === "sqrt") {
    display.value += "sqrt(";
  } else if (value === "sq") {
    display.value += "sq(";
  } else {
    display.value += value;
  }
}

function toggleSign(): void {
  if (display.value.startsWith("-")) {
    display.value = display.value.slice(1);
  } else {
    display.value = "-" + display.value;
  }
}

function calculate(): void {
  try {
    let expression: string = display.value;
    let result: number = parseSimpleMath(expression);
    display.value = result.toString();
    resetOnNextNumber = true;
  } catch (error) {
    display.value = "Error";
    resetOnNextNumber = true;
  }
}

function parseSimpleMath(expr: string): number {
  expr = expr.replace(/\s/g, '');
  expr = expr.replace(/(\d+)\(/g, '$1*(');
  
  let tokens: string[] = expr.match(/[\d.]+|[+\-*/()]/g) || [];
  if (tokens.length === 0) return 0;
  
  let result: number = parseFloat(tokens[0]) || 0;
  
  for (let i = 1; i < tokens.length - 1; i += 2) {
    let op: string = tokens[i];
    let next: number = parseFloat(tokens[i + 1]) || 0;
    
    switch (op) {
      case '+': result += next; break;
      case '-': result -= next; break;
      case '*': result *= next; break;
      case '/': result /= next; break;
    }
  }
  return result;
}

(window as any).clearDisplay = clearDisplay;
(window as any).backspace = backspace;
(window as any).insert = insert;
(window as any).toggleSign = toggleSign;
(window as any).calculate = calculate;
