function startApp() {
    // Your entire app should not necessarily be coded inside this 
    // single function (though there's no penalty for that), 
    // so create and use/call additional functions from here
  
    // pls remove the below and make some magic in here! 
numField.addEventListener("keyup", restrictToCarrier);
howItWorksPopupClick.addEventListener("click", openPopup);
howItWorksPopupBtn.addEventListener("click", closePopup);
payBtn.addEventListener("click", pay);
resetBtn.addEventListener("click", reset);
amountField.addEventListener("keyup", amntField);

}

const numField = document.querySelector(".number-field");
const errorMsg = document.querySelector(".error-message");
const radioAirtel = document.getElementById("airtel");
const radioGlo = document.getElementById("glo");
const radioEtisalat = document.getElementById("etisalat");
const radioMtn = document.getElementById("mtn");
const mobileCarrierName = document.getElementsByName("mobile-carrier");
const howItWorksPopupClick = document.querySelector("#how-it-works-click");
const howItWorksPopup = document.querySelector(".how-it-works-popup");
const howItWorksPopupBtn = document.querySelector("#how-it-works-btn");
const amountField = document.querySelector(".amount-field");
const payBtn = document.querySelector("#pay-btn");
const resetBtn = document.querySelector("#reset-btn");
const form = document.getElementById("my-form");
const amntErrorMsg = document.querySelector(".amnt-error-message");

function restrictToCarrier() {
  // to restrict users from typing any character other than numbers or "+"(for cases when the user wishes to include country code)
  numField.value = numField.value.replace(/[^\d|\+]/g, "");
  if (numField.value == "") {
    numField.previousElementSibling.className = "carrier-logo";
    errorMsg.innerHTML = "";
    autoUncheck();
    return;
  }
  /* checks if a radio button is selected, assigns the pattern of the selected radio button and throws an error if the pattern is not matched*/
  if (radioAirtel.checked) {
    numField.pattern = mobileCarriers[2].pattern;
    if (numField.validity.valid) {
      errorMsg.innerHTML = "";
    } else {
      showAirtelError();
    }
  } else if (radioGlo.checked) {
    numField.pattern = mobileCarriers[1].pattern;
    if (numField.validity.valid) {
      errorMsg.innerHTML = "";
      errorMsg.className = "error-message";
    } else {
      showGloError();
    }
  } else if (radioEtisalat.checked) {
    numField.pattern = mobileCarriers[3].pattern;
    if (numField.validity.valid) {
      errorMsg.innerHTML = "";
      errorMsg.className = "error-message";
    } else {
      showEtisalatError();
    }
  } else if (radioMtn.checked) {
    numField.pattern = mobileCarriers[0].pattern;
    if (numField.validity.valid) {
      errorMsg.innerHTML = "";
      errorMsg.className = "error-message";
    } else {
      showMtnError();
    }
    //to identify the mobile network of the inputed number
  } else {
    autoCheck();
    for (let i = 0; i < mobileCarriers.length; i++) {
      if (numField.value.match(mobileCarriers[i].regEx)) {
        errorMsg.innerHTML = "";
        numField.previousElementSibling.classList.add(mobileCarriers[i].name);
        return true;
      } else {
        errorMsg.innerHTML = "Entered value does not match any mobile carrier";
      }
    }
  }
  inputMaxLength();
}

//mobile network array
const mobileCarriers = [
  {
    name: "mtn",
    regEx: /(((\+)?234)|0)(70[2346]|8(0[36]|1[0346])|9(0[36]|1[36]))/,
    pattern:
      "(((\\+)?234)|0)(70[2346]|8(0[36]|1[0346])|9(0[36]|1[36]))[0-9]{7}",
  },
  {
    name: "glo",
    regEx: /(((\+)?234)|0)(705|80[57]|81[15]|9(0|1)5)/,
    pattern: "(((\\+)?234)|0)(705|80[57]|81[15]|9(0|1)5)[0-9]{7}",
  },
  {
    name: "airtel",
    regEx: /(((\+)?234{1})|0)(70[18]|80[28]|812|9(0[1247]|12))/,
    pattern: "(((\\+)?234{1})|0)(70[18]|80[28]|812|9(0[1247]|12))[0-9]{7}",
  },
  {
    name: "etisalat",
    regEx: /(((\+)?234)|0)(809|81[78]|90[89])/,
    pattern: "(((\\+)?234)|0)(809|81[78]|90[89])[0-9]{7}",
  },
];

//how it works popup
function openPopup() {
  howItWorksPopup.classList.add("open-popup");
}
function closePopup() {
  howItWorksPopup.classList.remove("open-popup");
}
// to automatically check a radio button after the mobile network has been identified
// to automatically check a radio button after the mobile network has been identified
function autoCheck() {
  mobileCarrierName.forEach((radio, i) => {
    const regexPattern = mobileCarriers[i].regEx;
    if (numField.value.match(mobileCarriers[i].regEx)) {
      mobileCarrierName[i].checked = true;
    }
  });
}
// to uncheck the radio buttons
function autoUncheck() {
  for (let i = 0; i < mobileCarrierName.length; i++) {
    mobileCarrierName[i].checked = false;
  }
}
/* error functions*/
function showAirtelError() {
  if (numField.validity.patternMismatch) {
    errorMsg.innerHTML = "Entered value needs to be an Airtel number";
  }
}
function showGloError() {
  if (numField.validity.patternMismatch) {
    errorMsg.innerHTML = "Entered value needs to be a Glo number";
  }
}
function showEtisalatError() {
  if (numField.validity.patternMismatch) {
    errorMsg.innerHTML = "Entered value needs to be a 9mobile number";
  }
}
function showMtnError() {
  if (numField.validity.patternMismatch) {
    errorMsg.innerHTML = "Entered value needs to be an Mtn number";
  }
}
function showError() {
  if (numField.validity.valueMissing) {
    errorMsg.innerHTML = "Enter a value";
    amntErrorMsg.innerHTML = "Enter a value";
  }
}
function amntFieldError() {
  if (amountField.validity.rangeUnderflow) {
    amntErrorMsg.innerHTML = "Only values greater than 50";
  }
}
//to set the maxlength of the numbers
function inputMaxLength() {
  if (numField.value.startsWith("0")) {
    numField.maxLength = "11";
    return true;
  } else if (numField.innerHTML == "") {
    numField.maxLength = "14";
  }
}

//amount field minimum value restriction
function amntField() {
  if (amountField.value == "") {
    amntErrorMsg.innerHTML = "";
    return;
  }
  if (amountField.validity.valid) {
    amntErrorMsg.innerHTML = "";
  }
  amntFieldError();
}

//pay button
function pay() {
  let mobileCarrierValue;
  for (let i = 0; i < mobileCarrierName.length; i++) {
    if (mobileCarrierName[i].checked) {
      mobileCarrierValue = mobileCarrierName[i].value;
    }
  }
  if (!numField.validity.valid || !amountField.validity.valid) {
    showError();
  } else {
    alert(
      `You successfully purchased #${amountField.value} worth of ${mobileCarrierValue} airtime for ${numField.value}`
    );
  }
}

function reset() {
  form.reset();
  numField.previousElementSibling.className = "carrier-logo";
}
  // ======= DO NOT EDIT ============== //
  export default startApp;
  // ======= EEND DO NOT EDIT ========= //