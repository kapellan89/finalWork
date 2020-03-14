<template>
<v-col cols="12" sm="4">
    <v-card class="mx-auto">
        <v-img v-bind:src="electronic.image" v-on:click="overlay =!overlay "> 
            <v-card-title
            style="word-break: normal; cursor: pointer;"
            >{{electronic.title}}</v-card-title>
        </v-img>
        <v-overlay
            @mouseout="overlay = !overlay"
            absolute
            opacity="0.5"
            :value="overlay"
            z-index="20"
            
            @click="overlay = false"
            >                            
            <v-btn link :to="{name:'electroniccard-id', params:{id:electronic.id}}"
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
        <v-card-text>Компания владелец: {{electronic.author}}</v-card-text>
        <v-btn v-bind:href="electronic.link">Ссылка на сайт</v-btn><br>
        <span>Оценка пользователей:  </span><span v-for="(n, index) in 5" v-bind:key="index">{{checkRating(n, electronic)}}</span>
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
        props:['electronic'],
        computed:{
            ...mapState(['electronics'])
        },
        methods:{
            checkRating: function(n, electronic){
                return (electronic.rating - n >= 0)? String.fromCharCode(9733): String.fromCharCode(9734);
            },            
        },       
    }
</script>