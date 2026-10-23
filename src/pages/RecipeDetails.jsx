
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Clock3,
  ChefHat,
  Star,
  Heart,
  ArrowLeft,
  Check,
  Users,
  Leaf,
  Utensils,
  CookingPot,
  ClipboardList,
} from "lucide-react";
import recipes from "../data/recipes";

const SAVED_RECIPES_KEY = "foodiehub-saved-recipes";

function getSavedIds() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(SAVED_RECIPES_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return saved
      .map((item) =>
        typeof item === "object" && item !== null
          ? Number(item.id)
          : Number(item)
      )
      .filter(Number.isFinite);
  } catch {
    return [];
  }
}

function RecipeDetails() {
  const { id } = useParams();
  const recipe = recipes.find((item) => item.id === Number(id));

  const [isSaved, setIsSaved] = useState(() =>
    getSavedIds().includes(Number(id))
  );
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    const syncSavedState = () => {
      setIsSaved(getSavedIds().includes(Number(id)));
    };

    window.addEventListener(
      "foodiehub-saved-recipes-updated",
      syncSavedState
    );
    window.addEventListener("storage", syncSavedState);

    return () => {
      window.removeEventListener(
        "foodiehub-saved-recipes-updated",
        syncSavedState
      );
      window.removeEventListener("storage", syncSavedState);
    };
  }, [id]);

  function handleSaveRecipe() {
    if (!recipe) return;

    try {
      const stored = JSON.parse(
        localStorage.getItem(SAVED_RECIPES_KEY) || "[]"
      );

      const saved = Array.isArray(stored) ? stored : [];
      const alreadySaved = getSavedIds().includes(recipe.id);

      const updated = alreadySaved
        ? saved.filter((item) => {
            const itemId =
              typeof item === "object" && item !== null
                ? Number(item.id)
                : Number(item);

            return itemId !== recipe.id;
          })
        : [
            recipe,
            ...saved.filter((item) => {
              const itemId =
                typeof item === "object" && item !== null
                  ? Number(item.id)
                  : Number(item);

              return itemId !== recipe.id;
            }),
          ];

      localStorage.setItem(
        SAVED_RECIPES_KEY,
        JSON.stringify(updated)
      );

      setIsSaved(!alreadySaved);

      window.dispatchEvent(
        new Event("foodiehub-saved-recipes-updated")
      );
    } catch (error) {
      console.error("Unable to update saved recipes:", error);
    }
  }

  function toggleIngredient(index) {
    setCheckedIngredients((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  function toggleStep(index) {
    setCompletedSteps((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  if (!recipe) {
    return (
      <main className="recipe-details-page">
        <div className="container recipe-not-found">
          <div className="recipe-not-found-icon">
            <CookingPot size={36} />
          </div>
          <h1>Recipe Not Found</h1>
          <p>
            Looks like this delicious recipe isn't available.
            Explore our collection to find something else.
          </p>
          <Link to="/recipes" className="back-recipes-button">
            <ArrowLeft size={18} />
            Back to Recipes
          </Link>
        </div>
      </main>
    );
  }

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : [];

  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : [];

  const progress =
    ingredients.length > 0
      ? Math.round(
          (checkedIngredients.length / ingredients.length) * 100
        )
      : 0;

  return (
    <main className="recipe-details-page">
      <section className="recipe-details-hero">
        <div className="container">
          <Link to="/recipes" className="recipe-back-link">
            <ArrowLeft size={17} />
            Back to Recipes
          </Link>

          <div className="recipe-details">
            <div className="recipe-details-image">
              <img src={recipe.image} alt={recipe.name} />

              <span className="recipe-image-label">
                <ChefHat size={15} />
                FOODIEHUB RECIPE
              </span>

              <span className="recipe-image-category">
                {recipe.category}
              </span>
            </div>

            <div className="recipe-details-content">
              <span className="recipe-details-category">
                {recipe.category}
              </span>

              <h1>{recipe.name}</h1>

              <div className="recipe-details-rating">
                <Star size={18} fill="currentColor" />
                <strong>{recipe.rating}</strong>
                <span>({recipe.reviews} reviews)</span>
              </div>

              <p className="recipe-details-description">
                {recipe.description}
              </p>

              <div className="recipe-details-meta">
                <div>
                  <Clock3 size={21} />
                  <span>
                    <small>Prep Time</small>
                    <strong>{recipe.prepTime} min</strong>
                  </span>
                </div>

                <div>
                  <CookingPot size={21} />
                  <span>
                    <small>Cook Time</small>
                    <strong>{recipe.cookingTime} min</strong>
                  </span>
                </div>

                <div>
                  <ChefHat size={21} />
                  <span>
                    <small>Difficulty</small>
                    <strong>{recipe.difficulty}</strong>
                  </span>
                </div>
              </div>

              <div className="recipe-details-actions">
                <span className="recipe-details-type">
                  {recipe.type === "Vegetarian" ? (
                    <Leaf size={15} />
                  ) : (
                    <Utensils size={15} />
                  )}
                  {recipe.type}
                </span>

                <button
                  type="button"
                  className={`save-recipe-button ${
                    isSaved ? "is-saved" : ""
                  }`}
                  onClick={handleSaveRecipe}
                  aria-pressed={isSaved}
                >
                  <Heart
                    size={18}
                    fill={isSaved ? "currentColor" : "none"}
                  />
                  {isSaved ? "Saved to Favorites" : "Save Recipe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="recipe-details-body">
        <div className="container">
          <div className="recipe-details-body-heading">
            <span>LET'S GET COOKING</span>
            <h2>Everything You Need</h2>
            <p>
              Gather your ingredients, follow the steps, and
              make something delicious.
            </p>
          </div>

          <div className="recipe-extra-details">
            <section className="ingredients-section">
              <div className="details-section-heading">
                <span>PREPARE YOUR INGREDIENTS</span>
                <h2>Ingredients</h2>
                <p>
                  {checkedIngredients.length} of {ingredients.length}{" "}
                  ingredients ready
                </p>
              </div>

              <div className="ingredient-progress">
                <div
                  className="ingredient-progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="ingredients-list">
                {ingredients.map((ingredient, index) => {
                  const checked = checkedIngredients.includes(index);

                  return (
                    <button
                      type="button"
                      className={`ingredient-item ${
                        checked ? "checked" : ""
                      }`}
                      key={`${ingredient}-${index}`}
                      onClick={() => toggleIngredient(index)}
                      aria-pressed={checked}
                    >
                      <span className="ingredient-checkbox">
                        {checked && <Check size={14} />}
                      </span>
                      <span className="ingredient-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="ingredient-text">
                        {ingredient}
                      </span>
                    </button>
                  );
                })}
              </div>

              {ingredients.length > 0 &&
                checkedIngredients.length === ingredients.length && (
                  <div className="ingredients-complete">
                    <Check size={17} />
                    All ingredients are ready. Let's cook!
                  </div>
                )}
            </section>

            <section className="instructions-section">
              <div className="details-section-heading">
                <span>FOLLOW ALONG</span>
                <h2>Cooking Instructions</h2>
                <p>
                  {completedSteps.length} of {instructions.length}{" "}
                  steps completed
                </p>
              </div>

              <div className="instructions-list">
                {instructions.map((instruction, index) => {
                  const completed = completedSteps.includes(index);

                  return (
                    <button
                      type="button"
                      className={`instruction-item ${
                        completed ? "completed" : ""
                      }`}
                      key={`${index}-${instruction}`}
                      onClick={() => toggleStep(index)}
                      aria-pressed={completed}
                    >
                      <span className="instruction-number">
                        {completed ? (
                          <Check size={19} />
                        ) : (
                          String(index + 1).padStart(2, "0")
                        )}
                      </span>

                      <span className="instruction-text">
                        <strong>Step {index + 1}</strong>
                        <span>{instruction}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {instructions.length > 0 &&
                completedSteps.length === instructions.length && (
                  <div className="cooking-complete">
                    <ChefHat size={20} />
                    <div>
                      <strong>Well done, chef!</strong>
                      <p>You've completed every cooking step.</p>
                    </div>
                  </div>
                )}
            </section>
          </div>

          <div className="recipe-details-bottom-cta">
            <div className="recipe-cta-icon">
              <Users size={25} />
            </div>
            <div>
              <h3>Enjoyed this recipe?</h3>
              <p>
                Save it to your favorites so you can cook it again
                anytime.
              </p>
            </div>
            <button
              type="button"
              className="save-recipe-button"
              onClick={handleSaveRecipe}
            >
              <Heart
                size={17}
                fill={isSaved ? "currentColor" : "none"}
              />
              {isSaved ? "Saved" : "Save Recipe"}
            </button>
          </div>

          <div className="recipe-details-back-bottom">
            <Link to="/recipes">
              <ArrowLeft size={17} />
              Explore More Recipes
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RecipeDetails;
