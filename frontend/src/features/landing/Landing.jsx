import React from "react";
import "./landing.scss";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div className="landing-page">
      <header className="hero">
        <div className="hero-inner">
          <h1>Smart Interview Plans, Faster Hires</h1>
          <p>
            Generate tailored interview strategies from your resume and target
            job description — powered by AI, trusted by professionals.
          </p>
          <div className="hero-cta">
            <Link className="button primary-button" to="/register">
              Try for Free
            </Link>
            <Link className="button" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <section id="features" className="features">
        <h2>Why GenaI</h2>
        <div className="cards">
          <article className="card">
            <h3>AI-driven Analysis</h3>
            <p>Automated insights from job descriptions and your resume.</p>
          </article>
          <article className="card">
            <h3>Actionable Plans</h3>
            <p>Step-by-step strategy and suggested responses for interviews.</p>
          </article>
          <article className="card">
            <h3>Private & Secure</h3>
            <p>We keep your data secure and only use it to generate plans.</p>
          </article>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2>What users say</h2>
        <div className="test-list">
          <blockquote>
            "This tool helped me prepare and land the job — highly recommend."
            <cite>- Alex P.</cite>
          </blockquote>
          <blockquote>
            "Concise and practical advice that saved me hours of prep."
            <cite>- Maya S.</cite>
          </blockquote>
        </div>
      </section>

      <section className="cta-bar">
        <div>
          <h3>Ready to get interview-ready?</h3>
        </div>
        <div>
          <Link className="button primary-button" to="/register">
            Start Now
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div>© {new Date().getFullYear()} GenaI</div>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
