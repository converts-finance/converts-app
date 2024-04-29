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
          <a href="deals.html" class="btn btn-sm btn-outline-primary">Go to deals</a>
        </div>
      `;
    } else {
      console.log("you got a deal");
      let deals = "";
      data.forEach((item) => {
        deals += `
        <div class="card bg-light shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <p class="fw-bold mb-3">${item.deal_name}</p>
              <span class="badge text-bg-secondary text-capitalize">${item.deal_status}</span>
            </div>
            <div class="d-flex justify-content-between">
              <div>
                <p class="text-secondary small text-uppercase">Raising goal</p>
                <p class="small">$${item.deal_value}</p>
              </div>
              <div>
                <p class="text-secondary small text-uppercase">type</p>
                <p class="small">${item.deal_type}</p>
              </div>
              <div>
                <p class="text-secondary small text-uppercase">valuation cap</p>
                <p class="small">$${item.deal_valcap}</p>
              </div>
              <div>
                <p class="text-secondary small text-uppercase">investor</p>
                <p class="small">${item.investor_name}</p>
              </div>
            </div>
          </div>
        </div>
        `;
      });
      document.getElementById("displayDeals").innerHTML = deals;
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
          <a href="investors.html" class="btn btn-sm btn-outline-primary">Go to investors</a>
        </div>
      `;
    }
  }
  if (error) {
    console.log(error);
  }
}
