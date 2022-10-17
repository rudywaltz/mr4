<script>
  export let src;
  export let alt = '';

  import IntersectionObserver from './IntersectionObserver.svelte';
  import Image from './Image.svelte';
  let nativeLoading = false;
</script>

<IntersectionObserver once={true} let:intersecting top="100">
  {#if intersecting || nativeLoading}
    <Image {alt} {src} />
  {/if}
</IntersectionObserver>
