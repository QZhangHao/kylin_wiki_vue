import type { App } from 'vue'
import ant from 'ant-design-vue';


export function setupAntd(app:App<Element>){
    app.use(ant)
}