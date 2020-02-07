<template>
    <div>
        <div class="text-line-through social-share-headline">
            <span>Поделиться событием</span>
        </div>

        <social-sharing :url="url"
                        :title="fullTitle"
                        :description="description"
                        :quote="description"
                        inline-template>
            <div class="social-share-wrapper">
                <network network="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </network>
                <network network="vk">
                    <i class="fab fa-vk"></i>
                </network>
                <network network="facebook">
                    <i class="fab fa-facebook-f"></i>
                </network>
                <network network="telegram">
                    <i class="fab fa-telegram-plane"></i>
                </network>
                <network network="viber">
                    <i class="fab fa-viber"></i>
                </network>
            </div>
        </social-sharing>
    </div>
</template>

<script>
    import Config from "@/config/Config";

    export default {
        name: 'EventViewSocial',
        props: {
            id: [Number, String],
            title: String,
            description: String
        },
        computed: {
            url(){
                return Config.baseUrl + '/event/' + this.id;
            },
            fullTitle(){
                return 'Вилка и Бутылка | '+ this.title;
            }
        }
    }
</script>
