window.addEventListener("DOMContentLoaded", async (event) => {
  await checkSession();
  await getDeals();
});

async function getDeals() {
  const { data, error } = await client.from("deals").select("*").eq("user_id", user_id);
  if (data) {
    console.log(data);
    if (data.length <= 0) {
      document.getElementById("displayDeals").innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center">
          <p class="text-secondary small text-center">You do not have any deals</p>
          <a href="#" class="btn btn-sm btn-link">Create new deal</a>
        </div>
      `;
    }
  }
  if (error) {
    console.log(error);
  }
}
