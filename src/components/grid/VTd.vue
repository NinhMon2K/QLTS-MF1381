<template>
  <td
    :style="styles"
    :class="[cls, styleAlign]"
    v-if="config.type != ColumnType.Action || config.position == 'relative'"
  >
    <div class="td-inner check-box_input" ref="td">
      <template v-if="config.type == ColumnType.Checkbox">
        <v-checkbox v-model="data" @click="handleClickCheckbox(data)"></v-checkbox>
      </template>

      <template
        v-else-if="config.type == ColumnType.Action && config.position == 'relative'"
      >
        <div class="action-group">
          <div v-for="btn in config.action" :key="btn">
            <v-tooltip
              :content="btn.command == 0 ? 'Sửa' : 'Nhân bản'"
              placement="top"
              right="top"
            >
              <div
                class="app-icon icon"
                :class="btn.icon"
                @click="btn.click && btn.click(btn.command, data)"
              ></div>
            </v-tooltip>
          </div>
        </div>
      </template>

      <template v-else-if="config.align == ColumnType.AlignCenter">
        <v-tooltip
          :content="text.length > 32 ? text : ''"
          placement="bottom"
          right="bottom"
        >
          {{ text }}
        </v-tooltip>
      </template>
      <template v-else-if="config.type == ColumnType.Date">
        {{ text }}
      </template>

      <template v-else>
        <v-tooltip
          :content="text.length > 32 ? text : ''"
          placement="bottom"
          right="bottom"
        >
          {{ text }}
        </v-tooltip></template
      >
    </div>
  </td>
</template>

<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  reactive,
  methods,
  nextTick,
  ref,
  watch,
} from "@vue/runtime-core";
import ColumnType from "@/assets/js/constant/ColumnType.js";
import commonFunction from "@/assets/js/commons/commonFunction.js";
import Resource from "@/assets/js/resource/resource.js";
import VTooltip from "@/components/tooltip/VTooltip.vue";
import VCheckbox from "@/components/input/VCheckbox.vue";
import moment from "moment";
export default {
  name: "MsTd",
  components: {
    VTooltip,
    VCheckbox,
  },
  props: {
    config: {
      default: {},
    },
    value: {
      default: null,
    },
  },
  emits: ["checkBoxAll", "update:value"],
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = ref(props.value);

    onMounted(() => {
      watch(
        () => data.value,
        (newVal) => {
          proxy.$emit("update:value", newVal);
        }
      );

      watch(
        () => proxy.value,
        (newVal) => {
          proxy.data = newVal;
        }
      );
    });

    /**
     * Định dạng ngày tháng
     * NNNINH (29/12/2022)
     * @param {string} date số tiền
     */

    function formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    }

    const setTooltipDisplay = () => {
      let offset = proxy.$refs.td.getBoundingClientRect();
      if (proxy.text.length > offset.width) {
        return proxy.text;
      } else return "";
    };
    // Xét style cho td
    const styles = computed(() => {
      let arr = [];
      if (props.config.width) {
        arr.push("width: " + props.config.width + "px;");
        arr.push("min-width: " + props.config.width + "px;");
        arr.push("max-width: " + props.config.width + "px;");
      }
      if (props.config.minWidth) {
        arr.push("min-width: " + props.config.minWidth + "px;");
      }
      if (props.config.color) {
        arr.push("color: " + props.config.color);
      }

      return arr.join("; ");
    });

    // Show giá trị value td
    const showValue = () => {
      let rs = "";
      switch (props.config.type) {
        case ColumnType.Text:
          rs = props.value || "";
          break;
        case ColumnType.Number:
          if (props.value == 0) {
            rs = 0;
          } else {
            rs = commonFunction.formatNumber(props.value);
          }
          break;
        case ColumnType.Date:
          rs = proxy.formatDate(props.value);
          break;
        case ColumnType.Status:
          rs = proxy.formatStatus(props.value);
          break;
      }
      return rs;
    };

    const formatStatus = (status) => {
      let rs = "";
      if (status == true) {
        rs = "Đã ghi tăng";
      } else {
        rs = "Chưa ghi tăng";
      }
      return rs;
    };

    // Giá trị hiện lên Dom
    const text = computed(() => showValue());

    const cls = computed(() => {
      let rs = [];

      switch (props.config.type) {
        case ColumnType.Checkbox:
          rs.push("text-center");
          break;
        case ColumnType.Number:
          rs.push("text-right");
          break;
        case ColumnType.Date:
          rs.push("text-center");
          break;
      }

      return rs.join(" ");
    });
    const handleClickCheckbox = (data) => {
      emit("checkBoxAll", data);
    };

    //Căn chỉnh nội dung bên trái,phải hay center
    const styleAlign = computed(() => {
      let rs = [];

      switch (props.config.align) {
        case ColumnType.AlignCenter:
          rs.push("text-align__center");
          break;
        case ColumnType.AlignLeft:
          rs.push("text-align__left");
          break;
        case ColumnType.AlignRight:
          rs.push("text-align__right");
          break;
      }

      return rs.join(" ");
    });

    return {
      text,
      ColumnType,
      styles,
      cls,
      Resource,
      data,
      setTooltipDisplay,
      styleAlign,
      formatDate,
      formatStatus,
      handleClickCheckbox,
    };
  },
};
</script>

<style lang="scss" scope="">
.action-group {
  display: flex;
  justify-content: center;

  .icon {
    cursor: pointer;
    margin: 0 4px;
  }
}

.th-inner {
  font-size: 13px;
}

.td-inner {
  font-size: 13px;
  max-width: 248px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

input[type="checkbox"] {
  width: 14px;
  height: 14px;
}
.ms-tr {
  .text-center {
    height: 100%;
    &:first-child {
      margin-left: -3px;
    }
  }
  .text-right {
    &:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
.text-align__center {
  text-align: center;
}
.inline-block {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
td {
  padding: 8px;
  height: 39px;
}
th {
  padding: 8px;
}
</style>
