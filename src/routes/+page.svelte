<script>
    import Login from "../componets/login.svelte";
    import Register from "../componets/register.svelte";
    import LoginGradient from "../componets/loginGradient.svelte";
    import { sign_up } from "../stores/authStore"
</script>

<LoginGradient />

<div class="center-VO">
    {#if !$sign_up}
        <Login />
    {:else}
        <Register />
    {/if}
</div>
