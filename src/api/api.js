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
  },
  sendCodeEmail(data) {
    return fetch("get", "/admin/sendCodeEmail", data)
  },
  register(data) {
    return fetch("post", "/admin/register", data)
  },
  queryTree(data) {
    return fetch("get", "/role/queryTree", {})
  },
  queryRoleList(data) {
    return fetch("get", "/role/queryRoleList", {})
  },
  queryRoleByUserId(data) {
    return fetch("get", "/role/queryRoleByUserId", data)
  },
  queryRole(data) {
    return fetch("get", "/role/queryRole", {})
  },
  updateUserRoleByUserId(data) {
    return fetch("get", "/role/updateUserRoleByUserId", data)
  },
  queryRoleTree(data) {
    return fetch("get", "/role/queryRoleTree", data)
  },
  updateRoleTreeByRoleId(data) {
    return fetch("post", "/role/updateRoleTreeByRoleId", data)
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
  },
  downStage(data) {
    return fetch("get", "/implement/downStage", data)
  },
  queryInstallationList(data) {
    return fetch("get", "/project/queryInstallationList", data)
  },
  insertInstallation(data) {
    return fetch("post", "/project/insertInstallation", data)
  },
  queryInstallationCountById(data) {
    return fetch("get", "/project/queryInstallationCountById", data)
  },
  queryProjectAuditByProjectId(data) {
    return fetch("get", "/project/queryProjectAuditByProjectId", data)
  },
  insertProjectCapital(data) {
    return fetch("post", "/project/insertProjectCapital", data)
  },
  queryProjectCapitalByProjectId(data) {
    return fetch("get", "/project/queryProjectCapitalByProjectId", data)
  },
  queryInstallationByProjectId(data) {
    return fetch("get", "/implement/queryInstallationByProjectId", data)
  },
  updateInstallationFlagByProjectId(data) {
    return fetch("get", "/implement/updateInstallationFlagByProjectId", data)
  },
  queryInstallationInfoByProjectId(data) {
    return fetch("get", "/implement/queryInstallationInfoByProjectId", data)
  },
  settlementByprojectId(data) {
    return fetch("get", "/project/settlementByprojectId", data)
  },
  warning(data){
    return fetch("get","/implement/warning",data)
  }
}

export const Log = {
  queryLogList(data) {
    return fetch("get", "/log/querySysLog", data)
  }
}






// export const Login = {
//   userLogin(data) {
//     return fetch('post', 'api/user/login', data)
//   },
//   jcnb(data) {
//     // return fetch('get','/admin/sendCodeEmail','emailAddress='+data)
//     return fetch('get', 'api/admin/sendCodeEmail', { 'emailAddress': data })
//   },
//   queryMenuList(data) {
//     return fetch("get", "api/admin/queryControlTypeList", {})
//   }
// }

// export const User = {
//   queryUserList(data) {
//     return fetch("get", "api/admin/queryUser", data)
//   },
//   sendCodeEmail(data) {
//     return fetch("get", "api/admin/sendCodeEmail", data)
//   },
//   register(data) {
//     return fetch("post", "api/admin/register", data)
//   },
//   queryTree(data) {
//     return fetch("get", "api/role/queryTree", {})
//   },
//   queryRoleList(data) {
//     return fetch("get", "api/role/queryRoleList", {})
//   },
//   queryRoleByUserId(data) {
//     return fetch("get", "api/role/queryRoleByUserId", data)
//   },
//   queryRole(data) {
//     return fetch("get", "api/role/queryRole", {})
//   },
//   updateUserRoleByUserId(data) {
//     return fetch("get", "api/role/updateUserRoleByUserId", data)
//   },
//   queryRoleTree(data) {
//     return fetch("get", "api/role/queryRoleTree", data)
//   },
//   updateRoleTreeByRoleId(data) {
//     return fetch("post", "api/role/updateRoleTreeByRoleId", data)
//   }
// }

// export const Business = {
//   insertProject(data) {
//     return fetch("post", "api/implement/insertProject", data)
//   },

//   projectList(data) {
//     return fetch("get", "api/implement/queryProjectListByStatus", data)
//   },

//   auditProjectList(data) {
//     return fetch("get", "api/implement/queryAuditProjectListByStatus", data)
//   },

//   queryProjectById(data) {
//     return fetch("get", "api/implement/queryProjectById", data)
//   },
//   changeProjectStageById(data) {
//     return fetch("get", "api/implement/changeProjectStageById", data)
//   },
//   downStage(data) {
//     return fetch("get", "api/implement/downStage", data)
//   },
//   queryInstallationList(data) {
//     return fetch("get", "api/project/queryInstallationList", data)
//   },
//   insertInstallation(data) {
//     return fetch("post", "api/project/insertInstallation", data)
//   },
//   queryInstallationCountById(data) {
//     return fetch("get", "api/project/queryInstallationCountById", data)
//   },
//   queryProjectAuditByProjectId(data) {
//     return fetch("get", "api/project/queryProjectAuditByProjectId", data)
//   },
//   insertProjectCapital(data) {
//     return fetch("post", "api/project/insertProjectCapital", data)
//   },
//   queryProjectCapitalByProjectId(data) {
//     return fetch("get", "api/project/queryProjectCapitalByProjectId", data)
//   },
//   queryInstallationByProjectId(data) {
//     return fetch("get", "api/implement/queryInstallationByProjectId", data)
//   },
//   updateInstallationFlagByProjectId(data) {
//     return fetch("get", "api/implement/updateInstallationFlagByProjectId", data)
//   },
//   queryInstallationInfoByProjectId(data) {
//     return fetch("get", "api/implement/queryInstallationInfoByProjectId", data)
//   },
//   settlementByprojectId(data) {
//     return fetch("get", "api/project/settlementByprojectId", data)
//   }
// }

// export const Log = {
//   queryLogList(data) {
//     return fetch("get", "api/log/querySysLog", data)
//   }
// }