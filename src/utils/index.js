/*
 * @Author: shiliangL
 * @Date: 2022-05-07 10:21:38
 * @LastEditTime: 2022-06-06 17:31:36
 * @LastEditors: Do not edit
 * @Description:
 */

/**
 * @desc  函数防抖---“立即执行版本” 和 “非立即执行版本” 的组合版本
 * @param  func 需要执行的函数
 * @param  wait 延迟执行时间（毫秒）
 * @param  immediate---true 表立即执行，false 表非立即执行
 **/

export function debounce(func, wait = 300, immediate = false) {
  let timer
  return function() {
    const context = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      var callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timer = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
  }
}

export function deepMerge(target, merged) {
  for (const key in merged) {
    // eslint-disable-next-line no-prototype-builtins
    if (merged.hasOwnProperty(key)) {
      target[key] =
        target[key] && target[key].toString() === '[object Object]'
          ? deepMerge(target[key], merged[key])
          : (target[key] = merged[key])
    }
  }
  return target
}
