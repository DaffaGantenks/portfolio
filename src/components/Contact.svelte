<script>
  import { fade } from 'svelte/transition';

  // Svelte 5 state variables
  let name = $state('');
  let email = $state('');
  let message = $state('');
  
  let errors = $state({ name: '', email: '', message: '' });
  let status = $state('idle'); // 'idle' | 'submitting' | 'success'

  function validate() {
    let isValid = true;
    errors = { name: '', email: '', message: '' };

    if (!name.trim()) {
      errors.name = 'Your name is required';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Your email address is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!message.trim()) {
      errors.message = 'Please provide details about your project';
      isValid = false;
    }

    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    status = 'submitting';
    
    // Simulate API request processing
    setTimeout(() => {
      status = 'success';
      name = '';
      email = '';
      message = '';
    }, 1800);
  }

  function resetForm() {
    status = 'idle';
  }
</script>

<section class="contact-section" id="contact">
  <div class="contact-bg"></div>
  <p class="section-label">Let's Connect</p>
  <h2 class="contact-title">
    Let's Build<br>
    <span>Something Bold</span>
  </h2>

  <div class="contact-container">
    {#if status !== 'success'}
      <form onsubmit={handleSubmit} class="contact-form" novalidate>
        <div class="form-row">
          <div class="form-group">
            <input 
              type="text" 
              bind:value={name} 
              placeholder="Your Name" 
              class:error={errors.name}
              disabled={status === 'submitting'}
              required
            />
            {#if errors.name}
              <span class="error-msg" transition:fade={{ duration: 150 }}>{errors.name}</span>
            {/if}
          </div>

          <div class="form-group">
            <input 
              type="email" 
              bind:value={email} 
              placeholder="Your Email" 
              class:error={errors.email}
              disabled={status === 'submitting'}
              required
            />
            {#if errors.email}
              <span class="error-msg" transition:fade={{ duration: 150 }}>{errors.email}</span>
            {/if}
          </div>
        </div>

        <div class="form-group">
          <textarea 
            bind:value={message} 
            placeholder="Tell me about your project, idea or inquiry..." 
            rows="5"
            class:error={errors.message}
            disabled={status === 'submitting'}
            required
          ></textarea>
          {#if errors.message}
            <span class="error-msg" transition:fade={{ duration: 150 }}>{errors.message}</span>
          {/if}
        </div>

        <button type="submit" class="btn-primary form-submit" disabled={status === 'submitting'}>
          {#if status === 'submitting'}
            <span class="spinner"></span> Sending...
          {:else}
            Send Message
          {/if}
        </button>
      </form>
    {:else}
      <div class="success-card" transition:fade={{ duration: 250 }}>
        <div class="success-icon">✓</div>
        <h3>Message Sent!</h3>
        <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
        <button onclick={resetForm} class="btn-outline">Send another message</button>
      </div>
    {/if}
  </div>

  <div class="contact-direct">
    <p>Or send a direct email to</p>
    <a href="mailto:hello@daffaaufa.dev" class="contact-email">
      hello@daffaaufa.dev →
    </a>
  </div>
</section>

<style>
  .contact-section {
    padding: 8rem 3rem 6rem;
    text-align: center;
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--border);
  }
  .contact-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 100%, rgba(200,255,0,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .contact-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 1;
    margin-bottom: 2rem;
  }
  .contact-title span {
    display: block;
    color: var(--accent);
    font-style: italic;
  }

  /* Form Container */
  .contact-container {
    max-width: 680px;
    margin: 0 auto 4rem;
    position: relative;
    z-index: 10;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
  }
  .contact-form input, .contact-form textarea {
    width: 100%;
    padding: 1.1rem 1.4rem;
    background-color: var(--bg2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: var(--transition-smooth);
    outline: none;
  }
  .contact-form input:focus, .contact-form textarea:focus {
    border-color: var(--accent);
    background-color: rgba(255, 255, 255, 0.02);
  }
  .contact-form input.error, .contact-form textarea.error {
    border-color: var(--accent2);
  }
  .error-msg {
    font-size: 0.72rem;
    color: var(--accent2);
    margin-top: 0.4rem;
    letter-spacing: 0.02em;
  }
  .form-submit {
    align-self: center;
    padding: 1rem 3rem;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
  }
  .form-submit:disabled {
    opacity: 0.75;
  }

  /* Spinner */
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(10, 10, 15, 0.2);
    border-top-color: #0a0a0f;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Success Card */
  .success-card {
    background-color: var(--bg2);
    border: 1px solid var(--border);
    padding: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    border-top: 2px solid var(--accent);
  }
  .success-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: rgba(var(--accent-rgb), 0.1);
    color: var(--accent);
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(var(--accent-rgb), 0.2);
    margin-bottom: 0.5rem;
  }
  .success-card h3 {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 500;
  }
  .success-card p {
    color: var(--muted);
    font-size: 0.95rem;
    max-width: 380px;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  /* Direct contact */
  .contact-direct p {
    font-size: 0.82rem;
    color: var(--muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }
  .contact-email {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-display);
    font-size: 1.3rem;
    color: var(--text);
    text-decoration: none;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
    transition: border-color 0.3s ease, color 0.3s ease;
  }
  .contact-email:hover { 
    border-color: var(--accent); 
    color: var(--accent); 
  }

  @media (max-width: 768px) {
    .contact-section {
      padding: 6rem 1.5rem 4rem;
    }
    .form-row {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }
</style>
