<template>
  <div id="app">
    <div class="box-draggable">
      <div
        :key="index"
        draggable="true"
        unselectable="on"
        class="draggable-item-row"
        @dragstart="dragstart($event, element);"
        v-for="(element,index) in elementList"
      > {{ element.title }}</div>
    </div>
    <div
      class="box-render"
      ref="content"
      @drop="dropHandler($event)"
      @dragover="dragoverHandler($event)"
    >

      <VueDragResize
        v-for="(item) in elements"
        parentLimitation
        :key="item.id"
        :w="200"
        :h="200"
        :y="item.top"
        :x="item.left"
        :isActive="item.isActive"
        :isDraggable="item.isDraggable"
        @clicked="onActivated(item)"
        @deactivated="deactivated(item)"
      >
        <!-- @resizing="resize($event,item)"
          @dragging="resize($event,item)" -->
        <div :key="item.id">
          <h3> 组件名称 {{ item.name }} </h3>
          <component
            :is="item.componentKey"
            v-model="item.value"
          ></component>
        </div>
      </VueDragResize>

    </div>
    <div class="box-edit-area">
      属性编辑区域
      <div
        :key="index"
        draggable="true"
        unselectable="on"
        class="draggable-item-row"
        @dragstart="dragstart($event, element);"
        v-for="(element,index) in elementList"
      > {{ element.title }}</div>
    </div>
  </div>
</template>

<script>

// import { GridLayout, GridItem } from 'vue-grid-layout'
import VueDragResize from 'vue-drag-resize'

export default {
  components: {
    // GridItem,
    // GridLayout
    VueDragResize
  },
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      elements: [],
      elementList: [
        {
          componentKey: 'el-input',
          title: '输入框',
          value: '',
          placeholder: '请输入',
          style: { width: '100%' },
          readonly: false,
          draggable: false
        },
        {
          componentKey: 'el-card',
          title: '卡片',
          value: '',
          placeholder: '请输入',
          style: { width: '100%' },
          readonly: false,
          draggable: false
        }
      ]
    }
  },
  mounted() {

  },
  methods: {
    resize(newRect) {
      console.log(newRect, '=newRect=')
      // this.width = newRect.width
      // this.height = newRect.height
      // this.top = newRect.top
      // this.left = newRect.left
    },
    resizeElement(newRect, item) {
      console.log(newRect, '=newRect=')
      // item.top = newRect.top
      // item.left = newRect.left
      // item.width = newRect.width
      // item.height = newRect.height
    },
    onActivated(item) {
      item.isActive = true
      item.isDraggable = true
    },
    deactivated(item) {
      item.isActive = false
      item.isDraggable = false
    },
    generateGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    dragstart(ev, { componentKey }) {
      console.log(ev, '=拖拽开始=')
      // Add this element's id to the drag payload so the drop handler will
      // know which element to add to its tree
      ev.dataTransfer.setData('text', componentKey)
      ev.dataTransfer.dropEffect = 'copy'
      // ev.dataTransfer.effectAllowed = 'move'
    },
    dropHandler(ev) {
      ev.preventDefault()
      const componentKey = ev.dataTransfer.getData('text')
      const offsetX = (ev.clientX)
      const offsetY = (ev.clientY)
      this.elements.push({
        isActive: true,
        isDraggable: true,
        width: 200,
        height: 200,
        top: offsetY,
        left: offsetX,
        componentKey,
        value: '请输入',
        id: this.generateGuid()
      })
      // Get the id of the target and add the moved element to the target's DOM
    },
    dragoverHandler(ev) {
      ev.preventDefault()
      ev.stopPropagation()
      // Set the dropEffect to move
      ev.dataTransfer.dropEffect = 'move'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: stretch;
  .box-render {
    flex: 1;
    margin: 10px;
    align-items: stretch;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    .vue-grid-item {
      border-radius: 2px;
      border: 1px solid #d7dae2;
    }
    .vue-grid-layout {
      flex: 1;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
      position: absolute;
    }
  }
  .draggable-item-row {
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .box-draggable,
  .box-edit-area {
    width: 240px;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .action-bar {
    padding: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #d7dae2;
  }
  .grid-item-component {
    height: 100%;
    display: flex;
    font-size: 12px;
    align-items: center;
    .component-desc {
      font-size: 12px;
    }
    .component-type {
      font-size: 12px;
    }
  }
}
</style>
