let numberField = document.querySelector(".number-field");
let restrictedNumField = document.querySelector(".restricted-number-field");
let restrictedErrorMsg = document.querySelector(".res-error-message");
let errorMsg = document.querySelector(".error-message");
let radioAirtel = document.getElementById("airtel");
let radioGlo = document.getElementById("glo");
let radioEtisalat = document.getElementById("etisalat");
let radioMtn = document.getElementById("mtn");
// let amountField = document.querySelector(".amount-field");

function startApp() {
    // Your entire app should not necessarily be coded inside this 
    // single function (though there's no penalty for that), 
    // so create and use/call additional functions from here
  
    // pls remove the below and make some magic in here!
  // for the input restricted to one carrier 
restrictedNumField.addEventListener("keyup", restrictToCarrier);
// for the input that identifies the mobile carrier/network 
numberField.addEventListener("keyup", identifyCarrier);
}
function restrictToCarrier() {
  // to restrict users from typing any character other than numbers or "+"(for cases when the user wishes to include country code)
  restrictedNumField.value = restrictedNumField.value.replace(/[^\d|\+]/g, "");

  /* checks if a radio button is selected, assigns the pattern of the selected radio button and throws an error if the pattern is not matched*/
  if (radioAirtel.checked) {
    restrictedNumField.pattern =
      "(((\\+)?234{1})|0)(70[18]|80[28]|812|9(0[1247]|12))[0-9]{7}";
    if (restrictedNumField.validity.valid) {
      restrictedErrorMsg.innerHTML = "";
      // restrictedErrorMsg.className = "res-error-message"
    } else {
      showAirtelError();
    }
  } else if (radioGlo.checked) {
    restrictedNumField.pattern =
      "(((\\+)?234)|0)(705|80[57]|81[15]|9(0|1)5)[0-9]{7}";
    if (restrictedNumField.validity.valid) {
      restrictedErrorMsg.innerHTML = "";
      restrictedErrorMsg.className = "res-error-message";
    } else {
      showGloError();
    }
  } else if (radioEtisalat.checked) {
    restrictedNumField.pattern = "(((\\+)?234)|0)(809|81[78]|90[89])[0-9]{7}";
    if (restrictedNumField.validity.valid) {
      restrictedErrorMsg.innerHTML = "";
      restrictedErrorMsg.className = "res-error-message";
    } else {
      showEtisalatError();
    }
  } else if (radioMtn.checked) {
    restrictedNumField.pattern =
      "(((\\+)?234)|0)(70[2346]|8(0[36]|1[0346])|9(0[36]|1[36]))[0-9]{7}";
    if (restrictedNumField.validity.valid) {
      restrictedErrorMsg.innerHTML = "";
      restrictedErrorMsg.className = "res-error-message";
    } else {
      showMtnError();
    }
  } else {
    restrictedErrorMsg.innerHTML = "Select a network provider first";
  }
  resInputMaxLength();
}

/* error functions*/
function showAirtelError() {
  if (restrictedNumField.validity.patternMismatch) {
    restrictedErrorMsg.innerHTML = "Entered value needs to be an Airtel number";
  }
}
function showGloError() {
  if (restrictedNumField.validity.patternMismatch) {
    restrictedErrorMsg.innerHTML = "Entered value needs to be a Glo number";
  }
}
function showEtisalatError() {
  if (restrictedNumField.validity.patternMismatch) {
    restrictedErrorMsg.innerHTML = "Entered value needs to be a 9mobile number";
  }
}
function showMtnError() {
  if (restrictedNumField.validity.patternMismatch) {
    restrictedErrorMsg.innerHTML = "Entered value needs to be an Mtn number";
  }
}
function resInputMaxLength() {
  if (restrictedNumField.value.startsWith("0")) {
    restrictedNumField.maxLength = "11";
    return true;
  }
}
function inputMaxLength() {
  if (numberField.value.startsWith("0")) {
    numberField.maxLength = "11";
    return true;
  }
}

// function to identify the carrier/network
function identifyCarrier() {
  //it returns itself if the input field is empty. like in its original state
  if (numberField.value == "") {
    numberField.previousElementSibling.className = "carrier-logo";
    return;
  }

  //removes all the characters that are not numbers or +
  numberField.value = numberField.value.replace(/[^\d|\+]/g, "");

  //object that stores the regex and name of each mobile carrier
  let mobileCarriers = [
    {
      name: "mtn",
      regEx: /(((\+)?234)|0)(70[2346]|8(0[36]|1[0346])|9(0[36]|1[36]))[0-9]{7}/,
    },
    {
      name: "glo",
      regEx: /^(((\+)?234)|0)(705|80[57]|81[15]|9(0|1)5)[0-9]{7}$/,
    },
    {
      name: "airtel",
      regEx: /(((\+)?234{1})|0)(70[18]|80[28]|812|9(0[1247]|12))[0-9]{7}/,
    },
    {
      name: "etisalat",
      regEx: /(((\+)?234)|0)(809|81[78]|90[89])[0-9]{7}/,
    },
  ];

  /*loops through the object, if the number entered matches the regex pattern
   it adds the name property of the object as a class which is added to the css file to display the logo*/
  for (let i = 0; i < mobileCarriers.length; i++) {
    if (numberField.value.match(mobileCarriers[i].regEx)) {
      errorMsg.innerHTML = "";
      numberField.previousElementSibling.classList.add(mobileCarriers[i].name);
      return true;
    } else {
      errorMsg.innerHTML = "Entered value does not match any mobile carrier";
      inputMaxLength();
    }
  }
}
  
  // ======= DO NOT EDIT ============== //
  export default startApp;
  // ======= EEND DO NOT EDIT ========= //