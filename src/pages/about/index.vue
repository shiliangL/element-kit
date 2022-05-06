<!--
 * @Author: shiliangL
 * @Date: 2022-05-06 15:01:33
 * @LastEditTime: 2022-05-06 15:05:17
 * @LastEditors: Do not edit
 * @Description: 
-->
<template>
  <div>
    about me
    <Button
      type="primary"
      @click="OpenElDialog"
    > 再打开内部弹窗 </Button>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  methods: {
    OpenElDialog() {
      this.$OpenElDialog({
        modalProps: {
          width: "220px",
          title: '详情信息2'
        },
        content: () => import('@/pages/about'),
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>