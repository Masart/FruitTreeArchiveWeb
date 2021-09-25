<template>
  <div v-if="!isEdit" class="archiveDetailWrap">
    <a-card :bordered="false" style="width:70vw;" bodyStyle="padding-top:0">
      <a-page-header :title="archiveTitle" :sub-title="archiveInfo.archiveTime"
                     class="archiveHeader" @back="backToTreeDetail">
        <template v-slot:extra>
          <a-button style="width: 94px;" @click="editArchiveDetail">编辑</a-button>
          <a-button type="primary" danger style="width: 94px;" @click="delArchiveModal">删除</a-button>
        </template>
        <div class="archiveHeaderHeader">
          <a-statistic title="干周" :value="archiveInfo.trunkGirth">
            <template #suffix>
              厘米(cm)
            </template>
          </a-statistic>
          <a-statistic
              title="挂果数"
              :value="archiveInfo.fruitCount"
          />
          <a-statistic title="枝量" :value="archiveInfo.branchCount"/>
          <a-statistic title="花量" :value="archiveInfo.flowerCount"/>
          <a-statistic title="花量密度" :value="archiveInfo.flowerDensity"/>
        </div>
        <a-descriptions size="small" :column="3">
          <a-descriptions-item label="创建者">{{ archiveInfo.userName }}</a-descriptions-item>
          <a-descriptions-item label="创建时间">{{ archiveInfo.archiveTime }}</a-descriptions-item>
          <a-descriptions-item label="更新时间">{{ archiveInfo.updateTime }}</a-descriptions-item>
          <a-descriptions-item label="档案详情">
            {{ archiveInfo.archiveRemark }}
          </a-descriptions-item>
        </a-descriptions>
      </a-page-header>
      <div class="carouselBody">
        <a-card :bordered="false" hoverable :style="arrowStyle"
                bodyStyle="padding:43px 9px;" @click="changePic(-1)">
          <LeftOutlined/>
        </a-card>
        <a-tabs v-model:activeKey="tabsActivateKey" tab-position="bottom">
          <a-tab-pane v-for="(item) in imgPath" :key="item" class="carouselBodyPanel">
            <template #tab>
              <img :src="'testImg/' + item" class="carouselTitle"/>
            </template>
            <a-image-preview-group>
              <a-image :src="'testImg/' + item" :width="300"/>
            </a-image-preview-group>
          </a-tab-pane>
        </a-tabs>

        <a-card :bordered="false" hoverable :style="arrowStyle"
                bodyStyle="padding:43px 9px;" @click="changePic(1)">
          <RightOutlined/>
        </a-card>
      </div>
    </a-card>
  </div>

  <div class="archiveDetailWrap" v-if="isEdit">
    <a-card class="editArchiveCard" bodyStyle="padding-top:0">
      <a-page-header :title="'编辑 '+archiveInfo.treeCode+' 的档案'" @back="backToArchiveDetail"/>
      <EditArchive :archiveCode="archiveInfo.archiveCode" :archiveInfo="archiveInfo" :editOrAdd="true"/>
    </a-card>
  </div>

</template>

<script>
import {reactive, ref, onMounted, h, createVNode} from "vue"
import {
  ExclamationCircleOutlined,
  LeftOutlined, RightOutlined
} from '@ant-design/icons-vue';
import Route from "../../router";
import {Modal} from "ant-design-vue";
import EditArchive from "@/components/archiveManage/EditArchive";

