<script>
  import { auth } from "../lib/firebase.config";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { sign_up } from "../stores/authStore";
  import { initializeUser } from "../lib/db_scripts/initializeUser";
  import { goto } from "$app/navigation";
  import { getBiblioteche } from "../lib/db_scripts/db_functions";
  import { onMount } from "svelte";

  let email = "";
  let password = "";
  let confirmPassword = "";
  let error = "";
  let passwordVisible = false;
  
  onMount(async () => {
    const biblioteche = await getBiblioteche();
    console.log(biblioteche);
  });

  const register = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      error = "Le password non corrispondono.";
      return;
    }
    if (!email.includes("@")) {
      error = "Inserisci un'email valida.";
      return;
    }
    if (password.length < 6) {
      error = "La password deve contenere almeno 6 caratteri.";
      return;
    }

    try {
      let userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const newUser = userCredential.user;
      await initializeUser(newUser.uid, "VIEWER", newUser.email);
      $sign_up = false;
      goto("./biblioteca");
    } catch (e) {
      error = e.message;
    }
  };

  function toggleSignUp() {
    $sign_up = false;
  }

  const togglePasswordVisibility = () => {
    passwordVisible = !passwordVisible;
  };
</script>

<div>
  <form class="form" on:submit={register}>
    <div class="flex-column">
      <label for="email">Email</label>
    </div>
    <div class="inputForm">
      <input
        type="email"
        class="input"
        placeholder="Enter your Email"
        bind:value={email}
      />
    </div>

    <div class="flex-column">
      <label for="password">Password</label>
    </div>
    <div class="inputForm">
      <input
        class="input password-hidden"
        type="password"
        placeholder="Enter your Password"
        bind:value={password}
        style="display: {passwordVisible ? 'none' : 'block'}"
      />
      <input
        class="input password-visible"
        type="text"
        placeholder="Enter your Password"
        bind:value={password}
        style="display: {passwordVisible ? 'block' : 'none'}"
      />
      <button
        type="button"
        class="toggle-password"
        on:click={togglePasswordVisibility}
        tabindex="-1"
        aria-label="Toggle password visibility"
      >
        {passwordVisible ? "🔓" : "🔒"}
      </button>
    </div>

    <div class="flex-column">
      <label for="confirmPassword">Conferma Password</label>
    </div>
    <div class="inputForm">
      <input
        class="input password-hidden"
        type="password"
        placeholder="Re-enter your Password"
        bind:value={confirmPassword}
        style="display: {passwordVisible ? 'none' : 'block'}"
      />
      <input
        class="input password-visible"
        type="text"
        placeholder="Re-enter your Password"
        bind:value={confirmPassword}
        style="display: {passwordVisible ? 'block' : 'none'}"
      />
    </div>

    <button type="submit" class="button-submit">Sign Up</button>
    <p class="p">
      Do you have an account?
      <button class="span" on:click={toggleSignUp}>Sign In</button>
    </p>
    {#if error}
      <p style="color: red;">{error}</p>
    {/if}
  </form>
</div>

<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .toggle-password {
    background: none;
    border: none;
    color: #000;
    cursor: pointer;
    font-size: 20px;
    margin-left: 10px;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    z-index: 99;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
    position: relative;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .password-hidden {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .password-visible {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    border: 0;
    background-color: transparent;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }
</style>
