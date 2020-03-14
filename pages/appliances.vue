<template>
<v-row>
    <appliance 
        v-for="appliance in appliances"
        :key="appliance.id"
        :appliance = "appliance"
    ></appliance>
</v-row>
</template>
<script>
    import { mapState } from 'vuex';
    import appliance from '../components/Appliance.vue';
    
    export default {
        fetch(context){        
            return context.$axios
                .get('http://localhost:8000/api/data/appliances')
                .then((res)=>{                 
                    context.store.commit('addAppliances', res.data);
                })
                .catch((err)=>{
                    context.error({
                        statusCode: 404,
                        message: 'Страница не найдена'
                    })
                });
        },
        computed: {
            ...mapState(['appliances'])
        },
        components: {
            'appliance': appliance
        },
    } 
</script>