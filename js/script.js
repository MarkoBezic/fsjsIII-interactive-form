const inputNameEl = document.querySelector("#name");
const inputEmailEl = document.querySelector("#email");
const inputOtherJobRoleEl = document.querySelector("#other-job-role");
const selectJobRoleEl = document.querySelector("#title");
const selectColorEl = document.querySelector("#color");
const selectDesignEl = document.querySelector("#design");
const colorOptions = document.querySelectorAll("[data-theme]");
const registerForActivities = document.querySelector("#activities");
let totalActivitiesCost = 0;
const selectPaymentEl = document.querySelector("#payment");
const creditCardEl = document.querySelector("#credit-card");
const inputCreditCardNumEl = document.querySelector("#cc-num");
const inputZipcodeEl = document.querySelector("#zip");
const inputCvvEl = document.querySelector("#cvv");
const paypalEl = document.querySelector("#paypal");
const bitcoinEl = document.querySelector("#bitcoin");
const formEl = document.querySelector("form");

// Basic Info //

//Set name field to focus state on page load
inputNameEl.setAttribute("focus", true);
inputNameEl.focus();

//Hide input field of 'other' job role
inputOtherJobRoleEl.style.display = "none";

//If otther is selected unhide the other job role input field
selectJobRoleEl.addEventListener("change", () => {
  if (selectJobRoleEl.value === "other") {
    inputOtherJobRoleEl.style.display = "inherit";
  } else {
    inputOtherJobRoleEl.style.display = "none";
  }
});

// T-Shirt info //

//Disable select color field on page load
selectColorEl.disabled = true;

//Listen for design selection and update available colors accordingly
selectDesignEl.addEventListener("change", () => {
  selectColorEl.disabled = false;
  selectColorEl.firstElementChild.selected = true;
  for (let i = 0; i < colorOptions.length; i++) {
    const dataThem = colorOptions[i].getAttribute("data-theme");
    if (selectDesignEl.value === dataThem) {
      colorOptions[i].hidden = false;
    } else {
      colorOptions[i].hidden = true;
    }
  }
});

// Register for Activities //

//When activity checked/unchecked update total accordingly
registerForActivities.addEventListener("change", (e) => {
  const individualActivityCost = e.target.getAttribute("data-cost");
  const activitiesCostEl = document.querySelector(".activities-cost");

  if (e.target.checked) {
    totalActivitiesCost += Number(individualActivityCost);
  } else {
    totalActivitiesCost -= Number(individualActivityCost);
  }
  activitiesCostEl.innerHTML = `Total: $${totalActivitiesCost}.00`;
});

// Payment info: //

// Functions to set payment methods
setCreditCardAsPayment = () => {
  selectPaymentEl[1].selected = true;
  creditCardEl.hidden = false;
  paypalEl.hidden = true;
  bitcoinEl.hidden = true;
};

setPaypalAsPayment = () => {
  creditCardEl.hidden = true;
  paypalEl.hidden = false;
  bitcoinEl.hidden = true;
};

setBitcoinAsPayment = () => {
  creditCardEl.hidden = true;
  paypalEl.hidden = true;
  bitcoinEl.hidden = false;
};

//defualt payment method
setCreditCardAsPayment();

//Update payment info fields based on selection
selectPaymentEl.addEventListener("change", () => {
  if (selectPaymentEl[1].selected) {
    setCreditCardAsPayment();
  } else if (selectPaymentEl[2].selected) {
    setPaypalAsPayment();
  } else if (selectPaymentEl[3].selected) {
    setBitcoinAsPayment();
  }
});

//Form validation
////validator functions
nameValidator = () => {
  const regEx = /[a-zA-Z]/g;
  const string = inputNameEl.value;
  const nameIsValid = regEx.test(string);
  return nameIsValid;
};

emailValidator = () => {
  const regEx = /^[^@ ^]+@[^][^@]+\.com/g;
  const string = inputEmailEl.value;
  const emailIsValid = regEx.test(string);
  return emailIsValid;
};

activitiesValidator = () => {
  const activtyIsValid = totalActivitiesCost > 0;
  return activtyIsValid;
};

cardNumberValidator = () => {
  const regEx = /^[0-9]{13,16}$/g;
  const string = inputCreditCardNumEl.value;
  const cardNumberIsValid = regEx.test(string);
  return cardNumberIsValid;
};

zipCodeValidator = () => {
  const regEx = /^[0-9]{5}$/g;
  const string = inputZipcodeEl.value;
  const zipCodeIsValid = regEx.test(string);
  return zipCodeIsValid;
};

cvvValidator = () => {
  const regEx = /^[0-9]{3}$/g;
  const string = inputCvvEl.value;
  const cvvIsValid = regEx.test(string);
  return cvvIsValid;
};

creditCardValidator = () => {
  if (selectPaymentEl[1].selected) {
    const creditCardinfoIsValid =
      cardNumberValidator() && zipCodeValidator() && cvvValidator();
    return creditCardinfoIsValid;
  }
};

formEl.addEventListener("submit", (e) => {
  if (!nameValidator()) {
    e.preventDefault();
    console.log("nameValidator prevented Submission");
  }
  if (!emailValidator()) {
    e.preventDefault();
    console.log("emailValidator prevented Submission");
  }
  if (!activitiesValidator()) {
    e.preventDefault();
    console.log("activityValidator prevented Submission");
  }
  if (!creditCardValidator()) {
    e.preventDefault();
    console.log("creditCardValidator prevented Submission");
  }
});
