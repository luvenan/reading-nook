<template>
            <form class="add-series-form" @submit.prevent="handleSubmit">
            <h3 class="series-form-title">Add New Series</h3>
            
            <div class="form-field">
                <label class="input-label" for="series-name">Series</label>
                <input class="series-input-field block-field" id="series-name" type="text" v-model="seriesName" required placeholder="Name of series">
            </div>
            
            <div class="form-field">
                <label class="input-label">Author</label>
                <div class="form-field-flex">
                    <input class="series-input-field author-field" id="authorFirst" type="text" v-model="authorFirst" required placeholder="First Name">
                    <input class="series-input-field author-field" id="authorLast" type="text" v-model="authorLast" required placeholder="Last Name">    
                </div>
                
            </div>

            <div class="form-field">
                <label class="input-label" for="genre">Genre</label>
                <input class="series-input-field block-field" id="genre" type="text" v-model="genre" required placeholder="e.g. Fantasy, Sci-fi">
            </div>

            <div class="form-field-flex">
                <label for="volumes">Books Released</label>
                <input class="series-input-field" id=volumes type="number" v-model.number="volumes">
                <button class="submit-series">Add</button>
            </div>
            
            
        </form>
    
</template>

<script>
export default {
    data() {
        return {
        seriesName: '',
        authorFirst: '',
        authorLast: '',
        genre: '',
        volumes: 1
        }
    }, 
    computed: {
        query() {
            let query = this.seriesName.replace(/ /g, '+') + '+' + this.authorLast
            return query
        },
        newSeries() {
            let newSeries = {
                title: this.seriesName,
                author: this.authorFirst + ' ' + this.authorLast,
                query: this.query,
                genre: this.genre,
                volumes: this.volumes
            }
            return newSeries
        }
    },
    methods: {
        async handleSubmit() {
            //Post method sends the newSeries object to the server
            try {
                const url = 'api/series/';
                const newBody = JSON.stringify(this.newSeries);
                    
                const response = await fetch(url,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: newBody
                })
                if(response.ok){
                    console.log('Series added: ' + this.newSeries.title)
                    //Emit event to update the series list
                    this.$emit('add-series');
                } else {
                    throw new Error ('Request failed');
                }
                
            } catch (error) {
                console.log(error);
            }
        }
    }
}

</script>

<style>

</style>