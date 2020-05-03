<template>
    <div>
        <div class="top-panel padding-around">
            <h2>Активация вашего аккаунта</h2>
        </div>

        <Modal class="service-modal"
               :shown="modal.shown"
               @close="onModalClose">
            <div>Неверная ссылка активации</div>
        </Modal>
    </div>
</template>

<script>
    import {activateEmail, afterAuth} from "@/modules/user/store/auth/auth.types";
    import Modal from "@/components/common/Modal";
    import modalHandler from "@/mixins/modalHandler";
    import { createNamespacedHelpers } from 'vuex'

    const { mapActions } = createNamespacedHelpers('auth');

    export default {
        name: 'EmailActivation',
        components: {Modal},
        mixins: [modalHandler],
        async created(){
            const result = await this[activateEmail](
                this.$route.params.code
            );

            if(result){
                await this[afterAuth](result);
            }
            else{
                this.showModal();
            }
        },
        methods: {
            async onModalClose(){
                await this.$router.push('/');
            },
            ...mapActions([ activateEmail, afterAuth ])
        }
    }
</script>
