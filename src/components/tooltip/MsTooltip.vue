<template>
  <div :class="[
    isHidden && 'hidden',
  ]">
    <div ref="referenceRef" class="inline-block" @blur="hide" @focus="show" @mouseenter="show" @mouseleave="hide">
      <slot></slot>
      <teleport to="body">
      <div class="tooltip" ref="floatingRef" :style="style" v-show="isHidden">
       {{content }}
      </div>
      </teleport>
    </div>
    <div class="absolute bg-gray-700 h-[8px] w-[8px] rotate-45" ref="arrowRef"></div>
  </div>
</template>
<script>
import { computePositon } from "@floating-ui/dom";
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
  watch,
} from "@vue/runtime-core";
import { arrow, flip, offset, shift } from "@floating-ui/core";
export default {
  name: "MsTooltip",
  props: {
    content: String,
    placement: {
      default: "bottom",
      type: String,
    },

  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const isHidden = ref(false);
    const offsetPosi = reactive(
      {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    );
    onMounted(() => {
      proxy.setPosition();
    });
    const style = computed(() => {
      let arr = [];
      arr.push(`top: ${offsetPosi.top}px`);
      arr.push(`left: ${offsetPosi.left}px`);
      // switch (this.placement) {
      //   case 'bottom':

      //     break;
      //   case 'top':
      //     arr.push(`bottom: ${offsetPosi.bottom}`);
      //     arr.push(`left: ${offsetPosi.left}`);
      //     break;
      //   case 'left':
      //     arr.push(`left: ${offsetPosi.left}`);
      //     arr.push(`top: ${offsetPosi.top}`);
      //     break;
      //   case 'right':
      //     arr.push(`right: ${offsetPosi.right}`);
      //     arr.push(`top: ${offsetPosi.top}`);
      //     break;
      //   default:
      //     break;
      // }
      return arr.join("; ");
    });
    function hide() {
      proxy.isHidden = false;
      console.log('hide' + proxy.isHidden)
    }
    function show() {
      console.log(proxy.style)
      proxy.isHidden = true;
      console.log('show' + proxy.isHidden)
    }

    
    function setPosition() {
      let offset = proxy.$refs.referenceRef.getBoundingClientRect();
      console.log(offset)

      if(this.placement == 'bottom'){
        offsetPosi.top = offset.bottom;
          offsetPosi.left = offset.left + offset.width/3;      }
      else if(this.placement == 'top'){
        offsetPosi.bottom = offset.top;
          offsetPosi.left = offset.left;
      }
      else if(this.placement == 'left'){
        offsetPosi.top = offset.top;
          offsetPosi.left = offset.right;
      }
      else{
        offsetPosi.top = offset.top;
          offsetPosi.left = offset.left;
      }  
    }

    return {
      isHidden,
      setPosition,
      offsetPosi,
      show,
      hide,
      style
    };
  },
};
</script>
<style lang="scss" scoped>
.tooltip {
  margin-top: 10px;
  background-color: #fff;
  color: #fff;
  position: absolute;
   padding: 5px 10px;
  color: #000;
  border-radius: 5px;
  /*text-transform: uppercase;*/
  box-shadow: 0 0 7px black;
  font-size: 11px;
}
</style>
