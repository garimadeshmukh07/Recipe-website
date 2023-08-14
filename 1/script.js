const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        }
        else if(searchInputTxt=="poha"){
            html += `
                    <div class = "meal-item" data-id ="poha">
                        <div class = "meal-img">
                            <img src = "poha.jpeg" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>Poha</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        } 
        else if (searchInputTxt == "jalebi") {
          html += `
                    <div class = "meal-item" data-id ="jalebi">
                        <div class = "meal-img">
                            <img src = "jalebi.jpeg" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>Jalebi</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        } else if (searchInputTxt == "paneer chili") {
          html += `
                    <div class = "meal-item" data-id ="paneerChili">
                        <div class = "meal-img">
                            <img src = "paneerChili.jpeg" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>Paneer Chili</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        } else if (searchInputTxt == "potato chili") {
          html += `
                    <div class = "meal-item" data-id ="potatoChili">
                        <div class = "meal-img">
                            <img src = "potatoChili.webp" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>Potato Chili</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        } else if (searchInputTxt == "gulab jamun") {
          html += `
                    <div class = "meal-item" data-id ="gulabJamun">
                        <div class = "meal-img">
                            <img src = "gulabJamun.jpeg" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>Gulab Jamun</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        } else if (searchInputTxt == "chole bhature") {
          html += `
                    <div class = "meal-item" data-id ="cholebhature">
                        <div class = "meal-img">
                            <img src = "chole.jpeg" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>Chole Bhature</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
        } else {
          html = "Kuch nai mila :(";
          mealList.classList.add("notFound");
        }

        mealList.innerHTML = html;
    });
}
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}