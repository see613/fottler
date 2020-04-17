<template>
    <table id="login-wrapper">
        <tr>
            <td>
                <div class="top-panel padding-around">
                    <menu-switcher></menu-switcher>
                </div>
                <div style="height: 5px;"></div>
            </td>
        </tr>

        <tr>
            <td>

                <div class="logo">
                    <img src="/images/icons/logo.svg" alt="Вилка и бутылка"/>
                    <div class="site-name">Вилка и бутылка</div>
                </div>

                <h1 class="mb-10">Присоединяйтесь</h1>

                <div class="mb-15">
                    <input type="password"
                           class="grey-input center"
                           placeholder="Пароль"
                           v-model="password"
                           @keyup.enter="onSubmit">
                    <error :text="errors.password"
                           class="center"></error>
                </div>
                <div v-show="!userExists"
                     class="mb-15">
                    <input type="password"
                           class="grey-input center"
                           placeholder="Пароль ещё раз"
                           v-model="passwordRepeat"
                           @keyup.enter="onSubmit">
                    <error :text="errors.passwordRepeat"
                           class="center"></error>
                </div>
                <div class="mb-50">
                    <a href="#"
                       class="button yellow-button wide"
                       @click.prevent="onSubmit">продолжить</a>
                </div>

            </td>
        </tr>
    </table>
</template>

<script>
    import Error from "@/components/forms/Error";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import {login, submitLogin2} from "@/modules/user/store/auth/auth.types";
    import {loadUserInfo} from "@/modules/user/store/user/user.types";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapActions: mapUserActions } = createNamespacedHelpers('user');
    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('auth');
    const { mapFields } = createHelpers({
        getterType: 'auth/getField',
        mutationType: 'auth/updateField',
    });

    export default {
        name: 'Login2',
        components: {MenuSwitcher, Error},
        computed: {
            ...mapState(['errors', 'userExists']),
            ...mapGetters(['profileIsNotFilled']),
            ...mapFields(['email', 'password', 'passwordRepeat'])
        },
        created(){
            if(!this.email){
                this.$router.push('/login');
            }
        },
        methods: {
            async onSubmit(){
                const result = await this[submitLogin2]();

                if(result){
                    this[login]({
                        accessToken: result.access_token,
                        refreshToken: result.refresh_token
                    });
                    await this[loadUserInfo]();

                    if(this.profileIsNotFilled){
                        this.$router.push('/profile/edit');
                    }
                    else{
                        this.$router.push('/');
                    }
                }
            },
            ...mapActions([ submitLogin2, login ]),
            ...mapUserActions([ loadUserInfo ])
        }
    }
</script>