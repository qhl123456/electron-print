<template>
  <div class="main">
    <div class="main-header">
      <div v-for="item in systemPrintList" :key="item.name">
        <div :class="['p-x-10', item.isActive ? 'header-active' : 'header-max']" @click="setActiveItem(item)">
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="main-footer">
      <button @click="handlePrint">打印</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'

const store = useStore()

onMounted(async () => {
  await store.dispatch('getPrintList')
})

const systemPrintList = computed(() => store.state.common.systemPrintList)

/**
 * @method 设置当前活跃打印机
 * @param {*} item 打印机项
 */
const setActiveItem = (item) => {
  systemPrintList.value.forEach((f) => {
    f.isActive = f.name === item.name
  })
}

const handlePrint = () => {}
</script>

<style lang="less" scoped>
.main {
  .main-header {
    height: 25px;
    display: flex;
    margin-top: 2px;
    overflow: hidden;
    .header-active {
      background-color: #fff;
    }
    .header-max {
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    div {
      line-height: 25px;
      cursor: pointer;
      :hover {
        background-color: #fff;
      }
    }
  }
  .main-container {
    height: calc(100vh - 50px - 39px);
    padding-top: 10px;
    background-color: #fff;

    .container-h {
      height: 32px;
      display: flex;
      justify-content: space-between;
      margin: 0 7px;
      border: 1px solid #999999;

      div {
        width: 25%;
        line-height: 30px;
        text-align: center;
        &:hover {
          background-color: #dadada;
        }
      }
    }
    .container-content {
      height: calc(100% - 2px - 32px);
      margin: 0 7px;
      overflow-y: auto;
      .task-list {
        width: 100%;
        display: flex;
        .task-list-item {
          display: block;
          width: 25%;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  }
  .main-footer {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 7px;
    background-color: #fff;
    button {
      margin-left: 15px;
      cursor: pointer;
    }
  }
}

.p-x-10 {
  padding: 0 10px;
}
</style>
