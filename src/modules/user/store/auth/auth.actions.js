import VuexFormHelper from "@/core/form/VuexFormHelper";
import User from "@/modules/user/models/User";
import {
    afterAuth,
    initAuth,
    login,
    logout,
    restorePassword, setWhetherUserExists,
    submitLogin1,
    submitLogin2, userExists, vkAuth
} from "@/modules/user/store/auth/auth.types";
import {resetFields} from "@/store/types";
import router from '@/router'
import TokenAuth from "@/core/TokenAuth";
import {loadUserInfo} from "@/modules/user/store/user/user.types";

const actions = {
    [ initAuth ](){
        return TokenAuth.init();
    },
    [ login ](context, {accessToken, refreshToken}){
        TokenAuth.login(accessToken, refreshToken);
    },
    [ logout ](){
        TokenAuth.logout();
        window.location.reload();
    },

    async [ submitLogin1 ]({ commit, state }){
        const userData = {email: state.email};

        if(VuexFormHelper.validateOnClient(commit, userData, User.validationRules.login1)){
            const result = await VuexFormHelper.save(commit, userData, User.login1);

            if(result){
                commit(setWhetherUserExists, result.user_exists);
                router.push('/login2');
                return true;
            }
        }
        return false;
    },
    async [ submitLogin2 ]({ commit, state }){
        const
            userData = {
                email: state.email,
                password: state.password,
                passwordRepeat: state.passwordRepeat
            },
            validationRules =
                state.userExists
                ? User.validationRules.login2
                : User.validationRules.login2Guest;

        if(VuexFormHelper.validateOnClient(commit, userData, validationRules)){
            const result = await VuexFormHelper.save(commit, userData, User.login2);

            if(result){
                commit(resetFields);
                return result;
            }
        }
        return false;
    },
    async [ vkAuth ]({ commit }, session){
        return await VuexFormHelper.save(commit, session, User.vkAuth);
    },
    async [ afterAuth ]({ dispatch, getters }, serverData){
        await dispatch(login, {
            accessToken: serverData['access_token'],
            refreshToken: serverData['refresh_token']
        });
        await dispatch('user/'+loadUserInfo, null, {root:true});

        if(getters.profileIsNotFilled){
            router.push('/profile/edit');
        }
        else{
            router.push('/');
        }
    },
    async [ restorePassword ]({ commit, state }){
        const userData = {email: state.email};

        if(VuexFormHelper.validateOnClient(commit, userData, User.validationRules.restorePassword)){
            const result = await VuexFormHelper.save(commit, userData, User.restorePassword);

            if(result){
                commit(setWhetherUserExists, true);
                return true;
            }
        }
        return false;
    },

    [ userExists ]({ commit }){
        commit(setWhetherUserExists, true);
    },
};
export default actions;




