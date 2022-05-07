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
      //Initializes variable necessary for the while loop
      let i = 0;
      //Makes new array of objects with only the information I will need for a limited ammount of books;
      while (this.newBookdata.length < 3){
        //Filter out book sets (by removing the ones with the word 'set' in the title and containing the author's name... many will probably still get through, need to find a better way)
        if(!booksData.items[i].volumeInfo.title.includes('Set') 
            // && !booksData.items[i].volumeInfo.title.toLowerCase().includes(this.author.toLowerCase())
            // && !booksData.items[i].volumeInfo.title.toLowerCase().includes(this.series.toLowerCase())
            
          ){
          let newBook = {
          id: booksData.items[i].id,
          title: booksData.items[i].volumeInfo.title,
          author: booksData.items[i].volumeInfo.authors,
          previewLink: booksData.items[i].volumeInfo.previewLink,
          thumbnail: booksData.items[i].volumeInfo.imageLinks.thumbnail
          }
          //Add new book to data
          this.newBookdata.push(newBook);
          console.log("The image height is " + booksData.items[i].volumeInfo.thumbnail.height)
        }
        //Increment variable for the loop to work properly
        i++;
      }

      return this.newBookdata;
      


    } catch (error) {
      console.log(error);
      console.log('The query for this book series did not work: ' + this.series);
      for (let i = 0; i < 2; i++){
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