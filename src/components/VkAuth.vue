<template>
    <div class="ib">
        <a href="#"
           class="vk-auth"
           @click="onClick">
            <i class="fab fa-vk"></i>
        </a>

        <Modal class="service-modal"
               v-model="modal.shown">

            <div>{{error}}</div>
        </Modal>
    </div>
</template>

<script>
    import modalHandler from "@/mixins/modalHandler";
    import Modal from "@/components/common/Modal";
    import Config from "@/config/Config";

    export default {
        name: 'VkAuth',
        components: {Modal},
        mixins: [modalHandler],
        data(){
            return {
                error: ''
            };
        },
        methods: {
            onClick(){
                const self = this;

                window.VK.Auth.login(function(data){
                    if(data.status === 'connected'){
                        self.$emit('success', data.session);
                    }
                    else{
                        self.error = Config.vk.errorMessages[data.status];
                        self.showModal();
                        self.$emit('error', self.error);
                    }
                });
            },
        }
    }
</script>
