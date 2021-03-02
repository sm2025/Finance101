//Define UI Vars
const form = document.querySelector('#task-form');
// const cv = document.querySelector('#cv');
const fv = document.querySelector('#fv');
const interest = document.querySelector('#interest');
const npayments = document.querySelector('#npayments');
const cashflow = document.querySelector('#cashflow');
const result = document.querySelector('#result');


//Load all Event listeners
loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', Calculate);
}

function Calculate(e) {
    var countVar = 0; 
    // countVar = cv.value != "" ? countVar + 1 : countVar; 
    countVar = fv.value != "" ? countVar + 1 : countVar; 
    countVar = interest.value != "" ? countVar + 1 : countVar; 
    countVar = npayments.value != "" ? countVar + 1 : countVar; 
    countVar = cashflow.value != "" ? countVar + 1 : countVar;

    if (countVar != 3) {
        result.innerHTML = "Enter 3 out of 4 values above to find the missing variable";
        e.preventDefault();
        return; 
    }
    let a; 
    // if (fv.value == ""){
    //     a = calculateFV();
    //     result.innerHTML = `Future Value : ${a.toString()}`;
    //     e.preventDefault();
    //     return; 
    // }
    if (fv.value == ""){
        a = calculateFV();
        result.innerHTML = `Current Value : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    if (cashflow.value == ""){
        a = calculateCashflow();
        result.innerHTML = `Cash flow : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    if (npayments.value == ""){
        a = calculatenPayments();
        result.innerHTML = `No. of Payments : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
    if (interest.value == ""){
        a = calculateInterest();
        result.innerHTML = `Interest : ${a.toString()}`;
        e.preventDefault();
        return; 
    }
}

function calculateFV(intrate = interest.value){
    let a = cashflow.value * (Math.pow(1+intrate/100,npayments.value)-1)/(intrate/100)*(1+intrate/100);
    return a; 
}
function calculatenPayments(){
    let a = Math.log((fv.value/cashflow.value/(1+interest.value/100) *interest.value/100) +1)/Math.log(1+interest.value/100) ;
    return a;
}

function calculateCashflow(){
    return fv.value/((Math.pow(1+interest.value/100,npayments.value)-1)/(interest.value/100))/(1+interest.value/100);
}

function calculateInterest(){
    let threshold = 0.5; 
    let i = 10; 
    let estFV; 
    let counter = 0;
    estFV = calculateFV(intrate = i);
    let oss = 0;
    let osseven = 0; 
    while ( Math.abs(estFV - fv.value) > 1 && counter <1000) {
        if (fv.value < estFV ) {
            i = i*(1-threshold);
            oss++;
        } else {
            i = i*(1+threshold);
            oss--;
        }
        estFV = calculateFV(intrate = i);
        if (counter%2 == 0) {
            if (osseven != oss){
                osseven = oss; 
            } else {
                threshold = threshold * .6; 
            }
        }
        counter++;
    }
    console.log(counter);
    return i; 
}