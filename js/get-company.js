const bucketURL = "https://xargcmjbcxmattsksdea.supabase.co/storage/v1/object/public/logos/";

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
      companyLogo.setAttribute("src", bucketURL + data[0].logo_url);
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

const modalCompanyLogo = document.getElementById("formFile");
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
  updateCompanyDetails(modalCompanyLogo.value, modalCompanyName.value, modalLegalCompanyName.value, modalCompanyWebsite.value, modalCompanyHQ.value, modalCompanyDescription.value, modalInvestorMemo.value, modalTwitter.value, modalLinkedin.value, companyID.value);
});

async function updateCompanyDetails(companyLogo, companyName, legalCompanyName, website, companyhq, description, investorMemo, twitter, linkedin, id) {
  saveBtn.disabled = true;
  const logoName = await uploadFile();
  const { data, error } = await client.from("companies").update({ logo_url: logoName, company_name: companyName, legal_company_name: legalCompanyName, company_website: website, company_hq: companyhq, company_description: description, investor_memo: investorMemo, social_twitter: twitter, social_linkedin: linkedin }).eq("id", id).select();
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

// COMPANY LOGO PREVIEW AND VALIDATION
function previewImage() {
  var preview = document.getElementById("imagePreview");
  var fileInput = document.getElementById("formFile");
  var file = fileInput.files[0];
  var reader = new FileReader();

  // Check if file type is allowed and size is within limit
  if (file) {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      if (file.size <= 1048576) {
        // 1MB in bytes
        reader.onloadend = function () {
          preview.innerHTML = '<img class="img-fluid rounded" src="' + reader.result + '" width="150" height="150" />';
        };
        reader.readAsDataURL(file);
      } else {
        preview.innerHTML = "Image size exceeds 1MB limit";
        fileInput.value = ""; // Clear the file input to allow selecting a new file
      }
    } else {
      preview.innerHTML = "Only JPG and PNG files are allowed";
      fileInput.value = ""; // Clear the file input to allow selecting a new file
    }
  } else {
    preview.innerHTML = "No image selected";
  }
}

// UPLOAD LOGO FILE TO BUCKET
async function uploadFile() {
  let timestamp = Date.now();
  let salt = Math.floor(Math.random() * 1000000);
  let extension = getFileExtension(modalCompanyLogo.value);
  let randomFilename = timestamp + "_" + salt + "." + extension;

  const { data, error } = await client.storage.from("logos").upload(randomFilename, modalCompanyLogo.files[0]);
  if (error) {
    console.log(error);
  } else {
    console.log(data);
    return randomFilename;
  }
}

// Extract file extension
function getFileExtension(filename) {
  // Split the filename into parts based on the period (.)
  var parts = filename.split(".");

  // Get the last part of the array, which should be the file extension
  var extension = parts[parts.length - 1];

  return extension;
}
