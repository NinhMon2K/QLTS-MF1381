<template>
    <div class="work-year-content text-truncate">
        <div class="year-left">
            <span>{{Lable? '' : Lable}}</span>
        </div>
        <div class="year-content">
            <input type="text" :placeholder="placeholder" :disabled="disabled || false" value="1">
        </div>

        <div class="year-right">

            <div class="iconYear-top">
                <span :class="[
                  'app-icon icon--top',
                  topIcon,
                  disabled ? 'disabled-icon' : '',
                ]" v-if="topIcon"></span>
            </div>
            <div class="iconYear-bottom">
                <span :class="[
                  'app-icon icon--bottom',
                  bottomIcon,
                  disabled ? 'disabled-icon' : '',
                ]" v-if="bottomIcon"></span>
            </div>
        </div>
    </div>
</template>
<script>
import {
    defineComponent,
    computed,
    ref,
    getCurrentInstance,
    reactive,
    onMounted,
} from "vue";
export default {
    name: 'MsInputYear',
    props: {
        Lable: {
            default: null,
            type: String
        },
        placeholder: {
            default: null,
            type: String
        },
        disabled: {
            default: false,
            type: Boolean
        },
        topIcon:{
            default: null,
            type: String
        },
        bottomIcon:{
            default: null,
            type: String
        }
    },
    setup(props, { emit }) {
        const { proxy } = getCurrentInstance();

        return {

        }

    },
}
</script>
<style lang="scss" scoped>

</style>