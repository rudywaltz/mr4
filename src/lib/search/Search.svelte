<script>
  import { createEventDispatcher } from 'svelte';

  export let searchString;

  const dispatch = createEventDispatcher();
  let searchTerm = searchString || '';
  let timer;

  const debounce = (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateSearchterm(value);
    }, 300);
  };

  function updateSearchterm(value) {
    searchTerm = value;
    dispatch('change', value);
    const url = new URL(window.location);

    if (value) {
      url.searchParams.set('s', searchTerm);
    } else {
      url.searchParams.delete('s');
    }
    window.history.pushState({}, '', url);
  }
</script>

<div class="box">
  <label for="search">Keresés a műsorok között</label>
  <input
    aria-controls="show-list"
    type="search"
    name="search"
    id="search"
    value={searchString}
    on:search={({ target: { value } }) => debounce(value)}
    on:keyup={({ target: { value } }) => debounce(value)}
  />
</div>

<style>
  .box {
    background: #eee;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-block: 16px;
  }
  input {
    padding: 8px;
  }
</style>
