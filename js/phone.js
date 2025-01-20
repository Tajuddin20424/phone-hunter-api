// Fetch and display phones
const loadPhone = async (searchText='13', isShowAll) => {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    if (!res.ok) throw new Error(`Failed to fetch phones: ${res.status}`);
    const data = await res.json();
    const phones = data.data;

    if (phones.length === 0) {
      displayNoResults();
    } else {
      displayPhones(phones, isShowAll);
    }
  } catch (error) {
    console.error(error.message);
  }
};

const displayPhones = (phones, isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById('phone-container');
  // phoneContainer.innerHTML = ''; 
  phoneContainer.textContent = '';

// display show all button if there are more than 12 phones 
const showAllContainer = document.getElementById('show-all-container')
  if(phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden');
  }

  // console.log('is show all', isShowAll);

  // console.log(phones.length);
  // display only first 12 phones if not show all
 if(!isShowAll){
  phones = phones.slice(0,12); 

 }

  // Clear container
  phones.forEach((phone) => {
    // console.log(phone);
    // Create a phone card
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card bg-gray-400 mt-5 p-5 shadow-xl';

    phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="${phone.phone_name}" /></figure>
      <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>Discover the latest features of the ${phone.phone_name}.</p>
          <div class="card-actions justify-center">
              <button onclick = "handleShowDetails('${phone.slug}'); " class="btn btn-primary">Show Details</button>
          </div>
      </div>
    `;

    phoneContainer.appendChild(phoneCard);
  });


  // hide loading spinner
   toggleLoadingSpinner(false);
};

// 
const handleShowDetails = async (id) =>{
  // console.log('clicked show details', id)
  // load single phone data
const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
const data = await res.json();
// console.log(data);
const phone = data.data;


showPhoneDetails(phone)

}


const showPhoneDetails = (phone) =>{
  console.log(phone);
const phoneName = document.getElementById('show-details-phone-name');
phoneName.innerText = phone.name;

const showDetailContainer = document.getElementById('show-detail-container');

showDetailContainer.innerHTML = `
<img src="${phone.image}" alt="" />
<p><span>Storage:</span>${phone?.mainFeatures?.storage}</p>
<p><span>GPS:</span>${phone?.other?.GPS}</P>

`
  // show the model
  show_details_model.showModel();

}

// Display no results message
const displayNoResults = () => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.innerHTML = `
    <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center">
        <p class="text-xl text-gray-600">No phones found. Please try a different search term.</p>
    </div>
  `;
};

// Handle search button click
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value.trim();
  // Get the value of the input field
  if (searchText) {
    loadPhone(searchText, isShowAll);
  } else {
    alert('Please enter a search term.');
  }
};

// hidden search recap
// const handleSearch2 = () => {
// toggleLoadingSpinner(true);

//   const searchField = document.getElementById('search-field2')
//   const searchText = searchField.value;
//   loadPhone(searchText);

// }

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList .remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden');
  }
  
}

// handle show all
const handleShowAll = () =>{
  handleSearch(true);
}

loadPhone();


// Load phones on page load (optional initial query)
// loadPhone('iphone');
// Example: Load phones with "iphone" as the initial query


