import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { AuthConfig, environment } from 'environments/environment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { CookieService } from 'ngx-cookie-service';

import { User } from '../user/user.types';



@Injectable()
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private deviceService: DeviceDetectorService,
        private _userService: UserService,
        private _cookie: CookieService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }
    set refreshToken(token: string) {
        this._cookie.set(AuthConfig.REFRESH_TOKEN, token, 20, '/', '', false, "Lax");
    }

    get refreshToken(): string {
        return this._cookie.get(AuthConfig.REFRESH_TOKEN) ?? '';
    }

    set accessTokenEx(token: string) {
        localStorage.setItem(AuthConfig.ACCESS_TOKEN_EX, token);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(userId: string, password: string): Observable<any> {
        // Throw error, if the user is already logged in
        const credentials = { 'userId': userId, 'password': password };
        if (this._authenticated) {
            return throwError('Bạn đã đăng nhập.');
        }

        return this._httpClient.post(environment.appAPI + environment.appPath + '/' + 'auth/sign-in', credentials).pipe(
            switchMap((response: any) => {
                if (response.status) {
                    this.accessToken = response.token;
                    // Set the authenticated flag to true
                    this._authenticated = true;
                    // Store the user on the user service
                    this._userService.user = response.userInfo;
                    // Return a new observable with the response

                } else {
                    const deviceInfo = this.deviceService.getDeviceInfo();
                    const deviceID =
                        localStorage.getItem(AuthConfig.DEVICE_ID) || AuthUtils.guid();
                    let dataSign = {
                        username: `${credentials.userId}`,
                        password: `${credentials.password}`,
                        expiration: environment.expiration,
                        deviceInfo: {
                            deviceId: deviceID,
                            deviceType: `${deviceInfo.os}/${deviceInfo.os_version}/${deviceInfo.deviceType}/${deviceInfo.browser}`,
                            appId: environment.appId,
                            appVersion: environment.appVersion,
                        },
                    };

                    return this._httpClient.post(environment.appAPI + environment.evnidPath + '/api/auth/login', dataSign).pipe(
                        switchMap(async (response: any) => {
                            const data = response.data;
                            let userInfo: User;
                            this.accessToken = response.data.accessToken;
                            const dateEx = AuthUtils.getTokenExpirationDate(response.data.accessToken);
                            this.accessTokenEx = dateEx.getTime().toString();
                            this.refreshToken = response.data.refreshToken;
                            localStorage.setItem(AuthConfig.DEVICE_ID, deviceID);
                            this._authenticated = true;
                            data.username = credentials.userId;
                            userInfo = { userId: credentials.userId, userName: data.hoten, userIdhrms: data.idnv, ORGID: data.iddonvi, ORG_TYPEID: data.ORG_TYPEID, ORGLEVEL: data.ORGLEVEL, ORGDESC: data.tendonvi, roles: [], fgrant: [], descript: data.chucdanh, avatar: null };
                            this._userService.user = userInfo;
                            return of({ "status": 1, "token": data.accessToken, "userInfo": userInfo });
                        })
                    );
                }
                return of(response);

            })

        );
    }
    /**
     * sign Refresh Token
     */
    removeAccessTokenHub(): void {
        this._cookie.delete(AuthConfig.ACCESS_TOKEN_HUB, '/', '', false, 'Lax');
    }
    signRefreshToken(): Observable<any> {
        // Renew token
        this.removeAccessTokenHub();
        const deviceID =
            localStorage.getItem(AuthConfig.DEVICE_ID) || AuthUtils.guid();
        if (this.refreshToken == "" || this.refreshToken == null) {
            this.signOut();
            location.reload();
            return of(false);
        }
        return this._httpClient
            .post(environment.appAPI + environment.evnidPath + `/api/auth/refresh`, {
                deviceId: deviceID,
                expiration: environment.expiration,
                refreshToken: `${this.refreshToken}`,
            })
            .pipe(
                catchError((eror) => {
                    // Return false
                    //     this.isRefreshing = false;
                    this.signOut();
                    location.reload();
                    return of(false);
                }),
                switchMap((response: any) => {
                    if (response === false) {
                        return of(false);
                    } else {
                        //let userInfo: User;
                        //const data = response.user;
                        this.accessToken = response.data.accessToken;
                        // Store the access token in the local storage
                        const dateEx = AuthUtils.getTokenExpirationDate(response.data.accessToken);
                        this.accessTokenEx = dateEx.getTime().toString();
                        // Store therefresh Token in the local storage
                        this.refreshToken = response.data.refreshToken;
                        // Set the authenticated flag to true
                        this._authenticated = true;
                        // Store the user on the user service
                        //this._userService.user = response.user;
                        //userInfo = { userId: "", userName: data.hoten, userIdhrms: data.idnv, ORGID: data.iddonvi, ORG_TYPEID: data.ORG_TYPEID, ORGLEVEL: data.ORGLEVEL, ORGDESC: data.tendonvi, roles: [], fgrant: [], descript: data.chucdanh, avatar: null };
                        //this._userService.user = userInfo;
                        localStorage.setItem(AuthConfig.DEVICE_ID, deviceID);
                        // Lấy lại mới thông tin người dùng
                        this.removeAccessTokenHub();
                        // Return true
                        return of(response.data.accessToken);
                    }
                })
            );
    }
    gettokenLink(tokenLink: string): Observable<any> {
        // Throw error, if the user is already logged in   
        const exeParameter = {
            "serviceId": "8F513952-0837-41EE-8519-FBB616CAF649",
            "parameters": [
                { "name": "TOKEN_LINK", "value": tokenLink }
            ]
        };
        if (tokenLink == null || tokenLink == '') {
            return of("");
        }

        return this._httpClient.post<any>(environment.appAPI + environment.appPath + '/service/execServiceNoLogin', exeParameter).pipe(
            switchMap((response: any) => {
                if (response.status) {
                    return of(response.data)

                } else {
                    return of("");
                }

            })

        );
    }
    /**
     * Sign in using the access token
     */
    signInUsingTokenLink(token: string): Observable<any> {
        const deviceID =
            localStorage.getItem(AuthConfig.DEVICE_ID) || AuthUtils.guid();
        return this._httpClient
            .post(environment.appAPI + environment.appPath + '/auth/sign-in-token', {
                "accessToken": token,
            })
            .pipe(
                catchError((eror) => {
                    return of(false);
                }),
                switchMap(async (response: any) => {
                    let userInfo: User;
                    const data = response.userInfo;
                    userInfo = { userId: data.userId, userName: data.userName, userIdhrms: data.userIdhrms, ORGID: data.orgid, ORG_TYPEID: null, ORGLEVEL: null, ORGDESC: data.orgdesc, roles: [], fgrant: [], descript: data.descript, avatar: null };
                    this._userService.user = userInfo;
                    this.accessToken = response.token;
                    this.refreshToken = "";
                    this._authenticated = true;
                    localStorage.setItem(AuthConfig.DEVICE_ID, deviceID);
                    return of(true);
                })
            );
    }
    signInUsingToken(token: string): Observable<any> {
        // Renew token
        //this.removeAccessTokenHub();
        //const deviceID =localStorage.getItem(AuthConfig.DEVICE_ID) || AuthUtils.guid();
        if (!AuthUtils.isTokenExpired(this.accessToken)) {
            this._authenticated = true;
            return of(true);
        } else {
            if (this.refreshToken != "" != null && this.refreshToken != "") {
                return of(true);
            } else {
                return of(false);
            }
        }


        /*return this._httpClient
            .get(environment.appAPI + environment.evnidPath + '/api/user/me')
            .pipe(
                catchError((eror) => {
                    return of(false);
                }),
                switchMap(async (response: any) => {
                    let userInfo: User;
                    const data = response.data;
                    userInfo = { userId: "", userName: data.hoten, userIdhrms: data.idnv, ORGID: data.iddonvi, ORG_TYPEID: data.ORG_TYPEID, ORGLEVEL: data.ORGLEVEL, ORGDESC: data.tendonvi, roles: [], fgrant: [], descript: data.chucdanh, avatar: null };
                    this._userService.user = userInfo;
                    localStorage.setItem(AuthConfig.DEVICE_ID, deviceID);
                    return of(true);
                })
            );*/
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        if (this._authenticated) {
            const deviceID = localStorage.getItem(AuthConfig.DEVICE_ID);
            this._httpClient
                .post(environment.appAPI + environment.evnidPath + '/api/user/logout', {
                    deviceInfo: {
                        appId: environment.appId,
                        deviceId: deviceID,
                    },
                })
                .subscribe((res) => {

                });
            localStorage.removeItem(AuthConfig.ACCESS_TOKEN_EX);
            localStorage.removeItem(AuthConfig.ACCESS_TOKEN);
            localStorage.removeItem(AuthConfig.REFRESH_TOKEN);
            this._cookie.delete('accessToken', '/');
            this._cookie.delete('refreshToken', '/');
            this._cookie.delete('accessToken_hub', '/');
            // Set the authenticated flag to false
            this._authenticated = false;
            return of(true);
        } else {
            return of(true);
        }
        // Remove the access token from the local storage

    }
    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            if (this.refreshToken != "" != null && this.refreshToken != "") {
                return this.signRefreshToken();
            } else {
                return of(false);
            }
            //return of(false);
        } else {
            return this.signInUsingToken(this.accessToken);
        }

        // If the access token exists and it didn't expire, sign in using it

    }
}


