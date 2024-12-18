<script>
  import { auth } from "../lib/firebase.config";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { sign_up } from "../stores/authStore";

  let email = "";
  let password = "";
  let error = "";

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      $sign_up = false;
    } catch (e) {
      error = e.message;
    }
  };

  function toggleSignUp() {
    $sign_up = false;
  }
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
        type="password"
        class="input"
        placeholder="Enter your Password"
        bind:value={password}
      />
    </div>
    <!-- 
        <div class="flex-row">
          <div>
            <input type="checkbox" />
            <label for="checkbox">Remember me</label>
          </div>
          <span class="span">Forgot password?</span>
        </div>
     -->
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

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
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
