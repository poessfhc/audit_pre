
import {lazy} from './lazyLoading'
export default (routers, data) => {
  // 要重新遍历一下，是因为，通常我们动态路由的时候，
  // 是获取服务端数据，这个component属性是一个字符串转化成组件
  generaMenu(routers, data)
}
function generaMenu (routers, data) {
  data.forEach((item) => {
    let menu = Object.assign({}, item)
    menu.component = lazy(menu.component)
    if (item.children) {
      menu.children = []
      generaMenu(menu.children, item.children)
    }
    routers.push(menu)
  })
}
