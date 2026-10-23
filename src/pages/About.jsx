
import { Link } from "react-router-dom";
import {
  Heart,
  ChefHat,
  Leaf,
  Users,
  ArrowRight,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";

function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-content">
            <span className="about-eyebrow">
              <Sparkles size={16} />
              OUR STORY, OUR PASSION
            </span>

            <h1>
              Bringing People
              <br />
              Together Through
              <br />
              <span>Good Food.</span>
            </h1>

            <p>
              At FoodieHub, we believe every great meal tells a
              story. Discover delicious recipes, explore new
              flavors, and make every moment in your kitchen
              special.
            </p>

            <Link to="/recipes" className="about-primary-button">
              Explore Recipes <ArrowRight size={18} />
            </Link>
          </div>

          <div className="about-hero-visual">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85"
              alt="A warm and welcoming home kitchen"
            />

            <div className="about-floating-card">
              <span className="about-floating-icon">
                <Heart size={22} fill="currentColor" />
              </span>
              <div>
                <strong>Made with love</strong>
                <p>Shared with everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-image">
            <img
              src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85"
              alt="People sharing food around a table"
              loading="lazy"
            />
            <div className="about-image-caption">
              <ChefHat size={20} />
              <span>Made for food lovers</span>
            </div>
          </div>

          <div className="about-story-content">
            <span className="about-section-label">WHO WE ARE</span>
            <h2>
              More Than Recipes.
              <span> It's an Experience.</span>
            </h2>

            <p>
              Food brings people closer. It's part of our
              celebrations, our traditions, and our everyday
              moments.
            </p>

            <p>
              FoodieHub is designed to make discovering and
              preparing meals easier and more enjoyable. Whether
              you're trying something new or cooking a familiar
              favorite, we're here to inspire your next dish.
            </p>

            <div className="about-story-points">
              <div>
                <span><Leaf size={18} /></span>
                <div>
                  <strong>Explore New Flavors</strong>
                  <p>Discover dishes from different cuisines.</p>
                </div>
              </div>

              <div>
                <span><Heart size={18} /></span>
                <div>
                  <strong>Cook with Love</strong>
                  <p>Find inspiration for everyday meals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <div className="container">
          <div className="about-section-heading">
            <span className="about-section-label">WHAT WE BELIEVE</span>
            <h2>Our Kitchen, Our Values</h2>
            <p>
              Everything we do starts with a love for food and
              the joy it brings.
            </p>
          </div>

          <div className="about-values-grid">
            <article className="about-value-card">
              <span className="about-value-icon">
                <ChefHat size={26} />
              </span>
              <h3>Simple Cooking</h3>
              <p>
                Make everyday cooking approachable with recipes
                and step-by-step guidance.
              </p>
            </article>

            <article className="about-value-card">
              <span className="about-value-icon">
                <Heart size={26} />
              </span>
              <h3>Made with Passion</h3>
              <p>
                Celebrate the creativity, care, and happiness
                that go into preparing a meal.
              </p>
            </article>

            <article className="about-value-card">
              <span className="about-value-icon">
                <Users size={26} />
              </span>
              <h3>Food for Everyone</h3>
              <p>
                Explore different food preferences and discover
                something for every craving.
              </p>
            </article>

            <article className="about-value-card">
              <span className="about-value-icon">
                <UtensilsCrossed size={26} />
              </span>
              <h3>Discover More</h3>
              <p>
                Find inspiration to try new ingredients, dishes,
                and cooking ideas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-cta-section">
        <div className="container about-cta-inner">
          <div>
            <span>YOUR NEXT FAVORITE DISH AWAITS</span>
            <h2>Let's Make Something Delicious.</h2>
            <p>
              Browse our recipe collection and find inspiration
              for your next meal.
            </p>
          </div>

          <Link to="/recipes" className="about-cta-button">
            Find Your Recipe <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
