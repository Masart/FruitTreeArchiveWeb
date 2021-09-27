<template>
  <a @click="showUserDrawer"><img height="48" :src="userImgPath"></a>
  <a-drawer
      width="27vw"
      placement="right"
      :closable="true"
      :visible="userDrawerVisible"
      @close="onClose"
      :bodyStyle="userDrawerBodyStyle"
  >
    <img height="200" :src="userImgPath">
    <div class="userDrawerUserName">{{ userInfo.userName }}</div>
    <a-card :bordered="false" size="small" style="min-height: 55vh">
      <template #extra>
        <a-tooltip v-if="!userInfoEditVisible" placement="bottomRight">
          <template #title>
            <span>编辑</span>
          </template>
          <a-button type="link" shape="circle" style="color: rgba(0,0,0,0.25)" @click="changeUserInfoEditVisible">
            <EditOutlined style="font-size: 22px"/>
          </a-button>
        </a-tooltip>
        <a-button type="link" v-if="userInfoEditVisible" @click="submitUserInfo"
                  style="color: #52c41a;height: 20px">
          <CheckOutlined/>
        </a-button>
        <a-button type="link" v-if="userInfoEditVisible" @click="closeUserInfoEditor"
                  style="color: red;height: 20px">
          <CloseOutlined/>
        </a-button>
      </template>
      <a-form layout="vertical" :rules="userInfoRules" v-if="userInfoEditVisible" :model="userInfoState">
        <a-form-item label="用户名：" name="userName">
          <a-input v-model:value="userInfoState.userName" placeholder="用户名"/>
        </a-form-item>
        <a-form-item label="联系方式：" name="userPhone">
          <a-input v-model:value="userInfoState.userPhone" placeholder="电话/手机"/>
        </a-form-item>
        <a-form-item label="E-mail：" name="userEmail">
          <a-input v-model:value="userInfoState.userEmail" placeholder="电子邮箱"/>
        </a-form-item>
      </a-form>
      <div v-if="!userInfoEditVisible" class="userInfo">
        <p>
          <HomeFilled class="infoIcon"/>
          {{ userInfo.userCode }}
        </p>
        <p>
          <UserOutlined class="infoIcon"/>
          {{ userInfo.userName }}
          <a-tooltip v-if="!userInfoEditVisible" placement="rightTop">
            <template #title>
              <span>修改密码</span>
            </template>
            <a @click="changePwdModalVisible">
              #
            </a>
          </a-tooltip>
        </p>
        <p>
          <PhoneFilled class="infoIcon"/>
          {{ userInfo.userPhone }}
        </p>
        <p>
          <MailFilled class="infoIcon"/>
          {{ userInfo.userEmail }}
        </p>
      </div>
    </a-card>
    <a-button danger shape="round" style="width: 90%;height: 40px;">退出登录</a-button>
    <a-modal v-model:visible="pwdModalVisible" title="修改密码">
      <template #footer>
        <a-button key="cancel" @click="changePwdModalVisible" style="margin-right: 20px">取消</a-button>
        <a-button key="confirm" @click="changePwd" type="primary" style="margin-right: 20px">修改</a-button>
      </template>
      <a-form layout="vertical" :rules="pwdRules" :model="userPwdState" v-if="pwdModalVisible">
        <a-form-item label="旧密码：" name="oldPwd">
          <a-input-password placeholder="输入旧密码" v-model:value="userPwdState.oldPwd"/>
        </a-form-item>
        <a-form-item label="新密码：" name="newPwd">
          <a-input-password placeholder="输入新密码" v-model:value="userPwdState.newPwd"/>
        </a-form-item>
        <a-form-item label="确认密码：" name="checkPwd">
          <a-input-password placeholder="再次输入新密码" v-model:value="userPwdState.checkPwd"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-drawer>
</template>

<script>
import {ref, reactive} from 'vue'
import axios from '../../axios'
import {
  EditOutlined, PhoneFilled, MailFilled, UserOutlined, CloseOutlined, CheckOutlined, HomeFilled
} from '@ant-design/icons-vue';
import URLConfig from "@/config/URLConfig";

