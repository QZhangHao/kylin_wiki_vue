/**
 * @ description 自动导入组件
 */
const components = import.meta.globEager('./*.vue')
const modules = {}
Object.keys(components).forEach(path => {
    const fileName = path.replace(/(.*\/)*([^.]+).*/ig,"$2")
    modules[fileName] = components[path].default
})
export default modules
