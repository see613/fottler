import {resetFilter, chooseFilterType, reset, setAll} from "@/store/types";
import ListConfig from "@/config/ListConfig";

const mutations = {
    [ resetFilter ](state){
        state.filter = {
            type: ListConfig.filter.all
        };
    },
    [ chooseFilterType ](state, type){
        state.filter.type = type;
    },

    [ reset ](state){
        state.notifications = [];
    },
    [ setAll ](state, notifications){
        state.notifications = notifications;
    },
};
export default mutations;
