const appId = "6cd5c353";
const appKey = "6e506e7d6996315e8b293f580f7b4df7";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;

const recipeContainer = document.querySelector(".recipe-container");
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", () => {
	const searchTerm = searchInput.value.trim();
	if (searchTerm) {
		loadRecipes(searchTerm);
	}
});

searchInput.addEventListener("keyup", (e) => {
	const searchTerm = searchInput.value.trim();
	if (e.keyCode === 13 && searchTerm) {
		loadRecipes(searchTerm);
	}
});

function loadRecipes(searchTerm) {
	const url = `${baseUrl}&q=${searchTerm}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => renderRecipes(data.hits))
		.catch((error) => console.log(error));
}

function renderRecipes(recipeList) {
	recipeContainer.innerHTML = "";
	recipeList.forEach((recipeObj) => {
		const { label: recipeTitle, ingredientLines, image: recipeImage } = recipeObj.recipe;
		const recipeStepStr = getRecipeStepsStr(ingredientLines);
		const htmlStr = `<div class="recipe-card">
			<div class="recipe-title">${recipeTitle}</div>
			<div class="recipe-image">
				<img src="${recipeImage}" alt="${recipeTitle}" />
			</div>
			<div class="recipe-steps">
				<ul>${recipeStepStr}</ul>
			</div>
		</div>`;
		recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
	});
}

function getRecipeStepsStr(ingredientLines) {
	let str = "";
	for (let i = 0; i < ingredientLines.length; i++) {
		str += `<li>${ingredientLines[i]}</li>`;
	}
	return str;
}
