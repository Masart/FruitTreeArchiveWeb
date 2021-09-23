<template>
  <div class="searchInput" v-if="inputOrSelect">
    <span>
      <a-input placeholder="请输入果树编号" v-model:value="searchValue" class="inputBox">
      <template #suffix>
<!--        <a-upload-->
<!--            v-model:file-list="fileList"-->
<!--            name="fruitQR"-->
<!--            :multiple="false"-->
<!--            :headers="uploadHeaders"-->
<!--            @change="handleChange"-->
<!--            accept=".jpg,.png"-->
<!--        >-->
          <a-tooltip title="打开本地图片">
            <QrcodeOutlined style="color: rgba(0, 0, 0, 0.45);font-size: 16px"/>
          </a-tooltip>
<!--        </a-upload>-->
      </template>
    </a-input>
    </span>
    <span>
      <a-button type="primary" class="searchBtn" @click="getSearchResult">查询</a-button>
    </span>
  </div>
  <div v-if="!inputOrSelect" class="searchSelect">
    <a-cascader
        :style="selectStyle"
        :options="options"
        :changeOnSelect="true"
        v-model:value="selectedVariety"
        placeholder="请选择种类"/>

    <a-cascader
        :style="selectStyle"
        v-model:value="selectedArea"
        :options="options"
        :changeOnSelect="true"
        placeholder="请选择地区"/>

    <a-date-picker
        v-model:value="selectedYear"
        class="searchSelectDate"
        placeholder="果树种植年份"
        format="YYYY"
        mode="year"
        :open="isYearSelectOpen"
        @openChange="openYearSelect"
        @panelChange="selectYear"
    />
    <a-button type="primary" @click="getSearchResult" style="width: 120px;border-radius: 5px">
      开始搜索
    </a-button>
  </div>
  <a-divider>
    <a-button type="link" v-if="inputOrSelect" @click="changeSearchMode">高级查询</a-button>
    <a-button type="link" v-if="!inputOrSelect" @click="changeSearchMode">编号查询</a-button>
  </a-divider>
  <SearchResult v-if="resultVisible" :searchKey="searchKey"></SearchResult>
</template>

<script>
import {ref, onMounted, reactive} from 'vue'
import Route from '../../router'

import {
  QrcodeOutlined
} from '@ant-design/icons-vue';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import {message} from 'ant-design-vue';
import SearchResult from "@/components/home/SearchResult";

export default {
  name: "Home",
  components: {SearchResult, QrcodeOutlined,},
  setup() {
    let inputOrSelect = ref(true)//编号：true   场地品种：false
    let isYearSelectOpen = ref(false)
    let resultVisible = ref(false)
    let searchValue = ref('')
    let selectedVariety = ref([''])
    let selectedArea = ref([''])
    let selectedYear = ref()
    let searchKey = reactive({
      code: '',
      variety: '',
      area: '',
      year: '',
    })
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    const selectStyle = "margin-right: 60px;width: 278px"
    const uploadHeaders = {
      authorization: 'authorization-text',
    }
    const handleChange = info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    //切换编号搜索 \ 高级搜索
    function changeSearchMode() {
      if (inputOrSelect.value) {
        searchValue.value = ''
      } else {
        selectedVariety.value = ['']
        selectedArea.value = ['']
        selectedYear.value = ''
      }
      inputOrSelect.value = !inputOrSelect.value
    }

    //控制Year组件开关
    function openYearSelect(status) {
      if (status) {
        isYearSelectOpen.value = true;
      } else {
        isYearSelectOpen.value = false;
      }
    }

    //选择Year
    const selectYear = (val) => {
      selectedYear.value = val
      isYearSelectOpen.value = false
    }
    onMounted(() => {
      if (Object.keys(Route.currentRoute.value.query).length === 0) {
        resultVisible.value = false
      } else {
        resultVisible.value = true
        searchKey.code = Route.currentRoute.value.query.code
        searchKey.variety = Route.currentRoute.value.query.variety
        searchKey.area = Route.currentRoute.value.query.area
        searchKey.year = Route.currentRoute.value.query.year
      }
    })

    function getSearchResult() {
      resultVisible.value = true
      searchKey.code = searchValue.value
      searchKey.variety = selectedVariety.value
      searchKey.area = selectedArea.value
      searchKey.year = selectedYear.value
      if ((typeof (searchValue.value) !== 'undefined') && (searchValue.value !== '')) {
        Route.push('/home?code=' + searchValue.value + '&variety=&area=&year=')
      } else {
        if (typeof (selectedYear.value) === 'undefined') {
          selectedYear.value = ''
          searchKey.year = ''
        }
        Route.push('/home?code=&variety=' + selectedVariety.value +
            '&area=' + selectedArea.value +
            '&year=' + selectedYear.value)
      }

    }

    return {
      searchValue, inputOrSelect, options, selectedYear, isYearSelectOpen, selectedVariety,
      selectedArea, selectStyle, uploadHeaders, resultVisible,searchKey,
      changeSearchMode, moment, selectYear, openYearSelect, handleChange, getSearchResult
    }
  }
}
</script>

<style scoped>
.searchInput {
  display: flex;
  justify-content: center; /*水平方向的居中*/
  margin-top: 50px;
}

.inputBox {
  width: 500px;
  height: 42px;
  border-radius: 7px 0 0 7px;
  border: 2px solid #1890ff;
}

.searchBtn {
  height: 42px;
  width: 84px;
  border-radius: 0 7px 7px 0;
}

.searchSelect {
  display: flex;
  justify-content: center; /*水平方向的居中*/
  margin-top: 50px;
  margin-bottom: 26px;
}

.searchSelectDate {
  width: 278px;
  margin-right: 60px;
}
</style>