export default {

  name: "HeaderUser",
  components: {
    EditOutlined, PhoneFilled, MailFilled, UserOutlined, CloseOutlined, CheckOutlined, HomeFilled
  },
  setup() {
    let userImgPath = 'User.svg'
    let userDrawerVisible = ref(false)
    let userInfoEditVisible = ref(false)
    let pwdModalVisible = ref(false)
    let userDrawerBodyStyle = {
      textAlign: "center",
      height: "100vh"
    }
    let userInfo = reactive({
      userCode: '',
      userRole: '核心管理员',
      userName: '',
      userPhone: '',
      userEmail: ''
    })
    let userInfoState = reactive({
      userCode: '',
      userRole: '',
      userName: '',
      userPhone: '',
      userEmail: '',
    })
    let userPwdState = reactive({
      oldPwd: '',
      newPwd: '',
      checkPwd: '',
    })


    const userInfoRules = {
      userName: [
        {required: true, message: '用户名不能为空', trigger: 'change'},
      ],
      userPhone: [{required: true, message: '请输入正确的联系方式', trigger: 'change'}],
      userEmail: [{required: true, message: '邮箱格式不正确', trigger: 'change', type: 'object'}],
    };


    let validateCheckPwd = async (rule, value) => {
      if (value === '') {
        return Promise.reject('请再次输入密码！');
      } else if (value !== userPwdState.newPwd) {
        return Promise.reject("两次输入的密码不一致！");
      } else {
        return Promise.resolve();
      }
    };


    const pwdRules = {
      oldPwd: [{required: true, message: '旧密码不能为空', trigger: 'change'},],
      newPwd: [{required: true, message: '新密码不能为空', trigger: 'change'},],
      checkPwd: [{
        required: true,
        validator: validateCheckPwd,
        trigger: 'change'
      }]
    }
    const onClose = () => {
      userDrawerVisible.value = false
      userInfoEditVisible.value = false
    }

    function showUserDrawer() {
      axios.ajaxRequest({
        url: URLConfig.requestAddress + '/fruitTreeArchive/user/getUser',
        data: {},
        params: {
          'userCode': 'admin',
        }
      }).then((res) => {
        if (res.code === '0') {
          userInfo.userCode = res.data.userCode
          userInfo.userName = res.data.userName
          userInfo.userPhone = res.data.userPhone
          userInfo.userEmail = res.data.userEmail
          userDrawerVisible.value = true
        }
      })

    }

    //编辑用户信息界面点击回调
    function changeUserInfoEditVisible() {
      if (userInfoEditVisible.value === false) {
        userInfoState.userCode = userInfo.userCode
        userInfoState.userRole = userInfo.userRole
        userInfoState.userName = userInfo.userName
        userInfoState.userPhone = userInfo.userPhone
        userInfoState.userEmail = userInfo.userEmail
      }
      userInfoEditVisible.value = !userInfoEditVisible.value
    }

    function changePwdModalVisible() {
      pwdModalVisible.value = !pwdModalVisible.value
      if (pwdModalVisible.value === false) {
        userPwdState.oldPwd = ''
        userPwdState.newPwd = ''
        userPwdState.checkPwd = ''
      }
    }

    function changePwd() {
      axios.ajaxRequest({
        url: URLConfig.requestAddress + '/fruitTreeArchive/user/changePassword',
        data: {},
        params: {
          'userCode': userInfo.userCode,
          'oldPwd': userPwdState.oldPwd,
          'newPwd': userPwdState.newPwd,
        }
      }).then((res) => {
        console.log(res)
        if (res.code === '0') {
          if (res.data) {
            console.log('修改成功')
            changePwdModalVisible()
          }
        }
      })
    }

    //修改用户信息提交表单
    function submitUserInfo() {
      axios.ajaxRequest({
        url: URLConfig.requestAddress + '/fruitTreeArchive/user/changeUserInfo',
        data: {},
        params: {
          'userCode': userInfoState.userCode,
          'userName': userInfoState.userName,
          'userPhone': userInfoState.userPhone,
          'userEmail': userInfoState.userEmail,
        }
      }).then((res) => {
        if (res.code === '0') {
          if (res.data) {
            showUserDrawer()
            console.log('修改成功')
            changeUserInfoEditVisible()
          }
        }
      })
    }

    //取消修改用户信息
    function closeUserInfoEditor() {
      changeUserInfoEditVisible()
    }

    return {
      userInfo,
      userImgPath,
      userDrawerVisible,
      userDrawerBodyStyle,
      userInfoState,
      userInfoRules,
      userInfoEditVisible,
      pwdModalVisible,
      pwdRules,
      userPwdState,
      onClose,
      showUserDrawer,
      changeUserInfoEditVisible,
      changePwdModalVisible,
      changePwd,
      submitUserInfo,
      closeUserInfoEditor,
    }
  }
}
</script>
<style scoped>

.userDrawerUserName {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
}

.ant-form {
  margin-left: 30px;
  margin-right: 30px;
  text-align: left;
}

.userInfo {
  text-align: left;
  margin: 20px 30px;
  font-size: 20px;
}

.infoIcon {
  margin-right: 4px;
}

.ant-input {
  border-radius: 7px;
}

.ant-input-password {
  border-radius: 7px;
}
</style>