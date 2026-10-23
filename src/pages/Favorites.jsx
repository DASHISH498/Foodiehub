
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChefHat,
  Clock3,
  Heart,
  Star,
} from "lucide-react";

import recipes from "../data/recipes";
import { useFavorites } from "../context/FavoritesContext";

function Favorites() {
  const { savedRecipeIds, removeFavorite } = useFavorites();

  const savedRecipes = recipes.filter((recipe) =>
    savedRecipeIds.includes(Number(recipe.id))
  );

  const heroImage = savedRecipes[0]?.image || recipes[0]?.image;

  return (
    <main className="my-recipes-page">
      <section className="my-recipes-hero">
        <div className="container my-recipes-hero-inner">
          <div>
            <span className="my-recipes-eyebrow">
              <Heart size={15} fill="currentColor" />
              YOUR PERSONAL COLLECTION
            </span>

            <h1>
              Recipes worth <span>saving.</span>
            </h1>

            <p>
              Keep the recipes you love close by. Save them now
              and come back whenever you're ready to cook.
            </p>

            <div className="my-recipes-stats">
              <div>
                <strong>{savedRecipes.length}</strong>
                <span>Saved recipes</span>
              </div>

              <div>
                <strong>♡</strong>
                <span>Made for your taste</span>
              </div>
            </div>
          </div>

          <div className="my-recipes-hero-visual">
            {heroImage && (
              <img
                src={heroImage}
                alt="Recipe from your collection"
              />
            )}

            <div className="my-recipes-floating-card">
              <Heart size={22} fill="currentColor" />
              <div>
                <strong>Your favorite flavors</strong>
                <span>Save now, cook later</span>
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
                <ChefHat size={15} />
                YOUR COLLECTION
              </span>

              <h2>Saved Favorites</h2>

              <p>
                All your favorite recipes in one place.
              </p>
            </div>

            <Link
              to="/recipes"
              className="my-recipes-explore-link"
            >
              Explore Recipes <ArrowRight size={16} />
            </Link>
          </div>

          {savedRecipes.length > 0 ? (
            <div className="my-recipes-grid">
              {savedRecipes.map((recipe) => (
                <article
                  className="my-recipe-card"
                  key={recipe.id}
                >
                  <div className="my-recipe-image">
                    <Link
                      to={`/recipes/${recipe.id}`}
                      className="my-recipe-image-link"
                      aria-label={`View ${recipe.name}`}
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        loading="lazy"
                      />
                    </Link>

                    <span className="my-recipe-category">
                      {recipe.category}
                    </span>

                    <button
                      type="button"
                      className="my-recipe-remove"
                      onClick={() => removeFavorite(recipe.id)}
                      aria-label={`Remove ${recipe.name} from favorites`}
                      title="Remove from favorites"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>
                  </div>

                  <div className="my-recipe-info">
                    <div className="my-recipe-meta">
                      <span>
                        <Clock3 size={14} />
                        {recipe.prepTime + recipe.cookingTime} min
                      </span>

                      <span>
                        <Star size={13} fill="currentColor" />
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
                      <span>{recipe.type}</span>

                      <Link to={`/recipes/${recipe.id}`}>
                        View Recipe <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="my-recipes-empty">
              <div className="my-recipes-empty-icon">
                <Heart size={30} />
              </div>

              <h3>No favorites saved yet</h3>

              <p>
                Browse recipes and tap the heart to save the
                dishes you love. They will appear here.
              </p>

              <Link
                to="/recipes"
                className="my-recipes-empty-button"
              >
                Find Recipes <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Favorites;
