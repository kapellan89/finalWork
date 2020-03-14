<template>
<v-col cols="12" sm="4">
    <v-card class="mx-auto">
        <v-img v-bind:src="appliance.image" v-on:click="overlay =!overlay "> 
            <v-card-title
            style="word-break: normal; cursor: pointer;"
            >{{appliance.title}}</v-card-title>
        </v-img>
        <v-overlay
            @mouseout="overlay = !overlay"
            absolute
            opacity="0.5"
            :value="overlay"
            z-index="20"
            
            @click="overlay = false"
            >                            
            <v-btn link :to="{name:'appliancecard-id', params:{id:appliance.id}}"
                color="white" outlined                             
            >
                Подробнее
            </v-btn>
            <v-btn icon
                color="error"
                @click="overlay = false"
                >
                <v-icon>mdi-close</v-icon>
            </v-btn>                            
        </v-overlay>
        <v-card-text>Компания владелец: {{appliance.author}}</v-card-text>
        <v-btn v-bind:href="appliance.link">Ссылка на сайт</v-btn><br>
        <span>Оценка пользователей:  </span><span v-for="(n, index) in 5" v-bind:key="index">{{checkRating(n, appliance)}}</span>
    </v-card>
</v-col>
</template>
<script>
    import { mapState } from 'vuex';
    
    export default {
        data: function(){
            return {
                overlay: false
            }
        },
        props:['appliance'],
        computed:{
            ...mapState(['appliances'])
        },
        methods:{
            checkRating: function(n, appliance){
                return (appliance.rating - n >= 0)? String.fromCharCode(9733): String.fromCharCode(9734);
            },            
        },       
    }
</script>