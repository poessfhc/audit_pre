// 懒加载组件
function lazy (name) {
  let file = name.split('_')[0]
  if (name !== 'dashboard') {
    return () => import(`../page/${file}/${name}.vue`)
  } else {
    return () => import(`../components/${name}.vue`)
  }
}
export {lazy}
