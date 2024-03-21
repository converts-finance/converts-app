const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  const { error } = await client.auth.signOut();
  window.location.replace("/index.html");
});

const firstName = document.getElementById("userFirstName");
const lastName = document.getElementById("userLastName");
const userEmail = document.getElementById("userEmail");

window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
  await getUserDetails();
});

async function getUserDetails() {
  const { data, error } = await client.from("users").select("*").eq("user_id", user_id);
  if (data) {
    firstName.textContent = data[0].first_name;
    lastName.textContent = data[0].last_name;
    userEmail.textContent = user_email;
  }
}
