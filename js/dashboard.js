const companyName = document.getElementById("companyName");
const companyWebsite = document.getElementById("companyWebsite");
const companyLocation = document.getElementById("companyLocation");

window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
  const { data, error } = await client.from("companies").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    companyName.innerHTML = data[0].company_name;
    companyWebsite.innerHTML = data[0].company_website;
  }
  if (error) {
    console.log(error);
  }
});
