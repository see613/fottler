const getters = {
    currentEvent(state){
        return state.events[state.currentEventId] || null;
    },
    mapIsOpened(state, getters){
        return getters.currentEvent.mapIsOpened;
    },
    chatIsOpened(state, getters){
        return getters.currentEvent.chatIsOpened;
    },
    membersIsOpened(state, getters){
        return getters.currentEvent.membersIsOpened;
    }
};
export default getters;