export default {
  name: "ArchiveDetail",
  components: {EditArchive, LeftOutlined, RightOutlined},
  setup() {
    let archiveInfo = reactive({
      archiveCode: '',
      treeCode: '',
      treeName: '',
      archiveRemark: '',
      trunkGirth: 0,
      bag: false,//true 套袋；false 没套:'袋
      fruitCount: 0,
      branchCount: 0,
      flowerDensity: 0,
      flowerCount: 0,
      archiveTime: '',
      updateTime: '',
      userCode: '',
      userName: '',
    })
    let archiveTitle = ref(archiveInfo.treeCode + ' 的档案记录')
    let imgPath = ['14_1_6_w.jpg', '14_1_6_wn.jpg', '14_1_6_ws.jpg', '14_1_7_e.jpg', '14_1_7_en.jpg', '14_1_7_es.jpg', '14_1_7_w.jpg', '14_1_7_wn.jpg', '14_1_7_ws.jpg', '14_1_8_e.jpg', '14_1_8_en.jpg', '14_1_8_es.jpg', '14_1_8_w.jpg', '14_1_8_wn.jpg', '14_1_8_ws.jpg', '14_1_9_e.jpg', '14_1_9_en.jpg', '14_1_9_es.jpg', '14_1_9_w.jpg']
    let isEdit = ref(false) //true 编辑状态；false 展示状态
    let tabsActivateKey = ref(imgPath[0]) //true 编辑状态；false 展示状态
    const arrowStyle = "height:100px;z-index: 2;border-radius: 3px"
    onMounted(() => {
      archiveInfo.archiveCode = '2021092501'
      archiveInfo.treeCode = '20207060748'
      archiveInfo.treeName = '桃絮'
      archiveInfo.archiveRemark = '这是一棵长得不错的陶树'
      archiveInfo.trunkGirth = 24
      archiveInfo.bag = true
      archiveInfo.fruitCount = 2
      archiveInfo.branchCount = 4
      archiveInfo.flowerDensity = 5
      archiveInfo.flowerCount = 20
      archiveInfo.archiveTime = '2021-09-25 16:12'
      archiveInfo.updateTime = '2021-09-25 16:12'
      archiveInfo.userCode = '520134'
      archiveInfo.userName = '马总'
      archiveTitle.value = archiveInfo.treeCode + ' 的档案记录'
    })

    //返回果树详情页
    function backToTreeDetail() {
      Route.push('/fruitTree/treeDetail/' + archiveInfo.treeCode)
    }

    //删除档案记录Modal
    const delArchiveModal = () => {
      let delArchiveTitle = '确认删除果树 ' + archiveInfo.treeCode + ' ？'
      Modal.confirm({
        title: () => delArchiveTitle,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () =>
            h('div', {}, [
              h('p', '删除该档案将同时删除档案中所包含的图片！'),
              h('p', '是否删除？'),
            ]),
        cancelText: () => '取消',
        okText: () => '确认删除',
        onOk() {
          console.log('确认')
        },
        okButtonProps: {
          danger: true,
        },
        onCancel() {
          console.log('取消')
        },
      });
    };

    function editArchive() {
      Route.push('/fruitTree/treeDetail/editArchive')
    }

    //编辑档案的情况下返回档案详情
    function editArchiveDetail() {
      isEdit.value = true
    }

    //编辑档案的情况下返回档案详情
    function backToArchiveDetail() {
      isEdit.value = false
    }
    //改变轮播的activate
    function changePic(opr) {
      let idx = imgPath.findIndex(item => item === tabsActivateKey.value)
      if (idx === 0 && opr===-1){
        tabsActivateKey.value = imgPath[(imgPath.length-1)]
      }else if (idx === (imgPath.length-1) && opr > 0){
        tabsActivateKey.value = imgPath[0]
      }else{
        tabsActivateKey.value = imgPath[idx+opr]
      }
    }
    return {
      archiveInfo, archiveTitle, imgPath, arrowStyle, isEdit,tabsActivateKey,
      backToTreeDetail, delArchiveModal, backToArchiveDetail, editArchiveDetail,
      changePic,
    }
  }
}
</script>

<style scoped>
.archiveDetailWrap {
  display: flex;
  justify-content: center;
}

.archiveHeader {
  border: 1px solid rgb(235, 237, 240);
  border-radius: 20px;
}

.archiveHeaderHeader {
  display: flex;
  justify-content: center;
}

.ant-statistic {
  margin: 0 32px;
}

.ant-descriptions {
  margin-top: 40px;
}

.carouselTitle {
  width: 45px;
  height: 60px;
}

.carouselBody {
  display: flex;
  justify-content: center;
  align-items: center
}

.carouselBodyPanel {
  display: flex;
  justify-content: center;
}

.ant-tabs {
  margin: 40px -34px 0 -34px;
  z-index: 1;
}


.editArchiveCard {
  width: 70vw;
  border-radius: 20px;
}
</style>