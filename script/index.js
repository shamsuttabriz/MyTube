// Remove active class
function removeActiveClass () {
  const allActiveClass = document.getElementsByClassName('active');
  for (let item of allActiveClass) {
    item.classList.remove('active')
  }
}


// Load and Show Categories
function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories));
}

function showCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button id="btn-${cat.category_id}" onclick="loadCategoryWiseVideo(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `
    categoryContainer.appendChild(categoryDiv);
  }
}

loadCategories();

// Load and Display Videos
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const allBtn = document.getElementById('all-btn');
      allBtn.classList.add('active');
      displayVideos(data.videos)
    });
}

function displayVideos(videos) {
  const displayVideos = document.getElementById("display-videos");
  // Clear previous content videos
  displayVideos.innerHTML = "";

  // When no content in the videos
  if(videos.length == 0) {
    displayVideos.innerHTML = `
      <div class="col-span-full flex flex-col justify-center items-center py-20">
        <img src="./assets/Icon.png" alt="No data">
        <h2 class="text-xl md:text-2xl font-bold mt-5">Oops!! Sorry, There is no content here</h2>
      </div>
    `
    return;
  }

  // Individual video showing to all videos
  videos.forEach((video) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card bg-base-100 shadow-sm">
        <figure class="relative">
          <img
            class="h-52 object-cover w-full"
            src=${video? video.thumbnail : "No Content"}
            alt="Shoes" />
          <span class="bg-slate-900 p-1 rounded text-white text-sm absolute bottom-2 right-2">3hrs 56 min ago</span>
        </figure>
        <div class="p-4 flex gap-4">
        <img class="w-10 h-10 rounded-full object-cover" src=${video?.authors[0]?.profile_picture} />
          <div>
            <h2 class="card-title">${video?.title}</h2>
            <div class="flex items-center gap-2 py-2">
              <h3 class="font-medium text-slate-600">${video?.authors[0]?.profile_name}</h3>
              ${video?.authors[0].verified ? '<img class="w-5 h-5 object-cover" src="../assets/p_icon.png" />' : ""}
            </div>
            <p class="text-slate-600">${video.others.views} views</p>
          </div>
        </div>
      </div>
    `;
    displayVideos.appendChild(div)
  });
}


loadVideos();


// Category wise Video Load
const  loadCategoryWiseVideo = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
  .then(res => res.json())
  .then(data => {
    removeActiveClass();
    const categoryBtn = document.getElementById(`btn-${id}`);
    categoryBtn.classList.add("active");
    displayVideos(data.category);
  });
}