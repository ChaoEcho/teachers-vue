<script setup>
import {ref} from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <el-select v-model="value" class="m-2" placeholder="Select" size="large">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
