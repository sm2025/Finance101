//Define UI Vars
const form = document.querySelector('#task-form');
const cv = document.querySelector('#cv');
const interest = document.querySelector('#interest');
const cashflow = document.querySelector('#casflow');
const result = document.querySelector('#result');


//Load all Event listeners
loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', Calculate);
}

function Calculate(e) {
    var countVar = 0; 
    countVar = cv.value != "" ? countVar + 1 : countVar; 
    countVar = cashflow.value != "" ? countVar + 1 : countVar; 
    countVar = interest.value != "" ? countVar + 1 : countVar; 

    if (countVar != 2) {
        result.innerHTML = "Enter 2 out of 3 values above to find the missing variable";
        e.preventDefault();
        return; 
    }
    let a; 
    if (cv.value == ""){
        a = cashflow.value/(interest.value/100);
        result.innerHTML = `Current Value : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    
    if (interest.value == ""){
        a = cashflow.value/cv.value*100;
        result.innerHTML = `Interest Rate (%) : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    if (cashflow.value == ""){
        a = cv.value*interest.value/100;
        result.innerHTML = `Cashflow : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
}

