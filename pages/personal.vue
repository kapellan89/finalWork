<template>
    <v-content app>
        <v-container fluid>                            
        <v-row justify="center">
            <v-col cols="12" sm="8">
              <v-card>
                <v-card-title class="yellow accent-2">
                  <span class="headline black--text">Вы вошли как {{username}}</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-list>
                  <v-list-item @click="">
                    <v-list-item-action>
                      <v-icon>mdi-email</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{email}}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider inset></v-divider>
                    <v-list-item @click="">
                    <v-list-item-content>
                      <v-btn>Добавить ресурс</v-btn>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <v-img
                  src="https://picsum.photos/700?image=996"
                  height="200px"
                ></v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
    </v-content>
</template>
<script>
    export default {
        beforeCreate(){
            fetch('http://localhost:8000/personal',{method:'POST'})
              .then(response => response.json())
              .then(commits => (this.username=commits.username, this.email=commits.email))
        },
        data: function () {
            return {
             username:null,
             email:null
            }
        },
        computed: {
            updateUsername: function () {
                console.log(this.user)
            },
        },
        
    }
</script>