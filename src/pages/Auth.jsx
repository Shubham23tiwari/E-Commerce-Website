import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function AuthLayout({ children, label, title, description }) {
  return <main className="auth-page"><div className="auth-visual"><div className="auth-visual-copy"><Link to="/" className="brand brand--light"><span className="brand-mark">s</span> shopease<span className="brand-period">.</span></Link><span className="eyebrow">A LITTLE MORE EVERYDAY</span><h2>Good things<br />start here<span className="brand-period">.</span></h2><p>A thoughtful little corner of the internet, full of things worth bringing home.</p></div><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85" alt="" /></div><div className="auth-form-wrap"><div className="auth-form-inner"><span className="eyebrow">{label}</span><h1>{title}</h1><p className="auth-description">{description}</p>{children}</div><span className="auth-footnote">Thoughtful finds. Feel-good shopping.</span></div></main>;
}

export function Login() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => { event.preventDefault(); setSubmitted(true); if (event.currentTarget.reportValidity()) navigate('/'); };
  return <AuthLayout label="WELCOME BACK" title="Hello again." description="Sign in to pick up where you left off."><form className="auth-form" onSubmit={handleSubmit}><label>Email address<input type="email" name="email" placeholder="you@example.com" required autoComplete="email" /></label><label>Password<input type="password" name="password" placeholder="At least 8 characters" required minLength="8" autoComplete="current-password" /></label>{submitted && <span className="form-success">Looking good — welcome back!</span>}<button className="button button--dark auth-submit" type="submit">Log in <ArrowRight size={17} /></button></form><p className="auth-switch">New around here? <Link to="/register">Create an account</Link></p></AuthLayout>;
}

export function Register() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => { event.preventDefault(); setError(''); const form = event.currentTarget; if (!form.reportValidity()) return; const data = new FormData(form); if (data.get('password') !== data.get('confirmPassword')) { setError('Those passwords don’t match. Give it another try.'); return; } navigate('/login', { state: { registered: true } }); };
  return <AuthLayout label="MAKE YOURSELF AT HOME" title="Let’s get acquainted." description="Create an account to save your favorite finds and make checkout a breeze."><form className="auth-form" onSubmit={handleSubmit}><label>Your name<input name="name" placeholder="Your name" required autoComplete="name" /></label><label>Email address<input type="email" name="email" placeholder="you@example.com" required autoComplete="email" /></label><label>Password<input type="password" name="password" placeholder="At least 8 characters and one number" required minLength="8" pattern="(?=.*[0-9]).{8,}" title="Use at least 8 characters and one number" autoComplete="new-password" /></label><label>Confirm password<input type="password" name="confirmPassword" placeholder="Enter your password again" required minLength="8" autoComplete="new-password" /></label>{error && <span className="form-error" role="alert">{error}</span>}<button className="button button--dark auth-submit" type="submit">Create account <ArrowRight size={17} /></button></form><p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p></AuthLayout>;
}
