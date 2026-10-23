
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Clock3,
  Heart,
  ChefHat,
  Search,
  Star,
  Utensils,
  Leaf,
  Sparkles,
  BookOpen,
  Mail,
  CookingPot,
  Flame,
  CheckCircle2,
} from "lucide-react";
import recipes from "../data/recipes";

const categories = [
  { name: "Indian", icon: "🍛", description: "Authentic Indian flavors" },
  { name: "Italian", icon: "🍕", description: "Pizza, pasta & more" },
  { name: "Chinese", icon: "🥡", description: "Delicious Asian dishes" },
  { name: "Desserts", icon: "🍰", description: "Sweet little moments" },
  { name: "Healthy", icon: "🥗", description: "Fresh & nourishing" },
  { name: "Quick & Easy", icon: "⚡", description: "Ready in less time" },
];

const cookingTips = [
  {
    number: "01",
    title: "Prep before you cook",
    description:
      "Wash, chop, and measure your ingredients before turning on the stove.",
    icon: "🔪",
  },
  {
    number: "02",
    title: "Taste as you go",
    description:
      "Adjust your seasoning little by little to bring out the best flavors.",
    icon: "🧂",
  },
  {
    number: "03",
    title: "Keep it fresh",
    description:
      "Fresh herbs and a squeeze of lemon can transform an ordinary dish.",
    icon: "🌿",
  },
];

