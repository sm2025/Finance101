//Define UI Vars
const form = document.querySelector('#task-form');
const cv = document.querySelector('#cv');
const fv = document.querySelector('#fv');
const interest = document.querySelector('#interest');
const nYears = document.querySelector('#nYears');
const result = document.querySelector('#result');
const fvlabel = document.querySelector('#fvlabel')


//Load all Event listeners
loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', Calculate);
}

function Calculate(e) {
    var countVar = 0; 
    countVar = cv.value != "" ? countVar + 1 : countVar; 
    countVar = fv.value != "" ? countVar + 1 : countVar; 
    countVar = interest.value != "" ? countVar + 1 : countVar; 
    countVar = nYears.value != "" ? countVar + 1 : countVar; 

    if (countVar != 3) {
        result.innerHTML = "Enter 3 out of 4 values above to find the missing variable";
        e.preventDefault();
        return; 
    }
    let a; 
    if (fv.value == ""){
        a = cv.value * Math.pow(1 + (interest.value/100),nYears.value);
        result.innerHTML = `Future Value : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    if (cv.value == ""){
        a = fv.value / Math.pow(1 + (interest.value/100),nYears.value);
        result.innerHTML = `Current Value : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    if (nYears.value == ""){
        a = Math.log(fv.value/cv.value) / Math.log(1 + (interest.value/100));
        result.innerHTML = `Number of years : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    if (interest.value == ""){
        a = ((Math.pow(fv.value/cv.value,1/nYears.value))-1)*100;
        result.innerHTML = `Interest Rate : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
}

