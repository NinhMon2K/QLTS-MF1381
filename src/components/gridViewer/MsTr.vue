<template>
  <tr v-for="item in allData" :key="item">
    <ms-td
      v-for="col in columns"
      :key="col"
      :config="col"
      :value="item[col.field]"
      @change-value="changeSelected"
    >
    </ms-td>
  </tr>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  defineComponent,
} from "vue";
import MsTd from "@/components/gridViewer/MsTd.vue";
export default {
  name: "MsTr",
  props:{

  },
  components: {
    MsTd
  },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
