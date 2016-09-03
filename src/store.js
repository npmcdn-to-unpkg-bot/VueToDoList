/**
 * Created by wangq on 2016/8/16.
 */
const STORAGE_KEY='todos-vuejs'
export default {
  fetch(){
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'[]')
  },
  save(lists){
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(lists))
  }
}
