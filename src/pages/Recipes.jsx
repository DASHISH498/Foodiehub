import recipes from "../data/recipes";
import { useState } from "react";
import { Link } from "react-router-dom";

function Recipes() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || recipe.category === category;

    const matchesType = type === "All" || recipe.type === type;

    return matchesSearch && matchesCategory && matchesType;
  });

  const visibleRecipes = filteredRecipes.slice(0, visibleCount);

  const handleViewMore = () => {
    setVisibleCount((previousCount) => previousCount + 10);
  };

  return (
    <main className="recipes-page">
      <section className="recipes-section">
        <div className="container">
          <div className="recipes-header">
            <div>
              <span>EXPLORE OUR COLLECTION</span>

              <h1>Discover Delicious Recipes</h1>

              <p>
                Find your next favorite recipe and enjoy cooking something
                delicious.
              </p>
            </div>

            <div className="recipe-count">
              <strong>{filteredRecipes.length}+</strong>
              <span>Recipes</span>
            </div>
          </div>

          <div className="recipes-search">
            <input
              type="text"
              placeholder="Search Recipies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="categroy-filter flex gap-4">
            {/* Filters */}
            <div className="recipe-filters">
              <div className="filter-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Indian">Indian</option>
                  <option value="Italian">Italian</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Desserts">Desserts</option>
                </select>
              </div>
            </div>

            {/* TYPE */}
            <div className="filter-group">
              <label>Food Type</label>

              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="All">All</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
            </div>
          </div>

          <div className="recipes-grid">
            {visibleRecipes.map((recipe) => (
              <Link to={`/recipes/${recipe.id}`} className="recipe-card" key={recipe.id}>
                <div className="recipe-image">
                  <img src={recipe.image} alt={recipe.name} />

                  <button className="favorite-button">♡</button>
                </div>

                <div className="recipe-content">
                  <div className="recipe-meta">
                    <span>{recipe.category}</span>

                    <span>{recipe.cookingTime} min</span>
                  </div>

                  <h2 className="font-medium">{recipe.name}</h2>

                  <p>{recipe.description}</p>

                  <div className="recipe-bottom">
                    <div className="recipe-rating">
                      <span>⭐</span>

                      <strong>{recipe.rating}</strong>

                      <small>({recipe.reviews})</small>
                    </div>

                    <span className="recipe-type">{recipe.type}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* No Result */}
          {filteredRecipes.length === 0 && (
            <div className="no-recipes">
              <h3>No recipes found</h3>
              <p>Try searching with another recipe name.</p>
            </div>
          )}

          {/* View More */}
          {visibleCount < filteredRecipes.length && (
            <div className="view-more-wrapper">
              <button className="view-more-button" onClick={handleViewMore}>
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
