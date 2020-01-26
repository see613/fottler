import {changeEvent} from "@/store/types";
import {
    closeChat,
    closeMap,
    closeMembers,
    openChat,
    openMap,
    openMembers
} from "@/modules/event/store/event/event.types";
import Vue from "vue";

const mutations = {
    [ changeEvent ](state, eventId){
        state.currentEventId = eventId;

        state.events[state.currentEventId]
        || Vue.set(state.events, state.currentEventId, {});
    },
    [ openChat ](state){
        Vue.set(currentEvent(state), 'chatIsOpened', true);
    },
    [ closeChat ](state){
        Vue.set(currentEvent(state), 'chatIsOpened', false);
    },
    [ openMembers ](state){
        Vue.set(currentEvent(state), 'membersIsOpened', true);
    },
    [ closeMembers ](state){
        Vue.set(currentEvent(state), 'membersIsOpened', false);
    },
    [ openMap ](state){
        Vue.set(currentEvent(state), 'mapIsOpened', true);
    },
    [ closeMap ](state){
        Vue.set(currentEvent(state), 'mapIsOpened', false);
    }
};
export default mutations;


function currentEvent(state){
    return state.events[state.currentEventId];
}
