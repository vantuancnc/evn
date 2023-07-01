export interface User {
    userId: string;
    userIdhrms: string;
    avatar: string;
    userName: string;
    descript: string;
    ORGID: string;
    ORG_TYPEID: string;
    ORGLEVEL: string;
    ORGDESC: string;
    roles: [];
    fgrant: UserFunctionGrant[];
}
export interface UserFunctionGrant {
    functionId: string;
    functionName: string;
    grantPublic: boolean;
    grantInsert: boolean;
    grantUpdate: boolean;
    grantDel: boolean;
    grantAuthority: any[];
}
