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
          width: '220px',
          title: '详情信息2'
        },
        content: () => import('@/pages/about')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
