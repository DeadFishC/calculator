let aValue = "0";
let bValue = "";
let clearWhenEntering = false;
let operatorUsed = "";

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0)
    {
        clearCalc();
        return "DIV BY 0";
    }
    return a / b;
}

function operate(a, operator, b) {
    clearWhenEntering = true;
    bValue = ""
    if (a == null || b == null || isNaN(a) || isNaN(b) || a === "" || b === ""){
        clearCalc();
        return document.getElementById("display").innerHTML = "ERROR";
    }
    if (operator === "+") {
        aValue = add(a, b);
        return resultOut(aValue);
    }
    if (operator === "-") {
        aValue = subtract(a, b);
        return resultOut(aValue);
    }
    if (operator === "*") {
        aValue = multiply(a, b);
        return resultOut(aValue);
    }
    if (operator === "/") {
        aValue = divide(a, b);
        return resultOut(aValue);
    }
}

function operatorEntered(operator) {
    if (operatorUsed != "") {
        operate(aValue, operatorUsed, bValue);
        operatorUsed = operator;
    }
    else {
        clearWhenEntering = true;
        operatorUsed = operator;
    }
}

function mustOperate() {
    if (operatorUsed == "")
        return;
    operate(aValue, operatorUsed, bValue);
    operatorUsed = "";
}

function displayOut(n) {
    if (n == '-')
    {
        if (clearWhenEntering && operatorUsed != "") {
            document.getElementById("display").innerHTML = "-0";
            clearWhenEntering = false;
        }
        else {
            if (document.getElementById("display").innerHTML.toString().indexOf('-') == -1)
                document.getElementById("display").innerHTML = '-' + document.getElementById("display").innerHTML;
            else
                document.getElementById("display").innerHTML = document.getElementById("display").innerHTML.toString().replace('-','');
        }
        if (operatorUsed == "")
            aValue = document.getElementById("display").innerHTML;
        else
            bValue = document.getElementById("display").innerHTML;
        return;
    }
    if (n == ".") {
        if (clearWhenEntering) {
            document.getElementById("display").innerHTML = "0.";
            clearWhenEntering = false;
            return;
        }
        else {
            if (aValue.toString().indexOf('.') == -1) {
                document.getElementById("display").innerHTML += '.';
            }
            return;
        }
    }
    if (document.getElementById("display").innerHTML === "0" || document.getElementById("display").innerHTML === "-0" 
        || clearWhenEntering || isNaN(document.getElementById("display").innerHTML)) 
    {
        document.getElementById("display").innerHTML = document.getElementById("display").innerHTML.toString() == "-0" ? "-" + n : n;
        if (operatorUsed == "")
            aValue = document.getElementById("display").innerHTML;
        else {
            bValue = document.getElementById("display").innerHTML;
            clearWhenEntering = false;
        }
    }
    else
        if (document.getElementById("display").innerHTML.toString().replace('.', '').length < 8) {
            document.getElementById("display").innerHTML += n;
            if (operatorUsed == "")
                aValue = document.getElementById("display").innerHTML;
            else
                bValue = document.getElementById("display").innerHTML;
        }
}

function resultOut(res) {
    return res.toString().replace('.', '').replace('-', '').length > 8 ? 
            document.getElementById("display").innerHTML = res.toExponential(4) : 
                document.getElementById("display").innerHTML = res;
}

function clearCalc() {
    document.getElementById("display").innerHTML = 0;
    aValue = "";
    bValue = "";
    clearWhenEntering = false;
    operatorUsed = "";
    console.log("Cleared");
}