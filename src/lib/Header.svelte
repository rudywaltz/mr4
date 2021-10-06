<script>
	import { page } from '$app/stores';

</script>

<nav>
  <a
    href="/musorok/gombapresszo"
    class:active={$page.path === '/musorok/gombapresszo'}
    sveltekit:prefetch
  >Gombapresszó</a>
  <a
    href="/musorok/mindenkiboldog"
    class:active={$page.path === '/musorok/mindenkiboldog'}
    sveltekit:prefetch
  >Vendéglő a Világvégén</a>
  <a
    href="/musorok/spagettilakoauto"
    class:active={$page.path === '/musorok/spagettilakoauto'}
    sveltekit:prefetch
    >Spagetti Lakóautó</a>
</nav>


<style lang="scss">
  nav {
    background-color: #252525;

    a {
      color: #fff;
      display: inline-block;
      font-size: 1.2rem;
      padding: 1rem;

      &:hover {
        background: rgb(53, 53, 53);
      }

      &.active {
        color: red;
      }
    }
  }
</style>
