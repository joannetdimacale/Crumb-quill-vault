const recipeSelect = document.getElementById("recipeSelect");
const desiredYield = document.getElementById("desiredYield");
const calculateBtn = document.getElementById("calculateBtn");
const recipeInfo = document.getElementById("recipeInfo");
const ingredientsOutput = document.getElementById("ingredientsOutput");
const notesOutput = document.getElementById("notesOutput");

// Clear dropdown first
recipeSelect.innerHTML = "";

// Add default option
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "Select a recipe";
recipeSelect.appendChild(defaultOption);

// Add recipes automatically from recipe.js
Object.keys(recipes).forEach(recipeName => {
  const option = document.createElement("option");
  option.value = recipeName;
  option.textContent = recipeName;
  recipeSelect.appendChild(option);
});

function showRecipe() {
  const recipeName = recipeSelect.value;
  const recipe = recipes[recipeName];

  if (!recipe) {
    recipeInfo.innerHTML = "Select a recipe first.";
    ingredientsOutput.innerHTML = "Select a recipe first.";
    notesOutput.innerHTML = "No notes yet.";
    desiredYield.value = "";
    return;
  }

  desiredYield.value = recipe.originalYield;

  recipeInfo.innerHTML = `
    <strong>${recipeName}</strong><br>
    Original yield: ${recipe.originalYield} ${recipe.yieldUnit}<br>
    Portion: ${recipe.portion}
  `;

  notesOutput.innerHTML = recipe.notes
    .map(note => `• ${note}`)
    .join("<br>");

  calculateRecipe();
}

function calculateRecipe() {
  const recipeName = recipeSelect.value;
  const recipe = recipes[recipeName];

  if (!recipe) {
    ingredientsOutput.innerHTML = "Select a recipe first.";
    return;
  }

  const targetYield = Number(desiredYield.value);

  if (!targetYield || targetYield <= 0) {
    ingredientsOutput.innerHTML = "Enter a valid desired quantity.";
    return;
  }

  const multiplier = targetYield / recipe.originalYield;

  ingredientsOutput.innerHTML = recipe.ingredients.map(item => {
    // This handles section labels like WET INGREDIENTS, DRY INGREDIENTS, MIX-INS
    if (item.amount === undefined || item.unit === undefined) {
      return `<br><strong>${item.name}</strong>`;
    }

    const scaled = item.amount * multiplier;
    const rounded = Math.round(scaled * 100) / 100;

    return `• ${item.name}: <strong>${rounded}${item.unit}</strong>`;
  }).join("<br>");
}

recipeSelect.addEventListener("change", showRecipe);
calculateBtn.addEventListener("click", calculateRecipe);
desiredYield.addEventListener("input", calculateRecipe);
