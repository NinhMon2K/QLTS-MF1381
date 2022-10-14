<template>
  <th :style="styles">
    <div class="th-inner">
      <template v-if="config.type == ColumnType.Checkbox">
        <ms-checkbox></ms-checkbox>
      </template>

      <template v-else>
        {{ config.title }}
      </template>
    </div>
  </th>
</template>

<script>
import ColumnType from "@/commons/constant/ColumnType";
import { computed } from "@vue/runtime-core";
import MsCheckbox from "@/components/input/MsCheckbox.vue";
export default {
  name: "MsTh",
  components: {
    MsCheckbox,
  },
  props: {
    config: {
      default: {},
    },
  },
  setup(props, { emit }) {
    const text = "";

    const styles = computed(() => {
      let arr = [];
      if (props.config.width) {
        arr.push("width: " + props.config.width + "px;");
        arr.push("min-width: " + props.config.width + "px;");
      }

      if (props.config.minWidth) {
        arr.push("min-width: " + props.config.minWidth + "px;");
      }

      return arr.join("; ");
    });

    return {
      text,
      ColumnType,
      styles,
    };
  },
};
</script>
