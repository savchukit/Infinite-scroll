const imagesContainer = document.querySelector(".images-container");
const inputField = document.querySelector(".input-text");

const fetchImages = (page = 1) => {
  let previous = page;
  return async (query) => {
    try {
      const result = await fetch(
        `https://pixabay.com/api/?key=42675904-6fbcd739c8c1ceef23a8515ae&q=${query}&page=${previous}`
      );
      previous++;
      return await result.json();
    } catch (error) {
      console.log(error);
    }
  };
};

const testFunc = fetchImages();
const renderImages = async (query) => {
  const images = await testFunc(query, 1);
  console.log(images);
  // imagesContainer.innerHTML = null;
  images?.hits?.forEach((item) => {
    const img = document.createElement("img");
    img.classList.add("image");
    img.src = item.webformatURL;
    imagesContainer.appendChild(img);
  });
};

inputField.addEventListener("input", (e) => {
  renderImages(e.target.value);
});

window.addEventListener("scroll", () => {
  const viewportHeight = document.documentElement.clientHeight;
  const scrolledY = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  if (Math.ceil(scrolledY + viewportHeight) >= pageHeight) {
    renderImages(inputField.value);
  }
});
