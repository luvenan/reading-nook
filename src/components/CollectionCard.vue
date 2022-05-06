<template>
  <div class="collection-header">
    <h2> {{ series }} - {{ author }}</h2>
    <h3> {{ volumes }} books </h3>
  </div>
  <div class="collection-covers" >
    <!-- <div class="gray-covers">
      
    </div>
    <div class="gray-covers">
      
    </div>
    <div class="gray-covers">
      
    </div> -->
    <div class="thumbnails-container" v-for="(book) in newBookdata" :key="book.id">
      <a :href="book.previewLink">
        <img v-if="!error" class="thumbnails" :src="book.thumbnail" :alt="book.title">
        <img v-else class="thumbnails" src="../assets/images/Placeholder.jpg" alt="Unable to load cover">
      </a>
    </div>
  </div>
</template>

<script>
import {apikey} from '../apikey.js';

export default {
// Declaring props like this allows me to use different types in props
props: {
  query: {
    type: String,
  },
  series: {
    type: String,
  },
  author: {
    type: String,
  },
  volumes: {
    type: Number,
  }
},
data() {
    return {
      loading: true,
      booksData: {},
      apikey: apikey,
      queryParams: 'october + daye',
      newBookdata: [],
      error: false,
    }
  },
  methods: {
  }, 
  async created() {
    try {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.query + '&key=' + this.apikey);
      const booksData = await response.json()
      console.log|(booksData);
      this.booksData = booksData;
      //Makes new array of objects with only the information I will need for a limited ammount of books;
      for (let i = 0; i < 3; i++){
        //Filter badly formatted books and sets here
        // if(!booksData.items[i].volumeInfo.title.includes('Forest')){
          let newBook = {
          id: booksData.items[i].id,
          title: booksData.items[i].volumeInfo.title,
          author: booksData.items[i].volumeInfo.authors,
          previewLink: booksData.items[i].volumeInfo.previewLink,
          thumbnail: booksData.items[i].volumeInfo.imageLinks.thumbnail
          }
          this.newBookdata.push(newBook);
        // }
        
      }
      return this.newBookdata;


    } catch (error) {
      console.log(error);
      for (let i = 0; i < 3; i++){
        let newBook = {
          id: i + 1,
          // thumbnail: '../assets/images/Placeholder.jpg',
        }
        this.newBookdata.push(newBook);
      }
      this.error = true;
      return this.newBookdata;
    }
    
  },
}
</script>

<style>

</style>