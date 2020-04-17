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

                <h1>Присоединяйтесь</h1>
                <div class="title">Вход/регистрация</div>

                <div class="mb-15">
                    <input type="text"
                           class="grey-input center"
                           placeholder="Ваш Email"
                           v-model="email"
                           @keyup.enter="onSubmit">
                    <error :text="errors.email"
                           class="center"></error>
                </div>
                <div class="mb-10">
                    <a href="#"
                       class="button yellow-button wide"
                       @click.prevent="onSubmit">продолжить</a>
                </div>
                <div class="mb-40">
                    <a href="#"
                       class="link"
                       @click.prevent="restorePassword">Забыли пароль?</a>
                </div>

            </td>
        </tr>
    </table>
</template>

<script>
    import Error from "@/components/forms/Error";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import {submitLogin1} from "@/modules/user/store/auth/auth.types";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";

    const { mapState, mapActions } = createNamespacedHelpers('auth');
    const { mapFields } = createHelpers({
        getterType: 'auth/getField',
        mutationType: 'auth/updateField',
    });

    export default {
        name: 'Login1',
        components: {MenuSwitcher, Error},
        computed: {
            ...mapState(['errors']),
            ...mapFields(['email'])
        },
        methods: {
            async onSubmit(){
                await this[submitLogin1]();
            },
            restorePassword(){
                this.$router.push('/restore-password');
            },
            ...mapActions([ submitLogin1 ])
        }
    }
</script>