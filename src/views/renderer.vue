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
import { ipcRenderer } from 'electron'

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

const handlePrint = () => {
  const printInfo = {
    htmlText:
      '<!doctype html><html lang=\'en\'><head><meta charset=\'utf-8\'><title>打印</title><style>*{box-sizing: border-box;}   td{ word-break: break-all;}</style></head><body><div style=\'position: relative;width: 100%;height: 100%\'><div style=\'width:100%;min-height:25px;display:flex;flex-wrap:wrap;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'><div style=\'display:block;word-break: break-all;flex: 0 0 33.33333336%;\'></div><div style=\'display:block;word-break: break-all;flex: 0 0 33.33333336%;\'><div style=\'font-size:18px;font-weight:normal;text-align:center;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>粤十-库存过户单</div></div><div style=\'display:block;word-break: break-all;flex: 0 0 33.33333336%;\'><div style=\'text-align:justify-start\'><img src=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA8CAIAAABTvhANAAABKUlEQVR42u3TQQqAIBBA0bn/pQ0MShzHFq2E91dhZlq8aCcUvfviGdlPyNf51nLyuNT4VB6MoekV02rVs9VgddK8ybxCtbH8AX8eM+9hufJywueJpp+7WW3zBdohBYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIoCUIJQkkQShBKglCCUBKEEoSSIJQglAShBKEkCCUIJUEoQSgJQglCSRBKEEqCUIJQEoQShJLeLiIpS/zZp3V9AAAAAElFTkSuQmCC style=\'width:273px;height:70px;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\' /></div><div style=\'font-size:12px;font-weight:normal;text-align:center;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>GH-20230914-000005</div></div></div><div style=\'width:100%;min-height:25px;display:flex;flex-wrap:wrap;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'><div style=\'display:block;word-break: break-all;flex: 0 0 50.000000039999996%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>过户单号：GH-20230914-000005</div><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>原货主：非标测试货主</div></div><div style=\'display:block;word-break: break-all;flex: 0 0 50.000000039999996%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>过户时间：</div><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>新货主：企业系统企业货主7</div></div></div><div style=\'margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'><table borderCollapse="collapse" border="none" style=\'font-size:15px;border-collapse:collapse;width:100%\'><thead><tr style=\'white-space: pre-wrap;\'><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">序号</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">商品名称</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">批次号</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">过户数量</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">库存数量</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">库存重量</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">过户重量</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">分配数量</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">可用数量</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">生产日期</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">失效日期</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">物料号</td><td style="border: solid #000 1px;height: undefinedpx;width: 30px; text-align: undefined">托盘号</td></tr></thead><tbody><tr style=\'height: undefinedpx;white-space: pre-wrap\'><td style="border: solid #000 1px; text-align: undefined">1</td><td style="border: solid #000 1px; text-align: undefined">高粱酒</td><td style="border: solid #000 1px; text-align: undefined">#000694</td><td style="border: solid #000 1px; text-align: undefined">2</td><td style="border: solid #000 1px; text-align: undefined">2</td><td style="border: solid #000 1px; text-align: undefined">2</td><td style="border: solid #000 1px; text-align: undefined">2</td><td style="border: solid #000 1px; text-align: undefined">0</td><td style="border: solid #000 1px; text-align: undefined">2</td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined">TP202309134723</td></tr><tr style=\'height: undefinedpx;white-space: pre-wrap\'><td style="border: solid #000 1px; text-align: undefined">2</td><td style="border: solid #000 1px; text-align: undefined">150克冰袋，130个/框</td><td style="border: solid #000 1px; text-align: undefined">#000700</td><td style="border: solid #000 1px; text-align: undefined">33</td><td style="border: solid #000 1px; text-align: undefined">33</td><td style="border: solid #000 1px; text-align: undefined">643.5</td><td style="border: solid #000 1px; text-align: undefined">643.5</td><td style="border: solid #000 1px; text-align: undefined">0</td><td style="border: solid #000 1px; text-align: undefined">33</td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined">TP202309144826</td></tr><tr style=\'height: undefinedpx;white-space: pre-wrap\'><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined">合计</td><td style="border: solid #000 1px; text-align: undefined">35</td><td style="border: solid #000 1px; text-align: undefined">35</td><td style="border: solid #000 1px; text-align: undefined">645.5</td><td style="border: solid #000 1px; text-align: undefined">645.5</td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td><td style="border: solid #000 1px; text-align: undefined"></td></tr></tbody></table></div><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:30px;\'>备注：</div><div style=\'width:100%;min-height:25px;display:flex;flex-wrap:wrap;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'><div style=\'display:block;word-break: break-all;flex: 0 0 33.33333336%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>过户件数：45</div></div><div style=\'display:block;word-break: break-all;flex: 0 0 33.33333336%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>过户重量：840.5</div></div><div style=\'display:block;word-break: break-all;flex: 0 0 33.33333336%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>过户体积：0</div></div></div><div style=\'width:100%;min-height:25px;display:flex;flex-wrap:wrap;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'><div style=\'display:block;word-break: break-all;flex: 0 0 25.000000019999998%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>审核人：</div><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>创建人：潇哥哥</div></div><div style=\'display:block;word-break: break-all;flex: 0 0 25.000000019999998%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>主管：</div></div><div style=\'display:block;word-break: break-all;flex: 0 0 25.000000019999998%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>原货主：非标测试货主</div></div><div style=\'display:block;word-break: break-all;flex: 0 0 25.000000019999998%;\'><div style=\'font-size:15px;font-weight:normal;text-align:left;margin-left:0px;margin-right:0px;margin-Top:0px;margin-bottom:1px;\'>新货主：企业系统企业货主7</div></div></div></div></body></html>',
    deviceName: systemPrintList.value.find((item) => item.isActive)?.name || '',
  }
  ipcRenderer.send('handle_print', printInfo)
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
</style>
