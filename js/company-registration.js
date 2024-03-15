const firstName = document.getElementById("userFirstName");
const lastName = document.getElementById("userLastName");
const companyName = document.getElementById("companyName");
const legalCompanyName = document.getElementById("legalCompanyName");
const companyWebsite = document.getElementById("companyWebsite");
const companyDescription = document.getElementById("companyDescription");
const companyIndustry = document.getElementById("companyIndustry");
const registerBtn = document.getElementById("registerBtn");

async function addUserDetails(firstName, lastName, user_id) {
  const { data, error } = await client
    .from("users")
    .insert([{ first_name: firstName, last_name: lastName, user_id: user_id }])
    .select();
  if (error) {
    console.log(error);
  }
  if (data) {
    addCompanyDetails(companyName.value, legalCompanyName.value, companyWebsite.value, companyDescription.value, companyIndustry.value, user_id);
  }
}
async function addCompanyDetails(companyName, legalCompanyName, companyWebsite, companyDescription, companyIndustry, user_id) {
  const { data, error } = await client
    .from("companies")
    .insert([{ company_name: companyName, legal_company_name: legalCompanyName, company_website: companyWebsite, company_description: companyDescription, company_industry: companyIndustry, user_id: user_id }])
    .select();
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
    window.location.replace("./dashboard.html");
  }
}

registerBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  registerBtn.disabled = true;

  await addUserDetails(firstName.value, lastName.value, user_id);
});
