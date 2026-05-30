<script>
  const currentYear = new Date().getFullYear();
</script>

<footer>
  <p class="footer-copy">© {currentYear} Daffa Aufa. Crafted with precision.</p>
  <div class="social-links">
    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">Dribbble</a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
  </div>
</footer>

<style>
  footer {
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
    background-color: var(--bg);
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  .footer-copy {
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }
  .social-links {
    display: flex;
    gap: 1.8rem;
  }
  .social-links a {
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.3s ease;
  }
  .social-links a:hover { color: var(--accent); }

  @media (max-width: 576px) {
    footer {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 2.5rem 1.5rem;
    }
  }
</style>
