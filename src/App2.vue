<!--
 * @Author: shiliangL
 * @Date: 2022-06-06 09:55:20
 * @LastEditTime: 2022-06-06 09:55:20
 * @LastEditors: Do not edit
 * @Description:
-->
<!--
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-06-06 09:52:34
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
        v-if="0"
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
      tableData: new Array(10).fill(0).map((item, index) => {
        return {
          date: '100',
          name: '王小虎' + index,
          address: '上海市普陀区金沙江路 151800 弄'
        }
      }),
      columns: [
        { label: '序号', width: 120, type: 'index' },
        {
          label: '名称', align: 'center', prop: 'name',
          renderCell: (h, { row }) => {
            return <span> {row.name || row.id} </span>
          }
        },
        {
          label: '操作', align: 'center', prop: 'date',
          renderCell: (h, { row }) => {
            return <span> 我是什么鬼 </span>
          }
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    renderIndex(index) {
      return index + 1
    },
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
