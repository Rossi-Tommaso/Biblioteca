<main>
    <slot />
</main>

<style>
    :global(*) {
        margin: 0;
        padding: 0;
    }

    :global(.center-VO) {/*  orizontal and vertical center */        
        width: 100dvw;
        height: 100dvh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    :global(body) {
        background-color: black;
    }
</style>