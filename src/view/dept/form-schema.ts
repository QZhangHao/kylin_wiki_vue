import { FormSchema } from "@/hooks/schema";
import { getDeptList } from '@/api/dept'

export const getFormSchema = (): FormSchema => ({
    formItem: [
        {
            type: "input",
            label: "部门名称",
            field: "deptName",
            value: '',
            props: {
                placeholder: "请输入部门名称"
            },
            rules: [
                {
                    required: true,
                    message: "部门名称不能为空",
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
                placeholder: "请输入排序号",
                min:"1"
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
            type: 'select',
            label: "上级部门",
            field: "pid",
            hidden: false,
            value: '',
            props: {
                placeholder: '请选择所在部门'
            },
            rules: [
                {
                    required: true,
                    message: '请选择所在部门',
                    type: 'number'
                }
            ],
            asyncOptions: async () => {
                const { data } = await getDeptList()
                let tree = data.map(item => ({
                    key: item.deptName,
                    label: item.deptName,
                    value: item.deptID
                }))
                return [{
                    key: '作为父级',
                    label: '作为父级',
                    value: 0
                }, ...tree]

            }
        },
    ]
})