<!--
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-05-06 18:34:23
 * @LastEditors: Do not edit
 * @Description: 
-->
<template>
  <div id="app">
    <Button
      type="primary"
      @click="OpenElDialog"
    > 测试 </Button>

    <DvaTable
      border
      stripe
      :maxHeight="400"
      :loading="true"
      ref="DvaTable"
      :data="tableData"
      :columns="columns"
    ></DvaTable>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      tableData: new Array(240).fill({
        date: '100',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 151800 弄'
      })
      ,
      columns: [
        {
          label: '姓名', align: 'center', prop: 'name',
          renderHeader: (h, { row }) => {
            console.log(row, '=renderHeader=');
            return <span> 姓名 + { row.name } </span>
          },
          renderCell: (h, { row }) => {
            console.log(row, '=render=');
            return <span> {row.name} </span>
          }
        },
        { label: '时间', align: 'center', prop: 'date' },
        { label: '地址', align: 'center', prop: 'address' },
      ],
    }
  },
  mounted() {
    console.log(this.$refs['DvaTable']);
  },
  methods: {
    OpenElDialog() {
      this.$OpenElDialog({
        props: {},
        modalProps: {
          width: "520px",
          title: '详情信息1'
        },
        methods: {
          refresh: () => {

          }
        },
        content: () => import('@/pages/about'),
      })
    }
  },
}
</script>

<style>
</style>
