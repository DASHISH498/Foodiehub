function Home() {
  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">

          {/* Left Content */}
          <div className="hero-content">

            <span className="hero-tag">
              GOOD FOOD, HAPPY LIFE
            </span>

            <h1>
              Discover Amazing
              <br />
              <span>Recipes</span>
            </h1>

            <p>
              Explore delicious recipes, discover new flavors,
              and make every meal special with FoodieHub.
            </p>

            <div className="hero-search">
              <input
                type="text"
                placeholder="Search for recipes, ingredients, or cuisines..."
              />

              <button>
                Search
              </button>
            </div>

            <div className="hero-stats">

              <div className="hero-stat">
                <strong>1,000+</strong>
                <span>Recipes</span>
              </div>

              <div className="hero-stat">
                <strong>500+</strong>
                <span>Chefs</span>
              </div>

              <div className="hero-stat">
                <strong>50K+</strong>
                <span>Food Lovers</span>
              </div>

            </div>

          </div>

          {/* Right Image */}
          <div className="hero-visual">

            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85"
                alt="Delicious pasta"
              />
            </div>

            <div className="hero-rating-card">
              <div className="rating-icon">
                ⭐
              </div>

              <div>
                <strong>4.9</strong>
                <span>Recipe Rating</span>
              </div>
            </div>

            <div className="hero-floating-card">
              <span>🍴</span>
              <div>
                <strong>Cook something</strong>
                <small>delicious today!</small>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories-section">
        <div className="container">

          <div className="section-heading">
            <div>
              <span>EXPLORE</span>
              <h2>Popular Categories</h2>
            </div>

            <a href="/recipes">
              View All →
            </a>
          </div>

          <div className="category-grid">

            <div className="category-card">
              <div className="category-icon">🍛</div>
              <h3>Indian</h3>
              <p>120 Recipes</p>
            </div>

            <div className="category-card">
              <div className="category-icon">🍕</div>
              <h3>Italian</h3>
              <p>95 Recipes</p>
            </div>

            <div className="category-card">
              <div className="category-icon">🥡</div>
              <h3>Chinese</h3>
              <p>80 Recipes</p>
            </div>

            <div className="category-card">
              <div className="category-icon">🍰</div>
              <h3>Desserts</h3>
              <p>75 Recipes</p>
            </div>

            <div className="category-card">
              <div className="category-icon">🥗</div>
              <h3>Healthy</h3>
              <p>65 Recipes</p>
            </div>

            <div className="category-card">
              <div className="category-icon">⚡</div>
              <h3>Quick & Easy</h3>
              <p>90 Recipes</p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Home;