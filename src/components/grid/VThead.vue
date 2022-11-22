<template>
  <tr>
    <th v-if="selectedCol" style="width: 50px">
      <div class="th-inner">
        <v-checkbox v-model="allSelected"></v-checkbox>
      </div>
    </th>
    <v-th
      ref="th"
      v-for="col in columns"
      :key="col"
      :config="col"
      :allData="allData"
    >
      {{ col.title }}
    </v-th>
  </tr>
</template>
<script>
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch,
} from "vue";
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
    setup(props,{emit}) {
        
    },
})
</script>

