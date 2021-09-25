<template>
  <a-card :bordered="false" bodyStyle="padding:0">
    <template #extra>
      <a-button v-if="editOrAdd">修改</a-button>
      <a-button type="primary" v-if="!editOrAdd">添加</a-button>
    </template>
    <a-form>
      <a-descriptions bordered :column="6" layout="vertical" class="archiveEditor">
        <a-descriptions-item label="干周 (单位：厘米)" :span="1">
          <a-form-item>
            <a-input-number id="inputTrunkGirth" v-model:value="archiveForm.trunkGirth" :min="0"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="挂果数" :span="1">
          <a-form-item>
            <a-input-number id="inputFruitCount" v-model:value="archiveForm.fruitCount" :min="0"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="是否套袋" :span="1">
          <a-form-item>
            <a-radio-group v-model:value="archiveForm.bag">
              <a-radio :value="true">已套袋</a-radio>
              <a-radio :value="false">未套袋</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="枝量" :span="1">
          <a-form-item>
            <a-input-number id="inputBranchCount" v-model:value="archiveForm.branchCount" :min="0"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="花量" :span="1">
          <a-form-item>
            <a-input-number id="inputFlowerCount" v-model:value="archiveForm.flowerCount" :min="0"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="花量密度" :span="1">
          <a-form-item>
            <a-input-number id="inputFlowerDensity" v-model:value="archiveForm.flowerDensity" :min="0"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="记录时间" :span="1">
          <a-form-item>
            <a-date-picker v-model:value="archiveForm.archiveTime" format="YYYY-MM-DD"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="更新时间" :span="1">
          <a-form-item>
            <a-date-picker v-model:value="archiveForm.updateTime" format="YYYY-MM-DD"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="档案详情" :span="4">
          <a-form-item>
            <a-textarea v-model:value="archiveForm.archiveRemark" placeholder="请输入档案详情" allow-clear
                        :auto-size="{ minRows: 2, maxRows: 5 }"/>
          </a-form-item>
        </a-descriptions-item>
      </a-descriptions>
    </a-form>
    <a-card title="相关图片" :bordered="false" class="archiveEditorPics">
      <template #extra>
        <a-upload
            name="file"
            :multiple="true"
            :headers="{authorization: 'authorization-text'}"
            @change="handleChange"
            accept=".jpg,.png"
            :showUploadList="false"
        >
          <a-button type="primary" shape="round">
            <UploadOutlined></UploadOutlined>
            上传
          </a-button>
        </a-upload>
      </template>
      <a-card-grid style="width: 25%; text-align: center;padding-bottom: 10px" v-for="(item) in imgPath">
        <a>
          <a-image :src="'testImg/' + item"/>
        </a>
        <a-button danger type="primary" shape="circle" style="margin-top: 10px" @click="delPic(item)">
          <template #icon>
            <DeleteOutlined/>
          </template>
        </a-button>
      </a-card-grid>
      <a-empty :image="simpleImage" description="暂无图片" v-if="imgPath.length===0"/>
    </a-card>
  </a-card>
</template>

<script>
import {ref, reactive, onMounted} from 'vue'
import { Empty } from 'ant-design-vue';
import moment from 'moment'
import {
  DeleteOutlined, UploadOutlined
} from '@ant-design/icons-vue';

export default {
  name: "EditArchive",
  components: {DeleteOutlined, UploadOutlined},
  props: {
    archiveCode: String,
    archiveInfo: Object,
    editOrAdd: Boolean //true 修改；false 添加
  },
  setup(props) {
    let editOrAdd = ref(false) //编辑：true；新建：false
    let archiveForm = reactive({
      archiveRemark: '',
      trunkGirth: 0,
      bag: false,//true 套袋；false 没套袋
      fruitCount: 0,
      branchCount: 0,
      flowerDensity: 0,
      flowerCount: 0,
      archiveTime: moment(),
      updateTime: moment(),
    })
    let imgPath = ref(['14_1_6_w.jpg', '14_1_6_wn.jpg', '14_1_7_e.jpg', '14_1_7_en.jpg', '14_1_7_es.jpg', '14_1_7_w.jpg', '14_1_7_wn.jpg'])
    onMounted(() => {
      if (props.editOrAdd) {
        archiveForm.archiveRemark = props.archiveInfo.archiveRemark
        archiveForm.trunkGirth = props.archiveInfo.trunkGirth
        archiveForm.bag = props.archiveInfo.bag
        archiveForm.fruitCount = props.archiveInfo.fruitCount
        archiveForm.branchCount = props.archiveInfo.branchCount
        archiveForm.flowerDensity = props.archiveInfo.flowerDensity
        archiveForm.flowerCount = props.archiveInfo.flowerCount
        archiveForm.archiveTime = props.archiveInfo.archiveTime
        archiveForm.updateTime = props.archiveInfo.updateTime
        editOrAdd.value = true
      }
    })
    function delPic(picName){
      console.log(picName)
      let imgs = imgPath.value
      let _imgPath = []
      for (let i=0;i<imgs.length;i++){
        if (imgs[i] === picName){
          continue
        }else{
          _imgPath.push(imgs[i])
        }
      }
      imgPath.value = _imgPath
    }
    return {
      archiveForm, imgPath, editOrAdd,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
      delPic,
    }
  }
}
</script>

<style scoped>
.archiveEditorPics {
  margin-top: 20px;
}
</style>