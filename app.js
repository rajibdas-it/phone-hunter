const loadMobiles = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  //   console.log(phones);
  const phonesSection = document.getElementById("phones");
  const alertMsg = document.getElementById("alert-msg");
  if (phones.length === 0) {
    alertMsg.classList.remove("d-none");
  } else {
    alertMsg.classList.add("d-none");
  }
  //   phonesSection.innerHTML = ""; //(old way)
  phonesSection.textContent = "";
  phones = phones.slice(0, 15);
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card ">
        <img src=${phone.image} class="card-img-top w-100" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <button class="btn btn-outline-info w-100">See Details</button> 
        </div>   
    </div>
    `;
    phonesSection.appendChild(phoneDiv);
  });
  toggleSpinner(false);
};

document.getElementById("btn-search").addEventListener("click", function () {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  searchField.value = "";
  loadMobiles(searchText);
});

const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("d-none");
  } else {
    loadingSpinner.classList.add("d-none");
  }
};

loadMobiles("iphone");
