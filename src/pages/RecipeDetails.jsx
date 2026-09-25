import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock3, ChefHat, Star, Heart, ArrowLeft } from "lucide-react";
import recipes from "../data/recipes";

function RecipeDetails() {
  const { id } = useParams();

  const savedRecipes =
    JSON.parse(localStorage.getItem("foodiehub-saved-recipes")) || [];

  const [isSaved, setIsSaved] = useState(() => {
    const savedRecipes =
      JSON.parse(localStorage.getItem("foodiehub-saved-recipes")) || [];

    return savedRecipes.includes(Number(id));
  });

  const recipe = recipes.find((item) => item.id === Number(id));

  const handleSaveRecipe = () => {
    if (isSaved) {
      const savedRecipes =
        JSON.parse(localStorage.getItem("foodiehub-saved-recipes")) || [];

      const updatedRecipes = savedRecipes.filter(
        (recipeId) => recipeId !== recipe.id
      );

      localStorage.setItem(
        "foodiehub-saved-recipes",
        JSON.stringify(updatedRecipes)
      );

      setIsSaved(false);

      console.log("Recipe removed from saved recipes");
    } else {
      const updatedRecipes = [...savedRecipes, recipe.id];

      localStorage.setItem(
        "foodiehub-saved-recipes",
        JSON.stringify(updatedRecipes)
      );

      setIsSaved(true);

      console.log("Recipe saved in localStorage");
    }
  };

  if (!recipe) {
    return (
      <main className="recipe-details-page">
        <div className="container recipe-not-found">
          <h1>Recipe Not Found</h1>

          <Link to="/recipes" className="back-recipes-button">
            <ArrowLeft size={18} />
            Back to Recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="recipe-details-page">
      <div className="container">
        {/* Back */}
        <Link to="/recipes" className="recipe-back-link">
          <ArrowLeft size={17} />
          Back to Recipes
        </Link>

        {/* Main Recipe */}
        <div className="recipe-details">
          {/* Image */}
          <div className="recipe-details-image">
            <img src={recipe.image} alt={recipe.name} />
          </div>

          {/* Content */}
          <div className="recipe-details-content">
            <span className="recipe-details-category">{recipe.category}</span>

            <h1>{recipe.name}</h1>

            <div className="recipe-details-rating">
              <Star size={18} fill="currentColor" />

              <strong>{recipe.rating}</strong>

              <span>({recipe.reviews} reviews)</span>
            </div>

            <p className="recipe-details-description">
              {recipe.description}
            </p>

            {/* Recipe Meta */}
            <div className="recipe-details-meta">
              <div>
                <Clock3 size={20} />

                <span>
                  <small>Prep Time</small>
                  <strong>{recipe.prepTime} min</strong>
                </span>
              </div>

              <div>
                <Clock3 size={20} />

                <span>
                  <small>Cook Time</small>
                  <strong>{recipe.cookingTime} min</strong>
                </span>
              </div>

              <div>
                <ChefHat size={20} />

                <span>
                  <small>Difficulty</small>
                  <strong>{recipe.difficulty}</strong>
                </span>
              </div>
            </div>

            {/* Type */}
            <div className="recipe-details-actions">
              <span className="recipe-details-type">{recipe.type}</span>

              <button
                className="save-recipe-button"
                onClick={handleSaveRecipe}
              >
                <Heart
                  size={18}
                  fill={isSaved ? "currentColor" : "none"}
                />

                {isSaved ? "Saved Recipe" : "Save Recipe"}
              </button>
            </div>
          </div>
        </div>

        {/* Ingredients + Instructions */}
        <div className="recipe-extra-details">
          {/* Ingredients */}
          <section className="ingredients-section">
            <div className="details-section-heading">
              <span>WHAT YOU NEED</span>
              <h2>Ingredients</h2>
            </div>

            <div className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <div className="ingredient-item" key={index}>
                  <span className="ingredient-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{ingredient}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Instructions */}
          <section className="instructions-section">
            <div className="details-section-heading">
              <span>STEP BY STEP</span>
              <h2>Cooking Instructions</h2>
            </div>

            <div className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <div className="instruction-item" key={index}>
                  <span className="instruction-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{instruction}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default RecipeDetails;