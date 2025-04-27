export type Question = {//题目
    "ID": number,
    "instanceID": number,
    "createdAt": string,
    "updatedAt": string,
    "DeletedAt": null,
    "unique_id": string,
    "title": string,
    "descrition": string,
    "author": string,
    "time_limit": number,
    "memory_limit": number,
    "tag": string  //"math,test,example,easy",
    "level": number,
  }
export interface userInfo {
    ID: number, // 修改了字段名从'id'到'ID'，类型从'string'改为'number'
    instanceID: number, // 新增字段
    createdAt: string, // 新增字段
    updatedAt: string, // 新增字段
    DeletedAt: any, // 新增字段，使用'any'类型处理可能为null的情况
    username: string, // 保持不变
    password: string, // 保持不变
    status: string, // 修改了字段名从'role'到'status'
    nickname: string, // 新增字段
    email: string, // 保持不变
    phone: string, // 新增字段
    avatar: string, // 修改了字段名从'url'到'avatar'，并更新描述为头像链接
    bio: string, // 修改了字段名从'sign'到'bio'，并更新描述为个人简介
    company: string, // 新增字段
    location: string, // 保持不变，但注意实际用途可能是显示用户的地理位置
    profile_url: string, // 新增字段，用于外部个人资料页面链接

    // 下面是原结构中存在但在新示例中未提及的字段，保留或移除取决于需求
    experience?: number, // 可选字段
    level?: number, // 可选字段
    school?: string, // 可选字段
    tag?: string, // 可选字段
    gender?: string, // 可选字段
    easyResolve?: number, // 可选字段
    middleResolve?: number, // 可能是'middleResolve', 如果是拼写错误，则修正
    hardResolve?: number, // 可选字段
    nightmareResolve?: number, // 可选字段
    rank?: number, // 可选字段
    fans?: number, // 可选字段
    subscribe?: number, // 可选字段
    ban?: number // 可选字段
}

// export interface BlogUser{//博客用户
//     id:string,
//     nickName:string,
//     email:string,
//     level:number,
//     location:string,
//     school:string,
//     tag:string,
//     gender:string,
//     url:string,
//     sign:string,
//     fans:string,
//     subscribe:string
// }

export interface Post {
    ID: number; // 帖子的唯一标识符
    instanceID: number; // 实例ID
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
    DeletedAt?: string | null; // 删除时间（如果适用）
    title: string; // 帖子标题
    content: string; // 帖子内容
    author: string; // 帖子作者
}

export interface comment {
    ID: number; // 评论的唯一标识符
    instanceID: number; // 实例ID
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
    DeletedAt?: string | null; // 删除时间（如果适用）
    content: string; // 评论内容
    author: string; // 评论作者
    refer_id?: number; // 引用的评论ID（可选）
    refer_type?: string; // 引用的评论类型（可选）
    source_id: number; // 源ID（例如帖子ID）
    source_type: string; // 源类型（例如 "post"）
}
// export interface PostList {//总文章列表
//     totalItems: number; // 总文章数
//     Items: Post[]; // 具体的文章项数组
// }
export interface like {//点赞
    ID: number; // 文章点赞的唯一标识符
    instanceID: number; // 实例ID
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
    DeletedAt?: string | null; // 删除时间（如果适用）
    item_id: number; // 被点赞项目的ID
    item_type: string; // 被点赞项目的类型，如 "post" 或 "comment"
}


// export interface Match{//比赛
//     id:string,
//     matchName:string,
//     matchDescription:string,
//     createTime:string,
//     startTime:string,
//     endTime:string,
//     persistentTime:number,
//     participationCount:number,
//     matchType:number,
//     imgUrl:string,
//     state:string
// }


export interface TestSample{//测试样例
    id:string,
    qid:string,
    questionName:string,
    sampleInput:string,
    sampleOutput:string,
    sampleInputArray:string[],
    sampleOutputArray:string[]
}



export interface sysInfoObj{//系统信息
    cpuInfo:cpuInfoObj,
    jvmInfo:jvmInfoObj,
    memoryInfo:memoryInfoObj,
    sysInfo:computerInfoObj,
    filesInfo:fileInfoObj[],
}

export interface cpuInfoObj{//CPU信息
    cpuNum:number,
    sysUsage:number,
    userUsage:number,
    ioWait:number,
    cpuUsage:number
}

export interface memoryInfoObj{//内存信息
    totalMemory:number,
    usedMemory:number,
    freeMemory:number,
    pageSize:number,
    usageMemory:number
}

export interface jvmInfoObj{//JVM信息
    totalMemory:number,
    freeMemory:number,
    maxMemory:number,
    usedMemory:number,
    usageMemory:number,
    jdkVersion:string,
    jdkHome:string
}

export interface computerInfoObj{
    //操作系统信息
    osName:string,
    osArch:string,
    computeName:string,
    ip:string,
    projectDir:string
}

export interface fileInfoObj{
//CPU使用情况、内存使用情况、JVM信息、操作系统信息和文件系统信息
    dirName:string,
    dirType:string,
    fileType:string,
    totalSize:number,
    freeSize:number,
    usedSize:number,
    usage:number
}
