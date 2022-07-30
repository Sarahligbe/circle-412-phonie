
let numField = document.querySelector(".number-field");
let errorMsg = document.querySelector(".error-message");
let radioAirtel = document.getElementById("airtel");
let radioGlo = document.getElementById("glo");
let radioEtisalat = document.getElementById("etisalat");
let radioMtn = document.getElementById("mtn");
let mobileCarrierName = document.getElementsByName("mobile-carrier");
// let amountField = document.querySelector(".amount-field");

function startApp() {
    // Your entire app should not necessarily be coded inside this 
    // single function (though there's no penalty for that), 
    // so create and use/call additional functions from here
  
    // pls remove the below and make some magic in here! 
numField.addEventListener("keyup", restrictToCarrier);

}
function restrictToCarrier() {
  // to restrict users from typing any character other than numbers or "+"(for cases when the user wishes to include country code)
  numField.value = numField.value.replace(/[^\d|\+]/g, "");
   if (numField.value == "") {
    numField.previousElementSibling.className = "carrier-logo";
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
    numField.pattern =
      mobileCarriers[1].pattern;
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
    numField.pattern =
      mobileCarriers[0].pattern;
    if (numField.validity.valid) {
      errorMsg.innerHTML = "";
      errorMsg.className = "error-message";
    } else {
      showMtnError();
    }
  //to identify the mobile network of the inputed number  
  } else {
    autoCheck()
    for (let i = 0; i < mobileCarriers.length; i++) {
        if (numField.value.match(mobileCarriers[i].regEx)) {
          errorMsg.innerHTML = "";
          numField.previousElementSibling.classList.add(mobileCarriers[i].name);  
          return true;
        } else {
          errorMsg.innerHTML = "Entered value does not match any mobile carrier";
          inputMaxLength();
        }    
    }
  }
  inputMaxLength();
}
// to automatically check a radio button after the mobile network has been identified
function autoCheck() {
  if (numField.value.match(mobileCarriers[0].regEx)) {
    mobileCarrierName[0].checked = true
  } else if (numField.value.match(mobileCarriers[1].regEx)) {
    mobileCarrierName[1].checked = true
  } else if (numField.value.match(mobileCarriers[2].regEx)) {
    mobileCarrierName[2].checked = true
  } else if (numField.value.match(mobileCarriers[3].regEx)) {
    mobileCarrierName[3].checked = true
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
//to set the maxlength of the numbers
function inputMaxLength() {
  if (numField.value.startsWith("0")) {
    numField.maxLength = "11";
    return true;
  } else if (numField.innerHTML == "") {
      numField.maxLength = "14";
    }  
}
//mobile network array
let mobileCarriers = [
    {
      name: "mtn",
      regEx: /(((\+)?234)|0)(70[2346]|8(0[36]|1[0346])|9(0[36]|1[36]))/,
      pattern: "(((\\+)?234)|0)(70[2346]|8(0[36]|1[0346])|9(0[36]|1[36]))[0-9]{7}"
    },
    {
      name: "glo",
      regEx: /(((\+)?234)|0)(705|80[57]|81[15]|9(0|1)5)/,
      pattern: "(((\\+)?234)|0)(705|80[57]|81[15]|9(0|1)5)[0-9]{7}"
    },
    {
      name: "airtel",
      regEx: /(((\+)?234{1})|0)(70[18]|80[28]|812|9(0[1247]|12))/,
      pattern: "(((\\+)?234{1})|0)(70[18]|80[28]|812|9(0[1247]|12))[0-9]{7}"
    },
    {
      name: "etisalat",
      regEx: /(((\+)?234)|0)(809|81[78]|90[89])/,
      pattern: "(((\\+)?234)|0)(809|81[78]|90[89])[0-9]{7}"
    },
  ];
 
  // ======= DO NOT EDIT ============== //
  export default startApp;
  // ======= EEND DO NOT EDIT ========= //