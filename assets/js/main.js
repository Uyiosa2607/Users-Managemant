async function editUser(data) {
  const clicked = data;

  if (clicked.classList.contains("btn-edit")) {
    const userId = clicked.getAttribute("data-id");

    console.log(userId);

    fetch(`/edit-user/${userId}`)
      .then((response) => response)
      .then((data) => {
        // Handle the response data
        window.location.href = `/edit-user/${userId}`;
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }
}

async function deleteUser(data) {
  const clicked = data;

  if (clicked.classList.contains("btn-del")) {
    const userId = clicked.getAttribute("data-id");

    clicked.parentElement.parentNode.remove();

    await fetch(`/users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("User removed");
          // Handle success
        } else {
          alert("Error deleting user:", response.status);
          // Handle error
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        // Handle error
      });
  }
}

function handelDel(event) {
  const clicked = event.target;

  deleteUser(clicked);
}

function handelEdit(event) {
  const clicked = event.target;

  editUser(clicked);
}

const delButtons = document.querySelectorAll(".btn-del");

const editButtons = document.querySelectorAll(".btn-edit");

delButtons.forEach((button) => addEventListener("click", handelDel));

editButtons.forEach((button) => addEventListener("click", handelEdit));
