const inputNameEl = document.querySelector("#name");
const inputOtherJobRoleEl = document.querySelector("#other-job-role");
const selectJobRoleEl = document.querySelector("#title");
const selectColorEl = document.querySelector("#color");
const selectDesignEl = document.querySelector("#design");
const colorOptions = document.querySelectorAll("[data-theme]");

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

//Disable select color field on page load
selectColorEl.setAttribute("disabled", true);

//Listen for design selection and update available colors accordingly
selectDesignEl.addEventListener("change", () => {
  selectColorEl.removeAttribute("disabled");
  if (selectDesignEl.value === "js puns") {
    for (let i = 0; i < colorOptions.length; i++) {
      const dataTheme = colorOptions[i].getAttribute("data-theme");
      colorOptions[i].removeAttribute("hidden");
      if (dataTheme !== "js puns") {
        colorOptions[i].setAttribute("hidden", true);
      }
    }
  } else if (selectDesignEl.value === "heart js") {
    for (let i = 0; i < colorOptions.length; i++) {
      const dataTheme = colorOptions[i].getAttribute("data-theme");
      colorOptions[i].removeAttribute("hidden");
      if (dataTheme !== "heart js") {
        colorOptions[i].setAttribute("hidden", true);
      }
    }
  }
});
