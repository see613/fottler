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

                    <h1>Присоединяйтесь</h1>
                    <div class="title">Восстановление пароля</div>

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
                           @click.prevent="$router.push('/login')">Вход/регистрация</a>
                    </div>

                </td>
            </tr>
        </table>

        <Modal class="service-modal"
               :shown="modal.shown"
               @close="onModalClose">
            <div>Новый пароль отправлен на ваш Email.</div>
        </Modal>
    </div>
</template>

<script>
    import Error from "@/components/forms/Error";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import MenuSwitcher from "@/components/menu/MenuSwitcher";
    import Modal from "@/components/common/Modal";
    import modalHandler from "@/mixins/modalHandler";
    import {restorePassword, userExists} from "@/modules/user/store/auth/auth.types";

    const { mapState, mapActions } = createNamespacedHelpers('auth');
    const { mapFields } = createHelpers({
        getterType: 'auth/getField',
        mutationType: 'auth/updateField',
    });

    export default {
        name: 'RestorePassword',
        components: {Modal, MenuSwitcher, Error},
        mixins: [modalHandler],
        computed: {
            ...mapState(['errors']),
            ...mapFields(['email'])
        },
        methods: {
            async onSubmit(){
                const result = await this[restorePassword]();

                if(result){
                    this.showModal();
                }
            },
            onModalClose(){
                this.hideModal();
                this.$router.push('/login2');
            },
            ...mapActions([ restorePassword, userExists ])
        }
    }
</script>