<template>
    <div>
        <loadable-event-view-container :event-id="currentEventId"
                                        :shown="true"
                                        :mapIsOpened="mapIsOpened"
                                        :chatIsOpened="chatIsOpened"
                                        :membersIsOpened="membersIsOpened"

                                        @close="close"
                                        @open-map="openMap"
                                        @open-members="openMembers"
                                        @open-chat="openChat"
                                        @close-map="closeMap"
                                        @close-chat="closeChat"
                                        @close-members="closeMembers"></loadable-event-view-container>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    import {
        closeChat,
        closeMap,
        closeMembers,
        openChat,
        openMap,
        openMembers
    } from "@/modules/event/store/event/event.types";
    import LoadableEventViewContainer from "@/modules/event/containers/LoadableEventViewContainer";

    const { mapState, mapGetters, mapActions } = createNamespacedHelpers('eventSingle');

    export default {
        name: 'EventSingleView',
        components: {LoadableEventViewContainer},
        computed: {
            ...mapState([
                'currentEventId'
            ]),
            ...mapGetters([
                'mapIsOpened',
                'chatIsOpened',
                'membersIsOpened'
            ]),
        },
        methods: {
            close(){
                this.$router.push('/');
            },
            ...mapActions([
                openMap,
                openMembers,
                openChat,
                closeMap,
                closeMembers,
                closeChat
            ])
        }
    }
</script>
