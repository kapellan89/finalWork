<template>
<v-app v-cloak>
    <div>
        <v-app-bar
            clipped-left
            app
            collapse-on-scroll
            color="yellow">
            <v-app-bar-nav-icon 
                @click.stop="showDrawer = !showDrawer">               
            </v-app-bar-nav-icon>
            <v-toolbar-title
                class="yellow--text text--darken-4"
            >
                {{sitename}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn link :to="{name:'autorization'}" x-small app rounded color="black" dark>Личный кабинет</v-btn>
        </v-app-bar>
        <v-navigation-drawer
            v-model="showDrawer"
            clipped
            app
            style="background: linear-gradient(to bottom, #fefcea, #f1da36);"
            >
                <v-list dense>
                    <v-subheader class="title justify-center">Разделы</v-subheader>
                    <v-list-item
                        link :to="{name:tab.eng}" exact
                        v-for="tab in tabs"
                        @click=""
                        :key="tab.eng"
                        :tab = "tab.eng"
                        >
                        <v-list-item-icon>
                            <v-icon></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content >
                            {{tab.rus}}                    
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
        </v-navigation-drawer>
        
        <v-content app>
            <v-container fluid>                            
                <transition name="fade" mode="out-in" appear>
                   <nuxt/>
                </transition>
            </v-container>
        </v-content>
    </div>
</v-app>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
      data: function () {
        return {
          showDrawer: false,
          showReg:false,
          showAuth:false,
          tabs: [{
                    rus:'Электроника',
                         eng: 'electronics'                            
                    },
                    {
                    rus:'Бытовая Техника',
                    eng: 'appliances'                            
                    }],
          currentTab:'Электроника'
        }
      },
      computed:{
        ...mapState(['sitename']),
        currentTabComponent(){
            return 'tab-' + this.currentTab;
        }
      }
    }
</script>