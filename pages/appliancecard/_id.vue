<template>
<v-row>
    <v-col cols="12" md="4" class="d-flex justify-center">
        <v-img class="flex-grow-0 elevation-2"
            v-bind:src="'/'+appliance.image"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            width="300px"
        >                        
        </v-img>
    </v-col>
    <v-col cols="12" md="8" app>
        <h1 class="ma-2" v-text="appliance.title"></h1>
            <v-rating
                dense
                v-model="appliance.rating"
                background-color="orange lighten-3"
                color="orange"                                        
                class="ma-2"
                ></v-rating>
                <p class="ma-2" v-html="appliance.description"><p>
                <p class="ma-2">Компания вледелец: {{appliance.author}}</p>
                <v-btn
                    v-bind:href="appliance.link"
                    class="ma-2" outlined 
                    color="deep-purple darken-4"
                >Ссылка на сайт</v-btn>
        </v-col>
</v-row>
</template>

<script>
    import { mapState } from 'vuex';
    
    export default {
        props:['id'],
        computed:{
            ...mapState(['appliances']),
            appliance: function(){
                let id = this.$route.params.id;
                let arr = this.appliances.filter(function(prod){
                    return prod.id == id;
                });
                return arr[0];
            },  
        }
    }
</script>