function Home() {
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const trendingRecipes = [...recipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const quickRecipes = recipes
    .filter((recipe) => recipe.cookingTime <= 35)
    .slice(0, 4);

  const chefSpecials = [...recipes]
    .sort((a, b) => b.reviews - a.reviews)
    .slice(0, 3);

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/recipes${search.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""}`);
  };

  const handleCategory = (category) => {
    navigate(`/recipes?category=${encodeURIComponent(category)}`);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <main className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">
              <Sparkles size={14} />
              GOOD FOOD, HAPPY LIFE
            </span>

            <h1>
              Discover Amazing
              <br />
              <span>Recipes</span> for Every Mood
            </h1>

            <p>
              From comforting home-cooked meals to exciting new flavors,
              discover recipes that make every bite memorable.
            </p>

            <form className="hero-search" onSubmit={handleSearch}>
              <Search size={20} />
              <input
                type="text"
                placeholder="Search recipes, ingredients..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search recipes"
              />
              <button type="submit">Search</button>
            </form>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>20+</strong>
                <span>Recipes to Explore</span>
              </div>
              <div className="hero-stat">
                <strong>4.8★</strong>
                <span>Recipe Ratings</span>
              </div>
              <div className="hero-stat">
                <strong>6</strong>
                <span>Food Categories</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1000&q=85"
                alt="Freshly prepared creamy pasta"
              />
            </div>

            <div className="hero-rating-card">
              <span className="home-rating-icon">⭐</span>
              <div>
                <strong>4.9/5</strong>
                <span>Loved by foodies</span>
              </div>
            </div>

            <div className="hero-floating-card">
              <span>🍴</span>
              <div>
                <strong>Made with love</strong>
                <small>Served with happiness!</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="categories-section home-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span>EXPLORE YOUR TASTE</span>
              <h2>Popular Categories</h2>
              <p>Find something delicious for every craving.</p>
            </div>

            <Link to="/recipes" className="home-text-link">
              View All Recipes <ArrowRight size={17} />
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <button
                type="button"
                className="category-card"
                key={category.name}
                onClick={() => handleCategory(category.name)}
              >
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-arrow">
                  <ArrowRight size={17} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING RECIPES */}
      <section className="home-section trending-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span>
                <Flame size={15} /> TRENDING NOW
              </span>
              <h2>Recipes Everyone Loves</h2>
              <p>Explore some of the highest-rated recipes in our collection.</p>
            </div>

            <Link to="/recipes" className="home-text-link">
              Explore Recipes <ArrowRight size={17} />
            </Link>
          </div>

          <div className="home-recipe-grid">
            {trendingRecipes.map((recipe) => (
              <Link
                to={`/recipes/${recipe.id}`}
                className="home-recipe-card"
                key={recipe.id}
              >
                <div className="home-recipe-image">
                  <img src={recipe.image} alt={recipe.name} />
                  <span className="home-recipe-category">
                    {recipe.category}
                  </span>
                  <span className="home-recipe-heart">
                    <Heart size={17} />
                  </span>
                </div>

                <div className="home-recipe-content">
                  <div className="home-recipe-meta">
                    <span>
                      <Star size={15} fill="currentColor" />
                      {recipe.rating}
                    </span>
                    <span>
                      <Clock3 size={15} />
                      {recipe.cookingTime} min
                    </span>
                  </div>

                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>

                  <span className="home-recipe-link">
                    View Recipe <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK AND EASY */}
      <section className="home-section quick-section">
        <div className="container">
          <div className="quick-banner">
            <div className="quick-banner-content">
              <span className="home-eyebrow">SHORT ON TIME?</span>
              <h2>Big flavors. Less time.</h2>
              <p>
                Delicious meals don't have to take all day. Discover easy
                recipes for your busy everyday life.
              </p>
              <Link to="/recipes" className="home-primary-button">
                Find Quick Recipes <ArrowRight size={17} />
              </Link>
            </div>

            <div className="quick-banner-image">
              <img
                src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=80"
                alt="A quick and delicious pasta meal"
              />
            </div>
            <span className="quick-banner-decoration">🍝</span>
          </div>

          <div className="section-heading quick-heading">
            <div>
              <span>FAST & FLAVORFUL</span>
              <h2>Quick & Easy Meals</h2>
              <p>Spend less time cooking and more time enjoying.</p>
            </div>
            <Link to="/recipes" className="home-text-link">
              See All <ArrowRight size={17} />
            </Link>
          </div>

          <div className="quick-recipe-list">
            {quickRecipes.map((recipe) => (
              <Link
                to={`/recipes/${recipe.id}`}
                className="quick-recipe-item"
                key={recipe.id}
              >
                <img src={recipe.image} alt={recipe.name} />
                <div>
                  <span>{recipe.category}</span>
                  <h3>{recipe.name}</h3>
                  <p>
                    <Clock3 size={14} /> {recipe.cookingTime} minutes
                  </p>
                </div>
                <ArrowRight className="quick-item-arrow" size={19} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF'S SPECIAL */}
      <section className="home-section chef-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span>
                <ChefHat size={16} /> CHEF'S PICKS
              </span>
              <h2>Specially Loved Recipes</h2>
              <p>Popular picks from our recipe collection.</p>
            </div>
          </div>

          <div className="chef-special-grid">
            {chefSpecials.map((recipe, index) => (
              <Link
                to={`/recipes/${recipe.id}`}
                className="chef-special-card"
                key={recipe.id}
              >
                <div className="chef-special-image">
                  <img src={recipe.image} alt={recipe.name} />
                  <span>0{index + 1}</span>
                </div>
                <div className="chef-special-content">
                  <span>{recipe.category} · {recipe.type}</span>
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>
                  <div>
                    <span>
                      <Star size={15} fill="currentColor" />
                      {recipe.rating}
                    </span>
                    <span>{recipe.reviews} reviews</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FOODIEHUB */}
      <section className="home-section why-section">
        <div className="container">
          <div className="why-heading">
            <span>WHY FOODIEHUB?</span>
            <h2>Your kitchen, your happy place.</h2>
            <p>
              Great food starts with inspiration. We're here to make finding
              and preparing your next favorite dish feel simple and fun.
            </p>
          </div>

          <div className="why-grid">
            <article className="why-card">
              <span className="why-icon orange">
                <BookOpen size={25} />
              </span>
              <h3>Easy-to-Follow Recipes</h3>
              <p>
                Clear ingredients and step-by-step instructions help you cook
                with confidence.
              </p>
            </article>

            <article className="why-card">
              <span className="why-icon green">
                <Leaf size={25} />
              </span>
              <h3>Something for Everyone</h3>
              <p>
                Discover vegetarian favorites, hearty meals, desserts, and
                more in one place.
              </p>
            </article>

            <article className="why-card">
              <span className="why-icon yellow">
                <Heart size={25} />
              </span>
              <h3>Save Your Favorites</h3>
              <p>
                Keep your favorite recipes close so they're easy to find again.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="home-section how-section">
        <div className="container">
          <div className="section-heading centered-heading">
            <div>
              <span>YOUR NEXT MEAL STARTS HERE</span>
              <h2>Cooking Made Simple</h2>
              <p>Three little steps to something delicious.</p>
            </div>
          </div>

          <div className="how-grid">
            <article className="how-card">
              <span className="how-number">01</span>
              <div className="how-icon"><Search size={25} /></div>
              <h3>Discover</h3>
              <p>Search for recipes, ingredients, or cuisines you love.</p>
            </article>

            <article className="how-card">
              <span className="how-number">02</span>
              <div className="how-icon"><CookingPot size={25} /></div>
              <h3>Prepare</h3>
              <p>Check the ingredients and follow simple cooking steps.</p>
            </article>

            <article className="how-card">
              <span className="how-number">03</span>
              <div className="how-icon"><Utensils size={25} /></div>
              <h3>Enjoy</h3>
              <p>Serve your creation and make every meal memorable.</p>
            </article>
          </div>
        </div>
      </section>

      {/* COOKING TIPS */}
      <section className="home-section tips-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span>FROM OUR KITCHEN</span>
              <h2>Little Tips, Better Cooking</h2>
              <p>Simple habits that can make your everyday cooking easier.</p>
            </div>
            <span className="tips-decoration">🥄</span>
          </div>

          <div className="tips-grid">
            {cookingTips.map((tip) => (
              <article className="tip-card" key={tip.number}>
                <div className="tip-top">
                  <span className="tip-emoji">{tip.icon}</span>
                  <span>{tip.number}</span>
                </div>
                <h3>{tip.title}</h3>
                <p>{tip.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="home-section newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-icon">
              <Mail size={28} />
            </div>
            <span className="home-eyebrow">A LITTLE TASTE OF INSPIRATION</span>
            <h2>Good recipes, straight to your inbox.</h2>
            <p>
              Get fresh ideas for your next meal and make every day a little
              more delicious.
            </p>

            {subscribed ? (
              <div className="newsletter-success" role="status">
                <CheckCircle2 size={19} />
                You're subscribed! Thanks for joining FoodieHub.
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  aria-label="Email address"
                />
                <button type="submit">Subscribe <ArrowRight size={16} /></button>
              </form>
            )}
            <small>No spam, just something delicious.</small>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-section final-cta-section">
        <div className="container final-cta">
          <div>
            <span className="home-eyebrow">READY TO GET COOKING?</span>
            <h2>Your next favorite meal is waiting.</h2>
            <p>Explore the collection and find a recipe worth sharing.</p>
          </div>
          <Link to="/recipes" className="home-primary-button">
            Browse All Recipes <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;