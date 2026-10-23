
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Frontend demo only: no message is sent to a server.
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <span className="contact-eyebrow">
            <MessageCircle size={16} />
            WE'D LOVE TO HEAR FROM YOU
          </span>

          <h1>
            Let's Start a
            <span> Conversation.</span>
          </h1>

          <p>
            Have a question, suggestion, or recipe idea? Send us
            a message. We'd love to hear what's cooking.
          </p>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container contact-layout">
          <aside className="contact-info-panel">
            <span className="contact-panel-label">
              GET IN TOUCH
            </span>

            <h2>Let's talk about food.</h2>

            <p>
              Share your feedback, ask a question, or tell us
              what you'd like to see on FoodieHub.
            </p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <span><Mail size={20} /></span>
                <div>
                  <small>Email</small>
                  <strong>hello@foodiehub.example</strong>
                </div>
              </div>

              <div className="contact-info-item">
                <span><Phone size={20} /></span>
                <div>
                  <small>Phone</small>
                  <strong>Contact details coming soon</strong>
                </div>
              </div>

              <div className="contact-info-item">
                <span><MapPin size={20} /></span>
                <div>
                  <small>Location</small>
                  <strong>FoodieHub Online</strong>
                </div>
              </div>

              <div className="contact-info-item">
                <span><Clock3 size={20} /></span>
                <div>
                  <small>Availability</small>
                  <strong>Send us a message anytime</strong>
                </div>
              </div>
            </div>

            <div className="contact-info-note">
              <ChefHatIcon />
              <p>
                Good food starts with great ideas. Yours could
                inspire our next recipe!
              </p>
            </div>
          </aside>

          <div className="contact-form-panel">
            <span className="contact-form-label">SEND A MESSAGE</span>
            <h2>How can we help?</h2>
            <p className="contact-form-description">
              Fill in the details below and let us know what's
              on your mind.
            </p>

            {submitted && (
              <div className="contact-success" role="status">
                <CheckCircle2 size={20} />
                <span>
                  Thanks for reaching out! This demo form
                  validated your message, but it hasn't been
                  sent to a server.
                </span>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  minLength={10}
                />
              </div>

              <button type="submit" className="contact-submit-button">
                Send Message <Send size={17} />
              </button>

              <p className="contact-privacy-note">
                All fields are required. Backend delivery is not
                configured yet.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function ChefHatIcon() {
  return <span aria-hidden="true">👨‍🍳</span>;
}

export default Contact;
