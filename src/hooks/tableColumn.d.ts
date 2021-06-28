import {ColumnProps, TableProps} from 'ant-design-vue/lib/table/interface'

export declare interface ActionOptions {
    type: 'select' | 'button' | 'text' | 'popconfirm'; // 控制类型，默认为a,可选： select | button | text
    text: string;
    permission?: string;
    props?: any; // 组件属性，v-bind="props"
    func?: ({text, record, index}, callback: (...rest) => any) => any; // 动作事件触发回调
}

export declare interface TableColumn extends ColumnProps {
    title: string;
    dataIndex: string;
    width?: number;
    slots?: {
        customRender: string;
    };
    slotsType?: 'format' | 'link' | 'component';
    slotsFunc?: (val) => any;
    actions?: ActionOptions[];
}
