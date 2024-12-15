<script>
    import { auth } from "../lib/firebase.config";
    import { createUserWithEmailAndPassword } from "firebase/auth";
    let email = "";
    let password = "";
    let error = "";

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registrazione completata");
        } catch (e) {
            error = e.message;
        }
    };
</script>

<div>
    <h1>Registrati</h1>
    <input type="email" placeholder="Email" bind:value={email} />
    <input type="password" placeholder="Password" bind:value={password} />
    <button on:click={register}>Registrati</button>
    {#if error}
        <p style="color: red;">{error}</p>
    {/if}
</div>
