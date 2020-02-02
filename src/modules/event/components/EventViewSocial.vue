<template>
    <social-sharing :url="url"
                    :title="fullTitle"
                    :description="description"
                    :quote="description"
                    inline-template>
        <div class="social-share-wrapper">
            <network network="vk">
                <i class="fab fa-vk"></i>
            </network>
            <network network="facebook">
                <i class="fab fa-facebook-f"></i>
            </network>
            <network network="whatsapp">
                <i class="fab fa-whatsapp"></i>
            </network>
            <network network="viber">
                <i class="fab fa-viber"></i>
            </network>
            <network network="telegram">
                <i class="fab fa-telegram-plane"></i>
            </network>
        </div>
    </social-sharing>
</template>

<script>
    import Config from "@/config/Config";

    export default {
        name: 'EventViewSocial',
        props: {
            title: String,
            description: String
        },
        computed: {
            url: ()=>Config.baseUrl +'/',
            fullTitle(){
                return 'Вилка и Бутылка | '+ this.title;
            }
        }
    }
</script>
