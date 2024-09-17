const tipPerEl = document.querySelector(".tip-per");
const totalPerEl = document.querySelector(".total-per");
const errorMsgEl = document.querySelector(".error-msg");
const billAmountEl = document.getElementById("bill-amount");
const numPeopleEl = document.getElementById("number-people");

function calculate(tip) {
    let billAmount = billAmountEl.value;
    let numPeople = numPeopleEl.value;

    // check if a whole number >= 1
    if (numPeople >= 1 && numPeople % 1 === 0) {
        errorMsgEl.style.display = "none";
    } else if (numPeople === "") {
        // set default number of people to 1 if nothing entered
        numPeople = 1;
    } else {
        errorMsgEl.style.display = "block";
        return;
    }

    let tipPer = (tip * billAmount) / numPeople;
    let totalPer = billAmount / numPeople + tipPer;
    let roundTip = fixMoney(tipPer);
    let roundTotal = fixMoney(totalPer);
    tipPerEl.textContent = `$${roundTip}`;
    totalPerEl.textContent = `$${roundTotal}`;
}

function fixMoney(n) {
    return (Math.round(n * 100) / 100).toFixed(2);
}

// TIP buttons on click:
// get button textContent and convert to percent
document.querySelectorAll(".tips").forEach((el) => {
    el.addEventListener("click", () => {
        let tip = +el.textContent.slice(0, -1) / 100;
        calculate(tip);
    });
});

// CUSTOM tip on click:
// get custom tip value on change, convert to percent
document.querySelector("#custom").addEventListener("input", (e) => {
    let tip = e.target.value / 100;
    calculate(tip);
});

// RESET BUTTON on click:
document.querySelector(".reset-btn").addEventListener("click", () => {
    tipPerEl.textContent = "$0.00";
    totalPerEl.textContent = "$0.00";
    billAmountEl.value = "";
    numPeopleEl.value = "";
    document.querySelector("#custom").value = "";
});
