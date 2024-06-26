window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
  await getDeals();
});

const newDealBtn = document.getElementById("newDealBtn");
const displayDeals = document.getElementById("displayDeals");

async function getDeals() {
  const { data, error } = await client.from("deals").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    if (data.length <= 0) {
      displayDeals.innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center py-5">
        <svg class="text-body-tertiary" xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" viewBox="0 0 256 256"><path d="M220.8,169.6A8,8,0,0,0,216,168h-8V64a32,32,0,0,0-32-32H40A32,32,0,0,0,8,64C8,77.61,18.05,85.54,19.2,86.4h0A7.89,7.89,0,0,0,24,88a8,8,0,0,0,4.87-14.33h0C28.83,73.62,24,69.74,24,64a16,16,0,0,1,32,0V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32C232,178.39,222,170.46,220.8,169.6ZM104,96h64a8,8,0,0,1,0,16H104a8,8,0,0,1,0-16Zm-8,40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H104A8,8,0,0,1,96,136Zm104,72H107.71A31.82,31.82,0,0,0,112,192a26.92,26.92,0,0,0-1.21-8h102a12.58,12.58,0,0,1,3.23,8A16,16,0,0,1,200,208Z"></path></svg>
          <p class="text-secondary small text-center">You do not have any deals</p>
        </div>
      `;
    } else {
      console.log(data);
      let deals = "";
      data.forEach((item) => {
        deals += `
        <div class="card shadow-sm">
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
      displayDeals.innerHTML = deals;
    }
    if (error) {
      console.log(error);
    }
  }
}

const companyName = document.getElementById("companyName");
const legalCompanyName = document.getElementById("legalCompanyName");
const companyWebsite = document.getElementById("companyWebsite");
const companyTaxResidency = document.getElementById("companyTaxResidency");
const companyHQ = document.getElementById("companyHQ");
const companyDescription = document.getElementById("companyDescription");
const companyInvestorMemo = document.getElementById("companyInvestorMemo");
const twitterAccount = document.getElementById("twitterAccount");
const linkedinAccount = document.getElementById("linkedinAccount");

newDealBtn.addEventListener("click", async function () {
  const { data, error } = await client.from("companies").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    companyName.textContent = data[0].company_name;
    legalCompanyName.textContent = data[0].legal_company_name;
    companyWebsite.textContent = data[0].company_website;
    companyTaxResidency.textContent = data[0].tax_residency;
    companyHQ.textContent = data[0].company_hq;
    companyDescription.textContent = data[0].company_description;
    companyInvestorMemo.textContent = data[0].investor_memo;
    twitterAccount.textContent = data[0].social_twitter;
    linkedinAccount.textContent = data[0].social_linkedin;
  }
  if (error) {
    console.log(error);
  }
});

// SAVE DRAFT
const modalDealName = document.getElementById("modalDealName");
const modalDealAmount = document.getElementById("modalDealAmount");
const modalInstrument = document.getElementById("modalInstrument");
const modalValCap = document.getElementById("modalValCap");
const modalDiscount = document.getElementById("modalDiscount");
const modalMFN = document.getElementById("modalMFN");
const modalInvestorName = document.getElementById("modalInvestorName");
const modalInvestorEmail = document.getElementById("modalInvestorEmail");

const saveDraftBtn = document.getElementById("modalDealDraftBtn");

saveDraftBtn.addEventListener("click", async function () {
  saveDraftBtn.disabled = true;
  const { data, error } = await client
    .from("deals")
    .insert([{ deal_name: modalDealName.value, deal_value: modalDealAmount.value, deal_type: modalInstrument.value, deal_valcap: modalValCap.value, deal_discount: modalDiscount.value, investor_name: modalInvestorName.value, investor_email: modalInvestorEmail.value, deal_status: "draft", mfn: modalMFN.checked, user_id: user_id }])
    .select();
  if (data) {
    saveDraftBtn.disabled = false;
    console.log(data);
  }
  if (error) {
    saveDraftBtn.disabled = false;
    console.log(error);
  }
});
