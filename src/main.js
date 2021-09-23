//引入的不再是Vue构造函数，引入的是createApp工厂函数
//工厂函数无需通过new调用
import {createApp} from 'vue'
import router from './router'
import App from './App.vue'
import {
    Menu,
    Layout,
    Row,
    Col,
    Button,
    Dropdown,
    Card,
    Drawer,
    Tooltip,
    Form,
    Input,
    Descriptions,
    Modal,
    Tree,
    Collapse,
    Tabs,
    Space,
    Breadcrumb,
    Popover, Empty, PageHeader
} from "ant-design-vue"


//创建应用实例对象
const app = createApp(App)
//挂载
/** 顺序很重要！ **/
app.use(router)

app.use(Menu)
app.use(Row)
app.use(Col)
app.use(Layout)
app.use(Button)
app.use(Dropdown)
app.use(Drawer)
app.use(Tooltip)
app.use(Form)
app.use(Input)
app.use(Card)
app.use(Descriptions)
app.use(Modal)
app.use(Tree)
app.use(Collapse)
app.use(Space)
app.use(Breadcrumb)
app.use(Popover)
app.use(Tabs)
app.use(Empty)
app.use(PageHeader)


app.mount('#app')