
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Clock3,
  Star,
  ArrowRight,
  Search,
  Utensils,
} from "lucide-react";
import recipes from "../data/recipes";

const SAVED_RECIPES_KEY = "foodiehub-saved-recipes";

function getSavedRecipes() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(SAVED_RECIPES_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return [];

    const savedIds = saved.map((item) =>
      typeof item === "object" && item !== null
        ? item.id
        : item
    );

    return recipes.filter((recipe) =>
      savedIds.includes(recipe.id)
    );
  } catch {
    return [];
  }
}

function MyRecipes() {
  const [savedRecipes, setSavedRecipes] = useState(
    getSavedRecipes
  );

  useEffect(() => {
    const updateSavedRecipes = () => {
      setSavedRecipes(getSavedRecipes());
    };

    window.addEventListener(
      "foodiehub-saved-recipes-updated",
      updateSavedRecipes
    );

    window.addEventListener("storage", updateSavedRecipes);

    return () => {
      window.removeEventListener(
        "foodiehub-saved-recipes-updated",
        updateSavedRecipes
      );

      window.removeEventListener(
        "storage",
        updateSavedRecipes
      );
    };
  }, []);

  function removeFavorite(recipeId) {
    try {
      const nextRecipes = savedRecipes.filter(
        (recipe) => recipe.id !== recipeId
      );

      const stored = JSON.parse(
        localStorage.getItem(SAVED_RECIPES_KEY) || "[]"
      );

      const nextStored = Array.isArray(stored)
        ? stored.filter((item) => {
            const id =
              typeof item === "object" && item !== null
                ? item.id
                : item;

            return id !== recipeId;
          })
        : [];

      localStorage.setItem(
        SAVED_RECIPES_KEY,
        JSON.stringify(nextStored)
      );

      setSavedRecipes(nextRecipes);

      window.dispatchEvent(
        new Event("foodiehub-saved-recipes-updated")
      );
    } catch (error) {
      console.error("Unable to remove favorite:", error);
    }
  }

  return (
    <main className="my-recipes-page">
      <section className="my-recipes-hero">
        <div className="container my-recipes-hero-inner">
          <div>
            <span className="my-recipes-eyebrow">
              <Heart size={16} />
              YOUR PERSONAL COLLECTION
            </span>

            <h1>
              Your Favorite
              <span> Recipes</span>
            </h1>

            <p>
              All the delicious dishes you love, saved in one
              place. Your next cooking inspiration is just a
              click away.
            </p>

            <div className="my-recipes-stats">
              <div>
                <strong>{savedRecipes.length}</strong>
                <span>Saved Recipes</span>
              </div>
              <div>
                <strong>
                  {savedRecipes.length === 1
                    ? "Dish"
                    : "Dishes"}
                </strong>
                <span>Ready to Explore</span>
              </div>
            </div>
          </div>

          <div className="my-recipes-hero-visual">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85"
              alt="Freshly prepared delicious food"
            />
            <div className="my-recipes-floating-card">
              <Heart size={20} fill="currentColor" />
              <div>
                <strong>Made with love</strong>
                <span>Saved just for you</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-recipes-content">
        <div className="container">
          <div className="my-recipes-heading">
            <div>
              <span className="my-recipes-section-label">
                YOUR COLLECTION
              </span>
              <h2>Saved for Later</h2>
              <p>
                Keep your favorite recipes close whenever
                you're ready to cook.
              </p>
            </div>

            <Link
              to="/recipes"
              className="my-recipes-explore-link"
            >
              <Search size={17} />
              Explore Recipes
            </Link>
          </div>

          {savedRecipes.length > 0 ? (
            <div className="my-recipes-grid">
              {savedRecipes.map((recipe) => (
                <article
                  className="my-recipe-card"
                  key={recipe.id}
                >
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="my-recipe-image-link"
                  >
                    <div className="my-recipe-image">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        loading="lazy"
                      />

                      <span className="my-recipe-category">
                        {recipe.category}
                      </span>
                    </div>
                  </Link>

                  <button
                    type="button"
                    className="my-recipe-remove"
                    onClick={() => removeFavorite(recipe.id)}
                    aria-label={`Remove ${recipe.name} from favorites`}
                    title="Remove from favorites"
                  >
                    <Heart size={19} fill="currentColor" />
                  </button>

                  <div className="my-recipe-info">
                    <div className="my-recipe-meta">
                      <span>
                        <Clock3 size={14} />
                        {recipe.cookingTime} min
                      </span>

                      <span>
                        <Star
                          size={14}
                          fill="currentColor"
                        />
                        {recipe.rating}
                      </span>
                    </div>

                    <Link
                      to={`/recipes/${recipe.id}`}
                      className="my-recipe-title"
                    >
                      <h3>{recipe.name}</h3>
                    </Link>

                    <p>{recipe.description}</p>

                    <div className="my-recipe-footer">
                      <span>
                        <Utensils size={14} />
                        {recipe.type}
                      </span>

                      <Link
                        to={`/recipes/${recipe.id}`}
                        aria-label={`View ${recipe.name}`}
                      >
                        View Recipe
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="my-recipes-empty">
              <div className="my-recipes-empty-icon">
                <Heart size={34} />
              </div>

              <h3>Your collection is waiting!</h3>

              <p>
                You haven't saved any recipes yet. Visit our
                recipe collection and tap the heart icon on
                dishes you love.
              </p>

              <Link
                to="/recipes"
                className="my-recipes-empty-button"
              >
                Discover Recipes
                <ArrowRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default MyRecipes;