import { FormSchema } from "@/hooks/schema";
import { createVNode } from "vue";
import MenuTree from './components/menu-tree.vue'
import { getListByRoleID } from '@/api/menu'

export const getFormSchema = (): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "角色名",
            field: "roleName",
            value: '',
            props: {
                placeholder: "请输入角色名"
            },
            rules: [
                {
                    required: true,
                    message: "角色名不能为空",
                    type: 'string'
                },
            ]
        },
        {
            type: 'input-number',
            label: "排序号",
            field: "orderNum",
            value: '0',
            props: {
                placeholder: "请输入排序号"
            },
            rules: [
                {
                    required: true,
                    message: "排序号不能为空，只能输入数字类型",
                    type: 'number'
                }
            ]
        },
        {
            type: createVNode(MenuTree),
            label: '菜单权限',
            field: 'menuList',
            value: [],
            asyncValue: async (currentValue, formInstance) => {
                const { roleID } = formInstance?.props.fields as any
                if (roleID) {
                    // 获取角色列表
                    const { data } = await getListByRoleID({roleID})
                    // 设置角色复选框选项
                    return data.map(item => item.menuID)
                }
            }

        }
    ]
})