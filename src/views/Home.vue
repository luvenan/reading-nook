<template>
  <div class="banner-container">
    <div class="banner-titles">
      <h1>Reading Nook</h1>
      <h2 class="tagline">Find your favorite book series</h2>
    </div>
    <img id="girl-reading" src="../assets/images/Girl-reading.png" alt="">
  </div>
  <div class="grid-container">
    <div class="filter-column">
      <p>this is the column</p>
      
    </div>
    <div class="results-column">
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
      <CollectionCard />
    </div>
  </div>
</template>

<script>
import CollectionCard from '@/components/CollectionCard'

export default {
  name: 'Home',
  components: { CollectionCard }
}
</script>
