const recipeSelect = document.getElementById("recipeSelect");
const desiredYield = document.getElementById("desiredYield");
const calculateBtn = document.getElementById("calculateBtn");
const recipeInfo = document.getElementById("recipeInfo");
const ingredientsOutput = document.getElementById("ingredientsOutput");
const notesOutput = document.getElementById("notesOutput");

function showRecipe() {
  const recipeName = recipeSelect.value;
  const recipe = recipes[recipeName];

  if (!recipe) {
    recipeInfo.innerHTML = "Select a recipe first.";
    ingredientsOutput.innerHTML = "Select a recipe first.";
    notesOutput.innerHTML = "No notes yet.";
    return;
  }

  desiredYield.value = recipe.originalYield;

  recipeInfo.innerHTML = `
    <strong>${recipeName}</strong><br>
    Original yield: ${recipe.originalYield} ${recipe.yieldUnit}<br>
    Portion: ${recipe.portion}
  `;

  notesOutput.innerHTML = recipe.notes.map(note => `• ${note}`).join("<br>");

  calculateRecipe();
}

function calculateRecipe() {
  const recipeName = recipeSelect.value;
  const recipe = recipes[recipeName];

  if (!recipe) return;

  const targetYield = Number(desiredYield.value);
  const multiplier = targetYield / recipe.originalYield;

  ingredientsOutput.innerHTML = recipe.ingredients.map(item => {
    const scaled = item.amount * multiplier;
    const rounded = Math.round(scaled * 100) / 100;
    return `• ${item.name}: <strong>${rounded}${item.unit}</strong>`;
  }).join("<br>");
}

recipeSelect.addEventListener("change", showRecipe);
calculateBtn.addEventListener("click", calculateRecipe);
desiredYield.addEventListener("input", calculateRecipe);
