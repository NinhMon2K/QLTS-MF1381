<template>
  <button @mouseenter="show" @mouseleave="hide">sdasd</button>
  <div
    :class="[
      'absolute top-0 left-0 z-50 bg-gray-700 text-sm text-white px-3 py-1.5 rounded-md cursor-default',
      isHidden && 'hidden',
    ]"
  >
    bkajsb
    <div
      class="absolute bg-gray-700 h-[8px] w-[8px] rotate-45"
      ref="arrowRef"
    ></div>
  </div>
</template>
<script>
import { computePositon } from "@floating-ui/dom";
import { getCurrentInstance, onMounted,methods, ref }from "vue";
import { arrow, flip, offset, shift } from "@floating-ui/core";
export default {
  name: "MsTooltip",
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const referenceRef = ref();
    const floatingRef = ref();
    const arrowRef = ref(true);

    const isHidden = ref();
    methods: {
      function hide() {
        proxy.isHidden = true;
      }
      function show() {
        proxy.isHidden = false;
        proxy.caculatePosition();
      }
      async function caculatePosition() {
        const { x, y, middlewareData, placement } = await computePositon(
          proxy.floatingRef.value,
          proxy.referenceRef.value,
          {
            placement: "top",
            middleware: [
              offset(8),
              flip(),
              shift({ padding: 5 }),
              arrow({ element: arrowRef }),
            ],
          }
        );
        floatingRef.value.style.left = `${x}px`;
        floatingRef.value.style.top = `${y}px`;
        Object.assign(floatingRef.value.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const opposedSide = {
          left: "right",
          right: "left",
          bottom: "top",
          top: "bottom",
        }[placement.split("_")[0]];
        Object.assign(arrowRef.value.style, {
          left: arrowX ? `${arrowX}px` : "",
          top: arrowY ? `${arrowY}px` : "",
          bottom: "",
          right: "",
          [opposedSide]: "-4px",
        });
      }
    }

    return {
      isHidden,
      referenceRef,
      floatingRef,
      arrowRef,
    };
  },
};
</script>
<style lang="scss" scoped></style>
