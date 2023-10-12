<template>
  <grid-layout
    :col-num="1"
    :is-draggable="isDraggable"
    :is-resizable="false"
    :layout="layout"
    :margin="[0, 12]"
    :row-height="140"
    use-css-transforms
    vertical-compact
  >
    <grid-item
      v-for="(item, index) in layout"
      :key="index"
      :h="item.h"
      :i="item.i"
      :w="item.w"
      :x="item.x"
      :y="item.y"
      @moved="layoutUpdated"
    >
      <span class="text">{{ index }}</span>
    </grid-item>
  </grid-layout>
</template>
<script lang="ts" src="./ObjectiveGridLayoutComponent.ts"></script>
<style lang="scss" scoped>
  .vue-grid-layout {
    background: #eee;
    width: 100%;
  }

  .vue-grid-item:not(.vue-grid-placeholder) {
      background: #ccc;
      border: 1px solid black;
  }

  .vue-grid-item .resizing {
      opacity: 0.9;
  }

  .vue-grid-item .static {
      background: #cce;
  }

  .vue-grid-item .text {
      font-size: 24px;
      text-align: center;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 100%;
      width: 100%;
  }

  .vue-grid-item .no-drag {
      height: 100%;
      width: 100%;
  }

  .vue-grid-item .minMax {
      font-size: 12px;
  }

  .vue-grid-item .add {
      cursor: pointer;
  }

  .vue-draggable-handle {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 0;
      left: 0;
      background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
      background-position: bottom right;
      padding: 0 8px 8px 0;
      background-repeat: no-repeat;
      background-origin: content-box;
      box-sizing: border-box;
      cursor: pointer;
}
</style>
