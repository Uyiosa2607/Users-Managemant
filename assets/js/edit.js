let form = document.getElementById("myform");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  
  event.preventDefault();

  const clicked = event.target

  const data = clicked.getAttribute("data-id")

  submitData(data);
}
// Defining async function
async function submitData(data) {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let country = document.getElementById("country").value;
  let relationship = document.getElementById("relationship").value;
  const id = data

  // Storing response
  await fetch(`/user/update/${id}`, {
  method: 'PUT', // or 'PATCH' depending on your API design
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: name,
    country: country,
    email: email,
    relationship: relationship
  })
})
  .then(response => response.json())
  .then(updatedData => {
    // Handle the updated data
    alert("updated succefully..");
  })
  .catch(error => {
    // Handle the error
    alert(error);
  })
};
