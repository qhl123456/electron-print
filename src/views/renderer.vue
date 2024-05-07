<template>
  <div class="main">
    <input type="text" placeholder="请输入" @input="handleInput" style="width: 100%" />
    <div class="main-header">
      <div v-for="item in systemPrintList" :key="item.name">
        <div :class="['p-x-10', item.isActive ? 'header-active' : 'header-max']" @click="setActiveItem(item)">
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="main-file">
      <template v-for="(item, index) in fileList">
        <div style="width: 100%" :class="['p-x-10', currentIndex === index ? 'header-active' : 'header-max']" @click="currentIndex = index">
          {{ item }}
        </div>
      </template>
    </div>

    <div class="main-footer">
      <button @click="handleConfirm">确认</button>
      <button @click="handlePrint">打印</button>
      <button @click="handleDeleteTask">清空打印队列</button>
    </div>

    读取的json文件
    <div>
      {{ fileInfo }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { onMounted, computed } from 'vue'
import { ipcRenderer } from 'electron'

const store = useStore()

const systemPrintList = computed(() => store.state.common.systemPrintList)

const fileList = computed(() => store.state.common.fileList)
const fileInfo = computed(() => store.state.common.fileInfo)
const currentIndex = ref(0)

/**
 * @method 设置当前活跃打印机
 * @param {*} item 打印机项
 */
const setActiveItem = (item) => {
  systemPrintList.value.forEach((f) => {
    f.isActive = f.name === item.name
  })
}

const handlePrint = () => {
  const printInfo = {
    htmlText: '<!DOCTYPE html><html><head><title>HTML Table Example</title></head><body><h1>Example Table</h1><table border="1"><thead><tr><th>Name</th><th>Age</th><th>Occupation</th></tr></thead><tbody><tr><td>John Doe</td><td>30</td><td>Engineer</td></tr><tr><td>Jane Smith</td><td>25</td><td>Teacher</td></tr><tr><td>Michael Johnson</td><td>40</td><td>Doctor</td></tr></tbody></table></body></html>',
    deviceName: systemPrintList.value.find((item) => item.isActive)?.name || '',
  }
  ipcRenderer.send('handle_print', printInfo)
}

const handleDeleteTask = () => {
  ipcRenderer.send('delete_print_task')
}

onMounted(async () => {
  await store.dispatch('getPrintList')

  /**监听主进程发送的刷新打印机列表事件 */
  ipcRenderer.on('refreshPrintList', (e, data) => {
    store.dispatch('getPrintList', true)
  })
})

const handleConfirm = () => {
  console.log(fileList.value[currentIndex.value])
  store.dispatch('getFileInfo', fileList.value[currentIndex.value])
}

const handleInput = async (e) => {
  store.dispatch('getFileList', e.target.value)
}
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
.header-active {
  background-color: #fff;
}
.main-file {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
