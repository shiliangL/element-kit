<!--
 * @Author: shiliangL
 * @Date: 2022-05-12 11:11:32
 * @LastEditTime: 2022-05-13 09:04:35
 * @LastEditors: Do not edit
 * @Description:
-->
<template>
  <div class="dva-calc-height">
    <slot name="main" />
    <slot name="foot" />
  </div>
</template>

<script>

import { debounce } from '@/utils'

export default {
  name: 'DvaCalcHeight',
  props: {
    // 余量fix一些场景一下需要减掉部分的高度
    prefix: {
      type: Number,
      default: () => 100
    },
    maxHeight: {
      type: Number,
      default: () => 400
    }
  },
  mounted() {
    this._debounceResizeHeight = debounce(() => {
      this.computedHeight()
    }, 60, true)
    this._debounceResizeHeight()
    window.addEventListener('resize', this._debounceResizeHeight)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this._debounceResizeHeight)
    })
  },
  methods: {
    computedHeight() {
      const table = this.$slots.default && this.$slots.default[0]
      const footer = this.$slots.footer && this.$slots.footer[0]
      const innerHieght = window.innerHeight
      const tableTop = table ? table.elm.getBoundingClientRect().top : 0
      let maxHeight = innerHieght - tableTop
      if (footer) {
        const footerHeight = footer.elm.offsetHeight
        maxHeight = Math.abs(innerHieght - footerHeight - tableTop) - this.prefix
      }
      setTimeout(() => {
        this.$nextTick().then(() => {
          this.$emit('update:height', maxHeight)
          this.$emit('update:maxHeight', maxHeight)
          console.log(maxHeight, '=maxHeight=')
        })
      }, 200)
    }
  }
}
</script>

