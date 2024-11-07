/* 
  Homework 9b Question 3
*/

document.getElementById('myForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  fetch("/articles", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(result => {
    document.getElementById('results').textContent = result;
  })
  .catch(err => {
    console.log(err);
  });
});