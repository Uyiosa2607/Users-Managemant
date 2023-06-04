
let form = document.getElementById("myform");

form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    e.preventDefault();

    submitData()
}
// Defining async function
async function submitData() {

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let country = document.getElementById("country").value;
    let relationship = document.getElementById("relationship").value;

    function reset() {

      let name = document.getElementById("name");
      let email = document.getElementById("email");
      let country = document.getElementById("country");
      let relationship = document.getElementById("relationship");

      name.value = ""
      email.value = ""
      country.value = ""
      relationship.value = ""

    }
   
    // Storing response
    const getData = await fetch("/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        country: country,
        relationship: relationship,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        
         reset();

        alert(data.msg);

      });
}
