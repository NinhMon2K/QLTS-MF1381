<template>
  <th :style="styles">
    <div class="th-inner">
      <template v-if="config.type == ColumnType.Checkbox">
        <ms-checkbox v-model="allSelected"></ms-checkbox>
      </template>
      <!--  -->
      <template v-else>
        <ms-tooltip
          :content="
            config.title == ResourceTable.lblTableAssets.lblAccumulated
              ? 'Hao mòn khấu hao lũy kế'
              : ''
          "
          placement="bottom"
          right="bottom"
        >
          <td>
            {{ config.title }}
          </td>
        </ms-tooltip>
      </template>
    </div>
  </th>
</template>

<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  reactive,
  defineComponent,
} from "vue";
import ColumnType from "@/commons/constant/ColumnType";
import { computed } from "@vue/runtime-core";
import MsCheckbox from "@/components/input/MsCheckbox.vue";
import ResourceTable from "@/resource/dictionary/resourceTable";
import MsTooltip from "@/components/tooltip/MsTooltip.vue";

export default {
  name: "MsTh",
  components: {
    MsCheckbox,
    MsTooltip,
  },
  props: {
    config: {
      default: {},
    },
    selected: {
      default: false,
      type: Boolean,
    },
    allData: {
      default: [],
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const text = "";

    window.th = proxy;
    const allSelected = ref(false);
    const selectedData = ref([]);
    onMounted(() => {
      proxy.allSelected = proxy.selected;
    });
    watch(
      () => allSelected.value,
      () => {
        if (proxy.allSelected) {
          proxy.allData.forEach((data, index) => {
            proxy.selectedData.push(data);
          });
        } else {
          proxy.allData.forEach((data, index) => {
            proxy.selectedData.splice(index, 1);
          });
        }

        console.log(proxy.selectedData);
        proxy.$emit("change-value", proxy.allSelected);
      }
    );
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
      allSelected,
      selectedData,
      ResourceTable,
    };
  },
};
</script>
