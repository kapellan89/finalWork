export default {
    state(){
        return{
            sitename: 'Агрегатор интернет ресурсов',
            showDrawer: false,
            electronics:[],
            appliances:[],
        }
    },
    mutations:{
        showDrawerChange(state){
            state.showDrawer=!state.showDrawer
        },
        addElectronics(state, arrElectronics){
            for(let i = 0; state.electronics.length < arrElectronics.length; i++){
                state.electronics.push(arrElectronics[i]);
            }
        },
        addAppliances(state, arrAppliances){
            for(let i = 0; state.appliances.length < arrAppliances.length; i++){
                state.appliances.push(arrAppliances[i]);
            }
        },
        changeAuthenticatinStatus(state){
            state.authenticated = true;
        }
    },
    actions:{
        nuxtServerInit(contextFromStore, contextFromNuxt){
            if(contextFromNuxt.req.session && contextFromNuxt.req.session.isAuth){
                contextFromStore.commit('changeAuthenticatinStatus');
            }
        }
  
    }
};