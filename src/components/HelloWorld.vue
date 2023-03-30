<script setup>
import {ref, watchEffect} from 'vue'
import requests from "../api/requests.js";

const schools = ref([])
const schoolValue = ref([])
requests.get('/v1/school').then(res => {
  for (let index in res.data) {
    schools.value.push({
      label: res.data[index],
      value: res.data[index]
    })
  }
})

const college = ref([])
const collegeValue = ref([])

watchEffect(() => {
  if (schoolValue.value.length === 0 || [] === schoolValue.value) {
    return
  }
  requests.get('/v1/college?school=' + schoolValue.value).then(res => {
    college.value = []
    collegeValue.value = []
    for (let index in res.data) {
      college.value.push({
        label: res.data[index],
        value: res.data[index]
      })
    }
  })
})

const andValue = ref([])
const notValue = ref([])
const teachers = ref([])

function queryTeacher() {
  requests.post('/v1/teacher', {
    school: schoolValue.value,
    college: collegeValue.value,
    and: andValue.value,
    not: notValue.value
  }).then(res => {
    teachers.value = []
    for (let index in res.data) {
      let datum = res.data[index]
      teachers.value.push({
        school: datum.school,
        college: datum.college,
        name: datum.name,
        url: datum.url
      })
    }
  })
}

function clearSelect() {
  schoolValue.value = []
  collegeValue.value = []
  andValue.value = []
  notValue.value = []
  teachers.value = []
}


</script>

<template>
  <el-select v-model="schoolValue" class="m-2" multiple placeholder="学校" size="large">
    <el-option
        v-for="item in schools"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>

  <el-select
      v-model="collegeValue"
      :disabled="schoolValue.length !== 1"
      class="m-2"
      multiple
      placeholder="学院"
      size="large">
    <el-option
        v-for="item in college"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>

  <el-select
      v-model="andValue"
      :reserve-keyword="false"
      allow-create
      class="m-2"
      default-first-option
      filterable
      multiple
      placeholder="包含词汇"
      size="large"
      style="width: 250px"
  >
    <el-option
        v-for="item in andValue"
        :key="item"
        :label="item"
        :value="item"
    />
  </el-select>

  <el-select
      v-model="notValue"
      :reserve-keyword="false"
      allow-create
      class="m-2"
      default-first-option
      filterable
      multiple
      placeholder="排除词汇"
      size="large"
      style="width: 250px"
  >
    <el-option
        v-for="item in notValue"
        :key="item"
        :label="item"
        :value="item"
    />
  </el-select>

  <el-button plain size="large" type="primary" @click="queryTeacher">查询</el-button>
  <el-button plain size="large" type="danger" @click="clearSelect">清除</el-button>
  <el-table :data="teachers" style="width: 100%">
    <el-table-column label="学校" prop="school" width="180"/>
    <el-table-column label="学院" prop="college" width="180"/>
    <el-table-column label="姓名" prop="name" width="180"/>
    <el-table-column label="链接" prop="url">
      <template #default="{row}">
        <a :href="row.url" target="_blank">{{ row.url }}</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
</style>
