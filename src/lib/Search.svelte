<script>
  import { createEventDispatcher } from 'svelte';
  export let searchTerm = ''

  const dispatch = createEventDispatcher();
	let timer;

	const debounce = value => {
		clearTimeout(timer);
		timer = setTimeout(() => {
      dispatch('searchTerm', value)
		}, 750);
	}
</script>


<form class="searchForm">
  <label for="searchInput">Keresés</label>
  <input type="text" id="searchInput" value="{searchTerm}" on:keyup={({ target: { value } }) => debounce(value)}>
</form>
