let dropdown = document.querySelectorAll(".dropdown select");
let baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"


for (select of dropdown) {

  for ( CurCode in countryList ) {

    let newOption = document.createElement("option");
    newOption.innerText = CurCode;                               // added value of [CurCode] in [Options]
    newOption.value = CurCode;                                   // added value of [CurCode] in [Value attribute] in [Option Tag]  
    select.append(newOption);
    
    if (select.name === "from" && CurCode === "USD") {           // Making USD Default on Left Side
        newOption.selected ="Selected"                           // Mark As Selected
    }

    else if (select.name === "to" && CurCode === "INR") {        // Making USD Default on Left Side
        newOption.selected ="Selected"                           // Mark As Selected
    }

   }

   select.addEventListener("change", (event) => {               
    updateFlag(event.target);                                    // Locate the [selected event target] and pass it in [updateFlag] function.                              
  });

}


const updateFlag = (element) => {
 
   let CurrElem = element.value;                                                    // Locate the [current Element].                                      
   let newSrc = `https://flagsapi.com/${countryList[CurrElem]}/flat/64.png`;        // Getting the [Country Code] passing it in [URL] to [change Flag]
   let currImg = element.parentElement.querySelector("img");                        // Selecting [Current Element Parent Element] [img]
   currImg.src = newSrc;                                                            // Updating [New link in Img]

}


let btn = document.querySelector("button");
let fromCur = document.querySelector(".from select");
let toCur = document.querySelector(".to select");


const showCurrencyValue = async (event) => {

    event.preventDefault();                                                         // Prevent the form to [submit]
    let input = document.querySelector("input");
    let inputValue = input.value;                                                   // Taken the [value of Input]
    let msg = document.querySelector(".msg");

    if (inputValue === " " || inputValue < 1) {                                     // Set Condition If [Input Value] is [Blank] or [Less than 1] 
        inputValue = 1;
        input.value = 1;
        msg.innerText = "Please Enter Value 1 or Greater tha 1"
        msg.style.color = "red";
    }


    let newBaseUrl = `${baseUrl}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`   // Change Base Url to [Fetch Currency Value]
    let response = await fetch(newBaseUrl);                                                          // [Fetch Currency Value]
    let resData = await response.json();                                                             // [Converted] it to [Js Readable Object]
    let CurRate = resData[toCur.value.toLowerCase()]                                                 // Get the [Value] of [Country Code]
    let finalValue = inputValue * CurRate;                                                           // [Multiply] the [Input Value] for Getting Result
    msg.innerText = finalValue.toFixed(2);                                                           // Getting the [Final Currency Value] with [two decimal places].

}

btn.addEventListener("click", (showCurrencyValue));

window.addEventListener("load", showCurrencyValue);                   // Call [showCurrencyValue()] function on [Window Load] to show [Currency Value] with [Page Load] 