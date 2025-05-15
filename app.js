const BASE_URL = "https://v6.exchangerate-api.com/v6/e1f381e9148026b4fd1de316/latest";

const dropdown = document.getElementsByTagName("select");
const btn = document.querySelector("#convertBtn");
const from = document.querySelector("#fromCurrency");
const to = document.querySelector("#toCurrency");
const result = document.querySelector("#result");
const swapBtn = document.querySelector("#swap");


for(let s of dropdown){
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        if(s.name === "from" && currCode === "USD"){
            newOption.selected = true;
        } else if(s.name === "to" && currCode === "INR"){
            newOption.selected = true;
        }
        s.append(newOption);
    }
}

swapBtn.addEventListener("click", () => {
  // Swap the values of the from and to currency dropdowns
  const fromValue = from.value;
  const toValue = to.value;
  from.value = toValue;
  to.value = fromValue;
});


btn.addEventListener("click", async (evt) => {
    let amount = document.querySelector("#amount");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 0;
    }
    
    try {
        const URL = `${BASE_URL}/${from.value}`;
        const response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log(data);

        let toCurrencyCode = to.value;
        let exchangeRate = data.conversion_rates[toCurrencyCode];

        console.log(`Exchange rate for ${from.value} to ${toCurrencyCode}:`, exchangeRate);

        // Convert the amount
        let convertedAmount = parseFloat(amtVal) * exchangeRate;
        console.log(`Converted Amount: ${convertedAmount}`);

        result.innerHTML = `<p>${convertedAmount.toFixed(2)}</p>`;
    } catch (error) {
        console.error('Error fetching data:', error);
        result.innerHTML = '<p>Error occurred while fetching conversion rates</p>';
    }
});
