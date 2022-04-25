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
          <h3 class="category-title">Category</h3>
            <div class="checkbox-item">
            <input type="checkbox" id="urban fantasy" name="urban fantasy" value="urban fantasy">
            <label for="urban fantasy"> Urban Fantasy</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="dystopia" name="dystopia" value="dystopia">
            <label for="dystopia"> Dystopia</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="sci-fi" name="sci-fi" value="sci-fi">
            <label for="sci-fi"> Sci-fi</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="young adult" name="young adult" value="young adult">
            <label for="young adult"> Young Adult</label>
            </div>

          <h3 class="category-title">Author</h3>
            <div class="checkbox-item">
            <input type="checkbox" id="seannan mcguire" name="seannan mcguire" value="seannan mcguire">
            <label for="seannan mcguire"> Seannan Mcguire</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="juliet marillier" name="juliet marillier" value="juliet marillier">
            <label for="juliet marillier"> Juliet Marillier</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="faith hunter" name="faith hunter" value="faith hunter">
            <label for="faith hunter"> Faith Hunter</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="john scalzi" name="john scalzi" value="john scalzi">
            <label for="john scalzi"> John Scalzi</label>
            </div>

          <h3 class="category-title">Number of Books Released</h3>
            <div class="checkbox-item">
            <input type="checkbox" id="1-3" name="1-3" value="1-3">
            <label for="1-3"> 1-3</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="4-7" name="4-7" value="4-7">
            <label for="4-7"> 4-7</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="8-15" name="8-15" value="8-15">
            <label for="8-15"> 8-15</label>
            </div>
            
            <div class="checkbox-item">
            <input type="checkbox" id="16+" name="16+" value="16+">
            <label for="16+"> 16+</label>
            </div>
          
            <input class="filter-button" type="submit" value="Filter">
          </div>
        </form>
    </div>
    <div class="results-column">
      <div class="results" v-for="series in filteredResults" :key="series.id">
        <Collection-card :series="series.title" :author="series.author" :volumes="series.volumes" :query="series.query"/>
      </div>


      <!-- 
      <CollectionCard series="Rivers of London" author="John Aaronovich" volumes=9 query="rivers+london+aaronovich"/> 
    -->
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
      search: ''
    }
  },
  computed: {
    filteredResults: function(){
      return this.results.filter((series) => {
        if (series.title.toLowerCase().includes(this.search.toLowerCase()) || series.author.toLowerCase().includes(this.search.toLowerCase())) {
          return series
        }
      })
    }
  },
  methods: {
  }
}
</script>
