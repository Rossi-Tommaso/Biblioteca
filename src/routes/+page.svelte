<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Firebase imports (make sure to install firebase with npm)
  import { initializeApp } from 'firebase/app';
  import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
  } from 'firebase/auth';

  // Initialize Firebase
  let app;
  let auth;
  let googleProvider;

  // User store
  const user = writable(null);

  // Form states
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  onMount(() => {
    // Initialize Firebase when component mounts
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      user.set(currentUser);
    });

    // Cleanup subscription on component destroy
    return () => unsubscribe();
  });

  // Email/Password Sign Up
  async function handleSignUp() {
    error = '';
    isLoading = true;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.set(userCredential.user);
    } catch (err) {
      error = err.message;
    }
    isLoading = false;
  }

  // Email/Password Sign In
  async function handleSignIn() {
    error = '';
    isLoading = true;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.set(userCredential.user);
    } catch (err) {
      error = err.message;
    }
    isLoading = false;
  }

  // Google Sign In
  async function handleGoogleSignIn() {
    error = '';
    isLoading = true;
    try {
      const result = await signInWithPopup(auth, googleProvider);
      user.set(result.user);
    } catch (err) {
      error = err.message;
    }
    isLoading = false;
  }

  // Sign Out
  async function handleSignOut() {
    try {
      await signOut(auth);
      user.set(null);
    } catch (err) {
      error = err.message;
    }
  }
</script>

<div class="auth-container">
  {#if $user}
    <div class="user-profile">
      <h2>Benvenuto, {$user.displayName || $user.email}!</h2>
      
      {#if $user.photoURL}
        <img 
          src={$user.photoURL} 
          alt="Profilo utente" 
          class="user-avatar"
        />
      {/if}
      
      <div class="user-details">
        <p>Email: {$user.email}</p>
        <p>ID Utente: {$user.uid}</p>
      </div>
      
      <button on:click={handleSignOut} class="sign-out-btn">
        Esci
      </button>
    </div>
  {:else}
    <div class="auth-form">
      <h2>Accedi o Registrati</h2>
      
      {#if error}
        <p class="error-message">{error}</p>
      {/if}
      
      <input 
        type="email" 
        placeholder="Email" 
        bind:value={email}
        disabled={isLoading}
      />
      
      <input 
        type="password" 
        placeholder="Password" 
        bind:value={password}
        disabled={isLoading}
      />
      
      <div class="button-group">
        <button 
          on:click={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? 'Accesso in corso...' : 'Accedi'}
        </button>
        
        <button 
          on:click={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? 'Registrazione...' : 'Registrati'}
        </button>
      </div>
      
      <div class="social-login">
        <button 
          on:click={handleGoogleSignIn}
          disabled={isLoading}
          class="google-btn"
        >
          Accedi con Google
        </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .auth-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .auth-form input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .button-group {
    display: flex;
    gap: 1rem;
  }

  .button-group button,
  .social-login button {
    flex: 1;
    padding: 0.75rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .button-group button:nth-child(2) {
    background-color: #2196F3;
  }

  .google-btn {
    background-color: #DB4437;
    margin-top: 1rem;
  }

  .user-profile {
    text-align: center;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin: 1rem 0;
  }

  .sign-out-btn {
    background-color: #f44336;
  }

  .error-message {
    color: red;
    margin-bottom: 1rem;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
</style>