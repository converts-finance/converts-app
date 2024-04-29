window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
  await getInvestors();
});

async function getInvestors() {
  const { data, error } = await client.from("investors").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    if (data.length <= 0) {
      document.getElementById("displayInvestors").innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center py-5">
        <svg class="text-body-tertiary" xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="currentColor" viewBox="0 0 256 256"><path d="M64.12,147.8a4,4,0,0,1-4,4.2H16a8,8,0,0,1-7.8-6.17,8.35,8.35,0,0,1,1.62-6.93A67.79,67.79,0,0,1,37,117.51a40,40,0,1,1,66.46-35.8,3.94,3.94,0,0,1-2.27,4.18A64.08,64.08,0,0,0,64,144C64,145.28,64,146.54,64.12,147.8Zm182-8.91A67.76,67.76,0,0,0,219,117.51a40,40,0,1,0-66.46-35.8,3.94,3.94,0,0,0,2.27,4.18A64.08,64.08,0,0,1,192,144c0,1.28,0,2.54-.12,3.8a4,4,0,0,0,4,4.2H240a8,8,0,0,0,7.8-6.17A8.33,8.33,0,0,0,246.17,138.89Zm-89,43.18a48,48,0,1,0-58.37,0A72.13,72.13,0,0,0,65.07,212,8,8,0,0,0,72,224H184a8,8,0,0,0,6.93-12A72.15,72.15,0,0,0,157.19,182.07Z"></path></svg>
          <p class="text-secondary small text-center">You do not have any investor</p>
        </div>
      `;
    }
  }
  if (error) {
    console.log(error);
  }
}
