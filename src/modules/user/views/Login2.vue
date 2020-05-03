<template>
    <div>
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

        <Modal class="service-modal"
               :shown="modal.shown"
               @close="onModalClose">
            <div>Email со ссылкой для активации вашего аккаунта отправлен вам на почту.</div>
        </Modal>
    </div>
</template>

<script>
    import Error from "@/components/forms/Error";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import {afterAuth, submitLogin2} from "@/modules/user/store/auth/auth.types";
    import MenuSwitcher from "@/components/menu/MenuSwitcher";
    import modalHandler from "@/mixins/modalHandler";
    import Modal from "@/components/common/Modal";

    const { mapState, mapActions } = createNamespacedHelpers('auth');
    const { mapFields } = createHelpers({
        getterType: 'auth/getField',
        mutationType: 'auth/updateField',
    });

    export default {
        name: 'Login2',
        components: {Modal, MenuSwitcher, Error},
        mixins: [modalHandler],
        computed: {
            ...mapState(['errors', 'userExists']),
            ...mapFields(['email', 'password', 'passwordRepeat'])
        },
        async created(){
            if(!this.email){
                await this.$router.push('/login');
            }
        },
        methods: {
            async onSubmit(){
                const result = await this[submitLogin2]();

                if(result){
                    await this[afterAuth](result);
                }
                else if(this.errors['activation']){
                    this.showModal();
                }
            },
            async onModalClose(){
                await this.$router.push('/');
            },
            ...mapActions([ submitLogin2, afterAuth ])
        }
    }
</script>