<template>
    <table class="w-100 profile-main">
        <tr>
            <td>
                <img :src="avatarUrl"
                     :alt="user.name"
                     class="avatar">
            </td>
            <td>
                <div>{{user.name}}, {{age}}</div>
                <div class="font-12"
                     v-if="isMyself && user.phone">{{formattedPhone}}</div>
                <div class="city"
                     v-if="user.city">{{user.city}}</div>

                <slot></slot>
            </td>
        </tr>
        <tr v-if="showAbout">
            <td colspan="2">
                <div class="about">{{user.about}}</div>
            </td>
        </tr>
    </table>
</template>

<script>
    import DateUtil from "@/core/utilities/DateUtil";
    import User from "@/modules/user/models/User";
    import PhoneMask from "@/core/PhoneMask";

    export default {
        name: 'ProfileMain',
        props: {
            user: Object,
            isMyself: {
                type: Boolean,
                default: false
            },
            showAbout: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            age(){
                return DateUtil.getAgeByBirthDate(this.user.birthday);
            },
            avatarUrl(){
                return User.smallAvatarUrl(this.user.avatar);
            },
            formattedPhone(){
                const phoneMask = new PhoneMask(User.phoneMask.prefix, User.phoneMask.mask2);

                return phoneMask.rawToFormatted(this.user.phone);
            }
        }
    }
</script>
