// list of countries for select-option
const countrylist = {
    INR: "IN",
    USD: "US",
    JPY: "JP"
}
// api url 
const api_url =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// accessing element from html using dom
const content = document.querySelectorAll(".content select");
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const btn = document.querySelector("form button")
const message = document.querySelector(".msg")

// accesing country from country list to select option by creating element
for(let select of content)
{
    for(code in countrylist)
    {
        let opt = document.createElement("option");
        opt.innerText = code;
        opt.value = code;
        if (select.name === "select-from" && code === "USD") 
        {
            opt.selected = "selected";
        } 
        else if (select.name === "select-to" && code === "INR") 
        {
            opt.selected = "selected";
        }
        select.append(opt);
    }
}

// Calculate exchange rate and final amount using api
const update = async () =>{
    let amount = document.querySelector(".amt input");
    let amtVal = amount.value;

   
    const url = `${api_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let result = await fetch(url);
    let data = await result.json();
    let excRate = data[toCurr.value.toLowerCase()];
    let finalAmt = (amtVal * excRate);
    
    
    if(amtVal==="" || amtVal<1){
        
        message.innerText = "Amount should be greater than 0";
        message.classList.add("error");
        finalAmt="";
        
    }
    else{
        finalAmt = parseFloat(finalAmt.toFixed(2));
        message.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
        message.classList.remove("error");
     }
    
};

// on loading page, converter show 1USD=83.29 INR
window.addEventListener("load",()=>{
    update();
})

// when button get clicked, it convert currency
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    update();
})


