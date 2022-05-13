<!--
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-05-13 15:18:36
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div id="app">

    <algolia-search>

    </algolia-search>

    <Button
      type="primary"
      @click="OpenElDialog"
    > 测试 啊实打实的 </Button>

    <dva-calc-height :maxHeight.sync="maxHeight">
      <dva-table
        border
        stripe
        size="small"
        :data="tableData"
        :columns="columns"
        :height="maxHeight"
        slot="main"
      >
        {{ maxHeight }}
      </dva-table>
      <div slot="foot"></div>
    </dva-calc-height>
  </div>
</template>

<script>

import AlgoliaSearch from '@/components/AlgoliaSearch'

export default {
  name: 'App',
  components: {
    AlgoliaSearch
  },
  data() {
    return {
      maxHeight: 0,
      tableData: new Array(10).fill({
        date: '100',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 151800 弄'
      }),
      columns: [
        { label: '序号', width: 50, type: 'index', index: (index) => { return index + 1 } },
        {
          label: '名称', align: 'center', prop: 'name',
          renderCell: (h, { row }) => {
            return <span> {row.name || row.id} </span>
          }
        },
        {
          label: '操作', align: 'center', prop: 'date',
          renderCell: (h, { row }) => {
            return <span> {row.name || row.id} </span>
          }
        }
      ]
    }
  },
  methods: {
    OpenElDialog() {
      this.$DvaDialog({
        props: {},
        modalProps: {
          width: '520px',
          title: '详情信息1'
        },
        methods: {
          refresh: () => {

          }
        },
        content: () => import('@/pages/about')
      })
    }
  }
}
</script>

<style>
</style>
