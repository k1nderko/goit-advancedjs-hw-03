import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  errorMessage: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

elements.loader.style.display = 'none';
elements.errorMessage.style.display = 'none';

function createMarkup(cat) {
  return `
    <div class="cat-card">
      <img class="cat-image" src="${cat.url}" alt="Cat Image">
      <div class="cat-details">
        <h2 class="cat-name">${cat.breeds[0].name}</h2>
        <p class="cat-description">${cat.breeds[0].description}</p>
        <p class="cat-temperament">Temperament: ${cat.breeds[0].temperament}</p>
      </div>
    </div>
  `;
}

function displayCatInfo(cat) {
  elements.catInfo.innerHTML = createMarkup(cat);
  elements.loader.style.display = 'none';
  elements.catInfo.style.display = 'block';
  elements.breedSelect.style.display = 'block';
}

function showError() {
  elements.loader.style.display = 'none';
  elements.breedSelect.style.display = 'none';
  elements.catInfo.style.display = 'none';
  elements.errorMessage.style.display = 'block';
}

function handleBreedChange(event) {
  const selectedBreedId = event.target.value;
  elements.loader.style.display = 'block';
  elements.breedSelect.style.display = 'none';
  elements.catInfo.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      displayCatInfo(cat);
      elements.errorMessage.style.display = 'none';
    })
    .catch(error => {
      showError();
      console.error('Error fetching cat info:', error);
    });
}

function loadBreed() {
  elements.loader.style.display = 'block';
  elements.breedSelect.style.display = 'none';
  elements.catInfo.style.display = 'none';
  fetchBreeds()
    .then(breeds => {
      console.log('Fetched Breeds:', breeds);

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        elements.breedSelect.appendChild(option);
      });

      elements.breedSelect.addEventListener('change', handleBreedChange);
      elements.loader.style.display = 'none';
      elements.breedSelect.style.display = 'block';
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      showError();
    });
}

loadBreed();