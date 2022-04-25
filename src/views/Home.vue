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
          {{ selected.volumes }}
          {{ selected.arraysVolumes }}
          {{ testvar }}
            <div class="checkbox-item">
            <input type="checkbox" id="1-3" name="1-3" value=3 v-model.number="selected.volumes">
            <label for="1-3"> 1-3</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="4-7" name="4-7" value=7 v-model.number="selected.volumes">
            <label for="4-7"> 4-7</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="8-12" name="8-12" value=12 v-model.number="selected.volumes">
            <label for="8-12"> 8-12</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="13+" name="13+" value.number=100 v-model.number="selected.volumes">
            <label for="13+"> 13+</label>
            </div>
          
            <!--This may not be necessary <input class="filter-button" type="submit" value="Filter"> -->
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
      //Variables selected by the user to filter results
      selected: {
        author: [],
        genre: [],
        volumes: [],
        // arraysVolumes: []
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
    // This is to turn the volumes range into an array, this solution is cluncky so I'm trying to find another way
    arraysVolumes: function() {
      this.testvar = new Array (this.selected.volumes.map(range => range.split(', ').map(Number)))
    }, 
    filteredResults: function(){
      return this.results.filter((series) => {
        //Filters based in selected authors
        if (this.selected.author.length > 0 || this.selected.genre.length > 0) {
          return this.selected.author.includes(series.author) || this.selected.genre.includes(series.genre)
        } else {
          return true
        }

        //How to have these both at once? Checks if the the search query is in the series title or author name
        // if (series.title.toLowerCase().includes(this.search.toLowerCase()) || series.author.toLowerCase().includes(this.search.toLowerCase())) {
        //   return series
        // }
      })
    }
  },
  methods: {
  }
}
</script>
