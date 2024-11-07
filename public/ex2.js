/* 
  Homework 9b Question 2
*/

let count = 1;
const content = document.getElementById('content');

function initAddCountry() {
  document.getElementById('add' + count).addEventListener('click', (element) => {
    count += 1;
    let rawHTML = `<div class="countryInput">
        <label>#${count}: </label>
        <input type="text" id="country${count}"/> 
        Year Visited: <input type="number" min="1900" max="2099" id="year${count}"/>
        <button id="add${count}">+</button>
      </div>`;
    
    let parsedHtml = new DOMParser().parseFromString(rawHTML, "text/html");
    let newRow = parsedHtml.querySelector('.countryInput');
    content.appendChild(newRow);
    element.target.remove();
    initAddCountry();
  });
}

initAddCountry();

document.getElementById('submit').addEventListener('click', () => {

  let postData = {
    'name': document.getElementById('username').value,
    'countries': []
  }
  for (let i = 1; i <= count; i++) {
    country = {
      'name': document.getElementById('country' + i).value,
      'year': document.getElementById('year' + i).value
    }
    postData.countries.push(country);
  }

  fetch("api/countries", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById('results').textContent = result;
  })
  .catch(err => {
    console.log(err);
  });
});


