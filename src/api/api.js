import fetch from '@/http/fetch.js'

export const Login = {
    userLogin(data){
      return fetch('post','/user/login',data)
    },
    jcnb(data){
      // return fetch('get','/admin/sendCodeEmail','emailAddress='+data)
      return fetch('get','/admin/sendCodeEmail',{'emailAddress': data})
    },
    queryMenuList(data){
      return fetch("get","/admin/queryControlTypeList",{})
    }
  }

export const Business = {
  projectList(data){
    return fetch("get","/test/fingTest",data)
  }
}