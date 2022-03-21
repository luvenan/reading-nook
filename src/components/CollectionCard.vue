<template>
  <div class="collection-container">
    <div class="collection-header">
      <h2> October Daye - Seanan McGuire</h2>
      <h3> 16 books </h3>
    </div>
    <div class="collection-covers">
      <div class="thumbnails-container" v-for="(book, index) in booksData.items" :key="book.id">
        <a v-if="index < 3" :href="book.volumeInfo.previewLink">
          <img class="thumbnails" :src="book.volumeInfo.imageLinks.thumbnail" :alt="book.volumeInfo.title">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {apikey} from '../apikey.js';

export default {
props: ['query'],
data() {
    return {
      loading: true,
      booksData: {},
      apikey: apikey,
      queryParams: 'october + daye'
    }
  }, 
  methods: {
  }, 
  async created() {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.query + '&key=' + this.apikey);
      const booksData = await response.json();
      console.log(booksData)
      this.booksData = booksData;
      return booksData;
  },
}
</script>

<style>

</style>