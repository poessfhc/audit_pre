import fetch from '@/http/fetch.js'

export const Login = {
  userLogin(data) {
    return fetch('post', '/user/login', data)
  },
  jcnb(data) {
    // return fetch('get','/admin/sendCodeEmail','emailAddress='+data)
    return fetch('get', '/admin/sendCodeEmail', { 'emailAddress': data })
  },
  queryMenuList(data) {
    return fetch("get", "/admin/queryControlTypeList", {})
  }
}

export const User = {
  queryUserList(data) {
    return fetch("get", "/admin/queryUser", data)
  }
}

export const Business = {
  insertProject(data) {
    return fetch("post", "/implement/insertProject", data)
  },

  projectList(data) {
    return fetch("get", "/implement/queryProjectListByStatus", data)
  },

  auditProjectList(data) {
    return fetch("get", "/implement/queryAuditProjectListByStatus", data)
  },

  queryProjectById(data) {
    return fetch("get", "/implement/queryProjectById", data)
  },
  changeProjectStageById(data) {
    return fetch("get", "/implement/changeProjectStageById", data)
  }

}

export const Log = {
  queryLogList(data) {
    return fetch("get", "/log/querySysLog", data)
  }
}