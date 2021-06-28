import { getFormSchema } from './form-schema';
import { useFormModal } from './../../hooks/useFormModal/index';
import { TableColumn } from "@/hooks/tableColumn";
import {formatDate} from '@/utils/common'
import {createVNode} from 'vue'
import { Avatar } from 'ant-design-vue'
import {deleteUser, updateUser } from '@/api/user'

export const columns: TableColumn[]=[//账户列表
    {
        title:'用户名',
        dataIndex:'userName'
    },
    {
        title:'头像',
        dataIndex:'avatar',
        slots:{
            customRender:''
        },
        slotsType: 'component',
        slotsFunc: ( record) => createVNode(Avatar, {src: record.avatar??"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}) // 动态创建图标
    },
    {
        title:'显示名称',
        dataIndex:'displayName'
    },
    {
        title:'电话号码',
        dataIndex:'mobile'
    },
    {
        title:'邮箱',
        dataIndex:'email'
    },
    {
        title:'状态', 
        dataIndex:"status",
        slots:{
            customRender:"status"
        },
        slotsType:'format',
        slotsFunc:(val)=>val==false?'正常':'停用'
    },
    {
        title:'创建时间',
        dataIndex:'createOn',
        slots: {
            customRender: 'createOn'
        },
        slotsType: 'format',
        slotsFunc: (val) => formatDate(val)
    },
    {
        title:'最后更新时间',
        dataIndex: 'updateOn',
        slots: {
            customRender: 'updateOn'
        },
        slotsType: 'format',
        slotsFunc: (val) => formatDate(val)
    },
    {
        title:'操作',
        dataIndex:'action',
        width:200,
        slots:{
            customRender:'action'
        },
        actions:[
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                text: '删除',
                permission: 'system:user:delete',
                props: {
                  type: 'danger'
                },
                func: async ({record}, refreshTableData) => await deleteUser(record.userID).then(() => refreshTableData()),
            },
            {
                type: 'button', // 控制类型，默认为a,可选： select | button | text
                text: '编辑',
                permission: 'system:user:edit',
                props: {
                    type: 'primary'
                }, 
                func:({record},refreshTableData)=>useFormModal({
                    title:'编辑用户',
                    fields:{...record},
                    hiddenFields:['password'],
                    formSchema:getFormSchema(),
                    handleOk:async (modelRef,state)=>{
                        const { userName, password, roles, displayName, mobile, email, deptID,userID,avatar } = modelRef;
					const params = {
                        UserID:userID,
						UserName: userName,
						Password: password,
						Roles: roles,
						DisplayName: displayName,
						Mobile: mobile,
						Email: email,
						DeptId: deptID,
                        Avatar:avatar
					};
					return  updateUser(params).then(()=>refreshTableData()); 
                    }
                })
            }
        ]
    }


]