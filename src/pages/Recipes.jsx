import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart } from "lucide-react";

import recipes from "../data/recipes";
import { useFavorites } from "../context/FavoritesContext";

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  const [type, setType] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "All");
  }, [searchParams]);

  function updateSearchParams(nextSearch, nextCategory) {
    const params = new URLSearchParams();

    if (nextSearch.trim()) {
      params.set("search", nextSearch.trim());
    }

    if (nextCategory !== "All") {
      params.set("category", nextCategory);
    }

    setSearchParams(params, { replace: true });
  }

  const filteredRecipes = recipes.filter((recipe) => {
    const searchableText = `
      ${recipe.name}
      ${recipe.description}
      ${recipe.category}
      ${recipe.type}
      ${(recipe.ingredients || []).join(" ")}
    `.toLowerCase();

    const matchesSearch = searchableText.includes(
      search.toLowerCase().trim()
    );

    const totalTime = recipe.prepTime + recipe.cookingTime;

    const matchesCategory =
      category === "All" ||
      recipe.category === category ||
      (category === "Quick & Easy" && totalTime <= 45) ||
      (category === "Healthy" && recipe.type === "Vegetarian");

    const matchesType =
      type === "All" || recipe.type === type;

    return matchesSearch && matchesCategory && matchesType;
  });

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);

  function handleSearchChange(value) {
    setSearch(value);
    setVisibleCount(10);
    updateSearchParams(value, category);
  }

  function handleCategoryChange(value) {
    setCategory(value);
    setVisibleCount(10);
    updateSearchParams(search, value);
  }

  function handleFavoriteClick(event, recipeId) {
    event.preventDefault();
    event.stopPropagation();
    toggleFavorite(recipeId);
  }

  return (
    <main className="recipes-page">
      <section className="recipes-section">
        <div className="container">
          <div className="recipes-header">
            <div>
              <span>EXPLORE OUR COLLECTION</span>
              <h1>Discover Delicious Recipes</h1>
              <p>
                Find your next favorite recipe and enjoy cooking
                something delicious.
              </p>
            </div>

            <div className="recipe-count">
              <strong>{filteredRecipes.length}</strong>
              <span>Recipes found</span>
            </div>
          </div>

          <div className="recipes-search">
            <input
              type="search"
              placeholder="Search recipes, ingredients, or cuisines..."
              value={search}
              onChange={(event) =>
                handleSearchChange(event.target.value)
              }
              aria-label="Search recipes"
            />
          </div>

          <div className="categroy-filter flex gap-4">
            <div className="recipe-filters">
              <div className="filter-group">
                <label htmlFor="recipe-category">Category</label>

                <select
                  id="recipe-category"
                  value={category}
                  onChange={(event) =>
                    handleCategoryChange(event.target.value)
                  }
                >
                  <option value="All">All Categories</option>
                  <option value="Indian">Indian</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Quick & Easy">Quick &amp; Easy</option>
                </select>
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="recipe-type">Food Type</label>

              <select
                id="recipe-type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                  setVisibleCount(10);
                }}
              >
                <option value="All">All Types</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">
                  Non-Vegetarian
                </option>
              </select>
            </div>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="recipes-grid">
              {visibleRecipes.map((recipe) => {
                const saved = isFavorite(recipe.id);

                return (
                  <article className="recipe-card" key={recipe.id}>
                    <div
                      className="recipe-image"
                      style={{ position: "relative" }}
                    >
                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="recipe-card-main-link"
                        aria-label={`View ${recipe.name}`}
                      >
                        <img
                          src={recipe.image}
                          alt={recipe.name}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>

                      <button
                        type="button"
                        className={`favorite-button ${
                          saved ? "saved" : ""
                        }`}
                        onClick={(event) =>
                          handleFavoriteClick(event, recipe.id)
                        }
                        aria-label={
                          saved
                            ? `Remove ${recipe.name} from favorites`
                            : `Save ${recipe.name} to favorites`
                        }
                        aria-pressed={saved}
                        title={
                          saved
                            ? "Remove from favorites"
                            : "Save to favorites"
                        }
                        style={{
                          position: "absolute",
                          top: "13px",
                          right: "13px",
                          width: "40px",
                          height: "40px",
                          border: 0,
                          borderRadius: "50%",
                          background: saved ? "#fff0e8" : "#ffffff",
                          color: saved ? "#ff6b1a" : "#65564c",
                          boxShadow:
                            "0 4px 14px rgba(40, 25, 15, 0.14)",
                        }}
                      >
                        <Heart
                          size={19}
                          fill={saved ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="recipe-content">
                      <div className="recipe-meta">
                        <span>{recipe.category}</span>
                        <span>
                          {recipe.prepTime + recipe.cookingTime} min
                        </span>
                      </div>

                      <Link
                        to={`/recipes/${recipe.id}`}
                        className="recipe-title-link"
                      >
                        <h3>{recipe.name}</h3>
                      </Link>

                      <p>{recipe.description}</p>

                      <div className="recipe-bottom">
                        <div className="recipe-rating">
                          <span>⭐</span>
                          <strong>{recipe.rating}</strong>
                          <small>({recipe.reviews})</small>
                        </div>

                        <span className="recipe-type">
                          {recipe.type}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="no-recipes">
              <h3>No recipes found</h3>
              <p>Try another recipe name, ingredient, or filter.</p>
            </div>
          )}

          {visibleCount < filteredRecipes.length && (
            <div className="view-more-wrapper">
              <button
                className="view-more-button"
                onClick={() =>
                  setVisibleCount((count) => count + 10)
                }
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Recipes;