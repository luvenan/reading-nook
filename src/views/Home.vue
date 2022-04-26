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
      <!-- search bar -->
      <input type="text" v-model="search" placeholder="search series">

      <form action="">
        <div class="tags-container">
          <li class="tags">#fae</li>
          <li class="tags">#shape-shifters</li>
          <li class="tags">#vampires</li>
          <li class="tags">#zombies</li>
        </div>
        
        <div class="filter-checkboxes">
          <!-- Genres -->
          <h3 class="category-title">Genre</h3>
            <div class="checkbox-item genre" v-for="genre in genresList" :key="genre">
              <input type="checkbox" :id="genre" :value="genre" v-model="selected.genre">
              <label :for="genre">{{ ' ' + genre }}</label>
            </div>

          <!-- Authors -->
          <h3 class="category-title">Author</h3>
            <div class="checkbox-item authors" v-for="author in authorsList" :key="author">
              <input type="checkbox" :id="author" :value="author" v-model="selected.author">
              <label :for="author">{{ ' ' + author }}</label>
            </div>

          <h3 class="category-title">Number of Books Released</h3>

            <div class="checkbox-item range" v-for="range in volumesRange" :key="range.id">
              <input type="checkbox" :id="range" :value="range" v-model="selected.range">
              <label :for="range">{{ ' ' + range.min + '-' + range.max}}</label>
            </div>
         
          </div>
        </form>
    </div>
    <div class="results-column">
      <div class="results" v-for="series in filteredResults" :key="series.id">
        <Collection-card :series="series.title" :author="series.author" :volumes="series.volumes" :query="series.query"/>
      </div>
    </div>

    
  </div>


</template>

<script>
import CollectionCard from '@/components/CollectionCard'
import sourceData from '@/data.json'

export default {
  name: 'Home',
  components: { CollectionCard },
  data() {
    return {
      results: sourceData.series,
      search: '',
      //Variables to populate the filter categories
      authorsList: [],
      genresList: [],
      testvar: [],
      //Describes ranges for number of books released
      volumesRange: [
        {
          id: 1,
          min: 1,
          max: 3,
        },
        {
          id: 2,
          min: 4,
          max: 7,
        },
        {
          id: 3,
          min: 8,
          max: 12,
        },
        {
          id: 4,
          min: 13,
          max: 20,
        }
      ],
      //Variables selected by the user to filter results
      selected: {
        author: [],
        genre: [],
        volumes: [],
        range: []
      }
    }
  },
  mounted() {
    //Populates the list of authors based on existing authors in the books, makes sure no duplicates
    this.authorsList = new Set (this.results.map(series => series.author))
    //Populates the list of categories based on existing categories in the books, makes sure no duplicates
    this.genresList = new Set (this.results.map(series => series.genre))
  },

  computed: {
      filteredResults: function(){
        let results
        
        //Filters the results based on the selected filters - works better by using the else to true because if nothing is filtered then all the results pop up. In the if statements, I check if it doesn't include the selected filter, and then tell it not to show that particular result if it does not. 
        results = this.results.filter(series => {
          //Filters by author
          if (this.selected.author.length > 0) {
            if (!this.selected.author.includes(series.author)) {
              return false
            }
          }
          //Filters by genre
          if (this.selected.genre.length > 0) {
            if (!this.selected.genre.includes(series.genre)) {
              return false
            }
          }
          //Filters by number of books released
          if (this.selected.range.length > 0) {
            return this.selected.range.map(selRange => series.volumes >= selRange.min && series.volumes <= selRange.max).includes(true)
          }
          //Filters by search query
          if (this.search.length > 0) {
            if (!series.title.toLowerCase().includes(this.search.toLowerCase()) && !series.author.toLowerCase().includes(this.search.toLowerCase())) {
              return false
            }
          }
          return true
        })

        return results
    }
  },
  methods: {
  }
}
</script>
