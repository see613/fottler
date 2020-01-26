<template>
    <event-single-view></event-single-view>
</template>

<script>
    import {changeEvent} from "@/store/types";
    import { createNamespacedHelpers } from 'vuex'
    import EventSingleView from "@/modules/event/containers/EventSingleView";

    const { mapActions } = createNamespacedHelpers('eventSingle');

    export default {
        name: 'EventSingle',
        components: {EventSingleView},
        watch: {
            $route:{
                handler: async function(){
                    const eventId = Number(this.$route.params.id) || null;

                    this[changeEvent](eventId);

                    //todo if event is empty show 404
                    //this.$router.push({name: 'error404'});
                },
                immediate: true
            }
        },
        methods: {
            ...mapActions([changeEvent]),
        }
    }
</script>
