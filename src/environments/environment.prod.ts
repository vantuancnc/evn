export const environment = {
    production: true,
    appAPI: 'https://khcn-dev.evn.com.vn/',//http://localhost:8088/
    hrmsIMGPath: 'hrmsimg',
    hrmsPath: 'hrms',
    apifilePath: 'file',
    evnidPath: 'evnid',    
    appPath: 'khcn/api',//'khcn'
    appType: 'WEB',
    expiration: 120,
    appId: 'KHCN',
    appVersion: 'KHCN 1.0.0 build 18/04/2023',
    AppHome: window.location.origin,
    Url_Origin: false,
    Org_code: 'EVN',
};


export const AuthConfig = {
    TOKEN_HEADER_KEY: 'Authorization',
    ACCESS_TOKEN: 'accessToken',
    ACCESS_TOKEN_HUB: 'accessToken_hub',
    ACCESS_TOKEN_EX: 'accessToken_Ex',
    REFRESH_TOKEN: 'refareshToken',
    USER_INFOR: 'userinfor',
    DEVICE_ID: 'device_id',
};
