const companyLogo = document.getElementById("companyLogo");
const companyName = document.getElementById("companyName");
const altCompanyName = document.getElementById("altCompanyName");
const legalCompanyName = document.getElementById("legalCompanyName");
const companyWebsite = document.getElementById("companyWebsite");
const companyTaxResidency = document.getElementById("companyTaxResidency");
const companyHQ = document.getElementById("companyHQ");
const companyDescription = document.getElementById("companyDescription");
const companyInvestorMemo = document.getElementById("companyInvestorMemo");
const twitterAccount = document.getElementById("twitterAccount");

const editDetailsBtn = document.getElementById("editDetailsBtn");

window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
  await getCompanyDetails();
});

async function getCompanyDetails() {
  const { data, error } = await client.from("companies").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    if (data[0].logo_url == null) {
      companyLogo.setAttribute("src", "https://ui-avatars.com/api/?name=" + data[0].company_name);
    } else {
      companyLogo.setAttribute("src", data[0].logo_url);
    }
    companyName.textContent = data[0].company_name;
    altCompanyName.textContent = data[0].company_name;
    legalCompanyName.textContent = data[0].legal_company_name;
    companyWebsite.textContent = data[0].company_website;
    companyTaxResidency.textContent = data[0].tax_residency;
    companyHQ.textContent = data[0].company_hq;
    companyDescription.textContent = data[0].company_description;
    companyInvestorMemo.textContent = data[0].investor_memo;
  }
  if (error) {
    console.log(error);
  }
}

const modalCompanyName = document.getElementById("modalCompanyName");
const modalLegalCompanyName = document.getElementById("modalLegalCompanyName");
const modalCompanyWebsite = document.getElementById("modalCompanyWebsite");
const modalCompanyHQ = document.getElementById("modalCompanyHQ");
const modalCompanyDescription = document.getElementById("modalCompanyDescription");
const modalInvestorMemo = document.getElementById("modalInvestorMemo");
const modalTwitter = document.getElementById("modalTwitter");
const modalLinkedin = document.getElementById("modalLinkedin");
const companyID = document.getElementById("companyID");

editDetailsBtn.addEventListener("click", async function () {
  const { data, error } = await client.from("companies").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    modalCompanyName.value = data[0].company_name;
    modalLegalCompanyName.value = data[0].legal_company_name;
    modalCompanyWebsite.value = data[0].company_website;
    modalCompanyHQ.value = data[0].company_hq;
    modalCompanyDescription.value = data[0].company_description;
    modalInvestorMemo.value = data[0].investor_memo;
    modalTwitter.value = data[0].social_twitter;
    modalLinkedin.value = data[0].social_linkedin;
    companyID.value = data[0].id;
  }
  if (error) {
    console.log(error);
  }
});

const saveBtn = document.getElementById("modalDetailSaveBtn");

// UPDATE COMPANY DETAILS
saveBtn.addEventListener("click", async function () {
  updateCompanyDetails(modalCompanyName.value, modalLegalCompanyName.value, modalCompanyWebsite.value, modalCompanyHQ.value, modalCompanyDescription.value, modalInvestorMemo.value, modalTwitter.value, modalLinkedin.value, companyID.value);
});

async function updateCompanyDetails(companyName, legalCompanyName, website, companyhq, description, investorMemo, twitter, linkedin, id) {
  saveBtn.disabled = true;
  const { data, error } = await client.from("companies").update({ company_name: companyName, legal_company_name: legalCompanyName, company_website: website, company_hq: companyhq, company_description: description, investor_memo: investorMemo, social_twitter: twitter, social_linkedin: linkedin }).eq("id", id).select();
  if (data) {
    console.log(data);
    saveBtn.disabled = false;
    getCompanyDetails();
    var myModalEl = document.getElementById("companyDetailsModal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
    // add toast confirmation
  }
  if (error) {
    console.log(error);
    saveBtn.disabled = false;
  }
}
