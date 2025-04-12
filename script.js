var sel = document.querySelectorAll(".currency");
var btn = document.querySelector(".click");
var input1 = document.querySelector(".input1");
var h3 = document.querySelector(".h3");
var h2 = document.querySelector(".h2");
fetch("https://api.frankfurter.app/currencies")
  .then((res) => {
   
    return res.json();
  })

  .then((res) => {
    return display(res);
  })
  .catch((error)=>{
    h3.innerHTML = error.message + " network issue" 
  })

function display(res) {
  let curr = Object.entries(res);
  for (let i = 0; i < curr.length; i++) {
    op = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
    sel[0].innerHTML += op;
    sel[1].innerHTML += op;
  }
}

btn.addEventListener("click", () => {
  let curr1 = sel[0].value;
  let curr2 = sel[1].value;
  let currvalue = input1.value;
  console.log(curr1);

  curr1 == "" || curr2 == ""
    ? (h2.innerHTML = "pls select country")
    : (h2.innerHTML = "");
   if (curr1 == curr2) {
    h3.textContent = "Same counrty so not process";
  } else {
    currency(curr1, curr2, currvalue);
  }
});

function currency(curr1, curr2, currvalue) {
  if (currvalue == "") {
    h3.innerHTML = "Enter the amount";
  } else {
    h3.innerHTML = "";
  }
  let host = "api.frankfurter.app";
  fetch(`https://${host}/latest?amount=${currvalue}&from=${curr1}&to=${curr2}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let a = Object.values(data.rates)[0];
      console.log(a);
      document.querySelector(".result").value = a;
    });
}

function remove(){
  sel[0].value = ""
  sel[1].value = ""
  document.querySelector(".result").value = "";
  input1.value =""
}
