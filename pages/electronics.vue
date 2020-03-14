<template>
<v-row>
    <electronic 
        v-for="electronic in electronics"
        :key="electronic.id"
        :electronic = "electronic"
    ></electronic>
</v-row>
</template>
<script>
    import { mapState } from 'vuex';
    import Electronic from '../components/Electronic.vue';
    
    export default {
        fetch(context){        
            return context.$axios
                .get('http://localhost:8000/api/data/electronics')
                .then((res)=>{                 
                    context.store.commit('addElectronics', res.data);
                })
                .catch((err)=>{
                    context.error({
                        statusCode: 404,
                        message: 'Страница не найдена'
                    })
                });
        },
        computed: {
            ...mapState(['electronics'])
        },
        components: {
            'electronic': Electronic
        }
    } 
</script>