//Define UI Vars
const form = document.querySelector('#task-form');
const cv = document.querySelector('#cv');
//const fv = document.querySelector('#fv');
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
    countVar = cv.value != "" ? countVar + 1 : countVar; 
    //countVar = fv.value != "" ? countVar + 1 : countVar; 
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
    if (cv.value == ""){
        a = calculateCV();
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

function calculateCV(intrate = interest.value){
    let a = cashflow.value * (1-1/(Math.pow(1+intrate/100,npayments.value)))/(intrate/100);
    return a; 
}
function calculatenPayments(){
    let a = Math.log(1/(1- (cv.value / cashflow.value * interest.value/100)))/Math.log(1+ interest.value/100);
    return a;
}

function calculateCashflow(){
    return cv.value/((1-1/(Math.pow(1+interest.value/100,npayments.value)))/(interest.value/100));
}

function calculateInterest(){
    let threshold = 0.5; 
    let i = 10; 
    let estCV; 
    let counter = 0;
    estCV = calculateCV(intrate = i);
    let oss = 0;
    let osseven = 0; 
    while ( Math.abs(estCV - cv.value) > 1 && counter <1000) {
        if (cv.value > estCV ) {
            i = i*(1-threshold);
            oss++;
        } else {
            i = i*(1+threshold);
            oss--;
        }
        estCV = calculateCV(intrate = i);
        if (counter%2 == 0) {
            if (osseven != oss){
                osseven = oss; 
            } else {
                threshold = threshold * .6; 
            }
        }
        counter++;
    }
    return i; 
}