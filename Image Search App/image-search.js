document.addEventListener("DOMContentLoaded", () => {
  const accessKey = "B3A05bK91fdT8pHcF0GDV0QKOGzs1wEWpQV8FJYg078";

  const FormElement = document.querySelector("form");
  const inputSection = document.getElementById("search-input");
  const searchResult = document.querySelector(".search-results");
  const showMore = document.getElementById("showmore");
  const searchButton = document.querySelector(".search-button");

  let page = 1;

  async function searchImages() {
    const inputValue = inputSection.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      const results = data.results;

      if (page === 1) {
        searchResult.innerHTML = "";
      }

      results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";
        imgLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imgLink);
        searchResult.appendChild(imageWrapper);
      });

      page++;

      if (page > 1) {
        showMore.style.display = "block";
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  FormElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
  });

  showMore.addEventListener("click", () => {
    searchImages();
  });

  const searchResultsContainer = document.querySelector(
    ".search-results.random"
  );
  const template = searchResultsContainer.querySelector(
    ".search-result.template"
  );

  async function searchRandomImages(imageCount) {
    const url = `https://api.unsplash.com/photos/random?count=${imageCount}&client_id=${accessKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();

      for (let i = 0; i < imageCount; i++) {
        const clone = template.cloneNode(true);
        clone.classList.remove("template");
        clone.style.display = "";

        const image = clone.querySelector("img");
        const imgLink = clone.querySelector("a");

        image.src = data[i].urls.small;
        image.alt = data[i].alt_description;
        imgLink.href = data[i].links.html;
        imgLink.textContent = data[i].alt_description;

        searchResultsContainer.appendChild(clone);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  }

  searchRandomImages(6); // Generate 3 random images
});
