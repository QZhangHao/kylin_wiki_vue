import { FormSchema } from "@/hooks/schema";
import { getRoleList } from '@/api/role'
import { getDeptList } from '@/api/dept'
import {createVNode} from 'vue'
import UploadAvatar from './components/upload-avatar.vue'


// 与vue2的里面的data一样，函数返回新对象防止多处共用同一对象,造成数据混乱
export const getFormSchema = (): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "用户名",
            field: "userName",
            value: '',
            props: {
                placeholder: "请输入用户名"
            },
            rules: [
                {
                    required: true,
                    message: "用户名不能为空",
                    type:'string'
                },
                {
                    len:6, 
                    message:"用户名不合法，最大长度为6，只支持字母或数字",
                    type:'string',
                    pattern:new RegExp('^[A-Za-z0-9]+$'),
                    trigger:'blur'
                }
            ]
        },
        {
            type: "input",
            label: "密码",
            field: "password",
            hidden: false, // 是否隐藏
            value: '',
            props: { 
                placeholder: "请输入密码"
            },
            rules: [
                {
                    required: true,
                    message: "密码不能为空",
                    type:'string'
                }
            ]
        },
        {
            type:createVNode(UploadAvatar),
            label:'头像',
            field:"avatar",
            value:'', 
        },
        {
            type: 'input',
            label: '显示名称',
            field: 'displayName',
            hidden: false,
            value: '',
            props: {
                placeholder: '请输入显示名称'
            },
            rules: [
                {
                    required: true,
                    message: "显示名称不能为空",
                    type:'string'
                }
            ]
        },
        {
            type: 'input',
            label: '电话号码',
            field: 'mobile',
            hidden: false,
            value: null,
            props: {
                placeholder: '请输入电话号码'
            },
            rules:[
                {
                    required:false,
                    message:"电话号码格式不正确！",
                    type:'string',
                    pattern:new RegExp('^[1][3-8][0-9]{9}$'), 
                    trigger:'blur'
                }
            ]
        },
        {
            type: 'input',
            label: '邮箱',
            field: 'email',
            hidden: false,
            value: '',
            props: {
                placeholder: '请输入邮箱地址'
            },
            rules:[
                {
                    required:false,
                    message:"邮箱格式不正确！",
                    type:'email',
                    trigger:'blur'
                }
            ]
        },
        {
            type: 'select',
            label: "所在部门",
            field: "deptID",
            hidden: false,
            value: '',
            props: {
                placeholder: '请选择所在部门'
            },
            rules: [
                {
                    required: true,
                    message: '请选择所在部门',
                    type:'number'
                }
            ],
            asyncOptions: async () => {
                const { data } = await getDeptList()
                return data.map(item=>({
                    key:item.deptName, 
                    label:item.deptName,
                    value:item.deptID
                })) 
            }
        },
        {
            type: "checkbox",
            label: "角色",
            field: "roles",
            value: [],
            options: [],
            loading: true,
            rules: [
                {
                    required: true,
                    message: '请选择角色',
                    type: 'array'
                }
            ],
            asyncOptions: async () => { // 异步数据回调
                // 获取角色列表
                const { data } = await getRoleList()
                return data.map(item => ({
                    label: item.roleName,
                    value: item.roleID
                }))
            }
        }
    ]
})


