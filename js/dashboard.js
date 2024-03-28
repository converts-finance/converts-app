const bucketURL = "https://xargcmjbcxmattsksdea.supabase.co/storage/v1/object/public/logos/";

const companyName = document.getElementById("companyName");
const companyLogo = document.getElementById("companyLogo");
const companyLegalName = document.getElementById("companyLegalName");
const companyLocation = document.getElementById("companyLocation");

window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
  await getCompanyDetails();
  await getDeals();
  await getInvestors();
});

async function getCompanyDetails() {
  const { data, error } = await client.from("companies").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    if (data[0].logo_url == null) {
      companyLogo.setAttribute("src", "https://ui-avatars.com/api/?name=" + data[0].company_name);
    } else {
      companyLogo.setAttribute("src", bucketURL + data[0].logo_url);
    }
    companyName.innerHTML = data[0].company_name;
    companyLegalName.innerHTML = data[0].legal_company_name;
    companyLocation.innerHTML = data[0].company_hq;
  }
  if (error) {
    console.log(error);
  }
}

async function getDeals() {
  const { data, error } = await client.from("deals").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    if (data.length <= 0) {
      document.getElementById("displayDeals").innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center pt-4 pb-2">
          <p class="text-secondary small text-center mb-2">You do not have any deals</p>
          <a href="#" class="btn btn-sm btn-outline-primary">Create new deal</a>
        </div>
      `;
    } else {
      console.log("you got a deal");
    }
  }
  if (error) {
    console.log(error);
  }
}

async function getInvestors() {
  const { data, error } = await client.from("investors").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    if (data.length <= 0) {
      document.getElementById("displayInvestors").innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center pt-4 pb-2">
          <p class="text-secondary small text-center mb-2">You do not have any investors</p>
          <a href="#" class="btn btn-sm btn-outline-primary">Add an investor</a>
        </div>
      `;
    }
  }
  if (error) {
    console.log(error);
  }
}
