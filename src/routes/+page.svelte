<script>
    import Login from "../componets/login.svelte";
    import Register from "../componets/register.svelte";
    import LoginGradient from "../componets/loginGradient.svelte";
    import { sidebarVisible } from "../stores/utilsStore";
    import { sign_up } from "../stores/authStore"
    import { onMount } from "svelte";

    onMount(() => {
        sidebarVisible.set(false);
    });
</script>
<script context="module">
    export const hideHeader = true;
</script>

<LoginGradient />

<div class="center-VO" id="v1.9">
    {#if !$sign_up}
        <Login />
    {:else}
        <Register />
    {/if}
</div>
