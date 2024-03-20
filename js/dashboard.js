const bucketURL = "https://xargcmjbcxmattsksdea.supabase.co/storage/v1/object/public/logos/";

const companyName = document.getElementById("companyName");
const companyLogo = document.getElementById("companyLogo");
const companyLegalName = document.getElementById("companyLegalName");
const companyLocation = document.getElementById("companyLocation");

window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
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
});

async function getDeals() {}

async function getInvestors() {}
