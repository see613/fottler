import {clearErrors, setErrors, resetFields} from "@/store/types";
import {updateField} from "vuex-map-fields";
import {setWhetherUserExists} from "@/modules/user/store/auth/auth.types";

const mutations = {
    [ clearErrors ](state){
        state.errors = {};
    },
    [ setErrors ](state, errors){
        state.errors = errors;
    },
    [ resetFields ](state){
        state.email = '';
        state.password = '';
        state.passwordRepeat = '';
    },
    [ setWhetherUserExists ](state, userExists){
        state.userExists = userExists;
    },


    updateField
};
export default mutations;
