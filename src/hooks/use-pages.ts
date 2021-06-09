import {ref} from "vue"
import {PaginationProps} from 'ant-design-vue/lib/pagination/Pagination'

export interface PageOption extends Partial<typeof PaginationProps>{
    current?: number;
    pageSize?: number;
    total?: number;
    pageSizeOptions?: string[]; // 指定每页可以显示多少条
    showSizeChanger?: boolean; // 显示可改变每页数量
    showQuickJumper?: boolean; // 是否显示跳转
    showTotal?: (total) => any; // 显示总数
    onChange?: (current, pageSize) => any; // 页码改变
    onShowSizeChange?: (current, pageSize) => any; // pageSize变化
    pageChange?: (current, pageSize) => any; // 页码或pageSize变化触发
    size:'large';
    [key: string]: any;
}

export function usePages(pageOptions?: PageOption) {
    // 分页配置参数
    const pageOption = ref({
        current: 1,
        pageSize: 20,
        total: 0,
        pageSizeOptions: ['20', '40', '60', '80', '100'],
        showQuickJumper: true,
        showSizeChanger: true, // 显示可改变每页数量
        showTotal: total => `共 ${total} 条`, // 显示总数
        onChange: (current, pageSize) => pageOptions?.pageChange?.(current, pageSize),
        onShowSizeChange: (current, pageSize) => pageOptions?.pageChange?.(current, pageSize), 
        size:'large',
        ...pageOptions
    })

    // 提供给ant-pagination组件的参数
    // const state = reactive({
    //     pageOption
    // })

    // 更新分页配置
    const updatePageOption = (options = {}) => {
        Object.assign(pageOption.value, options)
        // Object.keys(options).forEach(key => pageOption.value[key] = options[key])
        console.log(pageOption.value, '更新分页配置')
    }

    return {
        pageOption,
        updatePageOption
    }
}
