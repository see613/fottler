import {getField} from "vuex-map-fields";

const getters = {
    data(state){
        return state.all[state.currentId]
    },
    messages(state, getters){
        return getters.data.messages;
    },
    newMessage(state, getters){
        return getters.data.newMessage;
    },
    newestMessageId(state, getters){
        const length = getters.messages.length;

        for(let i = length; i--;){
            const message = getters.messages[i];

            if(!message.is_local){
                return message.id;
            }
        }
        return null;
    },
    oldestMessageId(state, getters){
        const length = getters.messages.length;

        for(let i = 0; i < length; i++){
            const message = getters.messages[i];

            if(!message.is_local){
                return message.id;
            }
        }
        return -1;
    },


    getNewMessageField(state){
        const id = state.currentId;
        return getField(state.all[id].newMessage);
    }
};
export default getters;
