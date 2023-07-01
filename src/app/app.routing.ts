import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { CapNhatNguoiLamKhoaHocResolver, InitialDataResolver } from 'app/app.resolvers';

export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'dashboards/dashboard' },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboards/dashboard' },
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)
            }
        ]
    },
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [{
            path: 'capnhatnguoilamkhoahoc/:tklink',
            pathMatch: 'full',
            component: LayoutComponent,
            resolve: {
                tklink: CapNhatNguoiLamKhoaHocResolver,
            }

        }
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            // Dashboards
            {
                path: 'dashboards', children: [
                    { path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboards/dashboard/dashboard.module').then(m => m.DashboardModule) },
                ]
            },
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'admin', children: [
                    { path: 'listuser', loadChildren: () => import('app/modules/admin/listuser/listuser.module').then(m => m.ListUserModule) },
                    { path: 'listusergrant', loadChildren: () => import('app/modules/admin/listusergrant/listusergrant.module').then(m => m.ListUserGrantModule) },
                    { path: 'listfunction', loadChildren: () => import('app/modules/admin/listfunction/listfunction.module').then(m => m.ListFunctionModule) },
                    { path: 'listrole', loadChildren: () => import('app/modules/admin/listrole/listrole.module').then(m => m.ListRoleModule) },
                    { path: 'listorganization', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                    {
                        path: 'api', children: [
                            { path: 'listapi', loadChildren: () => import('app/modules/admin/api/listapi/api.module').then(m => m.ApiModule) },
                            { path: 'listapiinput', loadChildren: () => import('app/modules/admin/api/listapiinput/listapiinput.module').then(m => m.ApiInputModule) },
                            { path: 'listapigroup', loadChildren: () => import('app/modules/admin/api/listapigroup/listapigroup.module').then(m => m.ApiGroupModule) },
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'nghiepvu', children: [
                    {
                        path: 'danhmuc', children: [
                            { path: 'nguoilamkhoahoc', loadChildren: () => import('app/modules/admin/listnguoithuchien/listnguoithuchien.module').then(m => m.ListNguoiThucHienModule) },
                            { path: 'capnhatnguoilamkhoahoc/:tk', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                        ],
                    },
                    {
                        path: 'kehoach', children: [
                            { path: 'dinhhuong', loadChildren: () => import('app/modules/nghiepvu/kehoach/dinhhuong/listdinhhuong.module').then(m => m.ApiDinhHuongModule) },
                            { path: 'pheduyetdinhhuong', loadChildren: () => import('app/modules/nghiepvu/kehoach/pheduyetdinhhuong/pheduyetdinhhuong.module').then(m => m.ApiPheDuyetDinhHuongModule) },
                            { path: 'giao', loadChildren: () => import('app/modules/nghiepvu/kehoach/giao/giao.module').then(m => m.ApiGiaoModule) },
                        ],
                    },
                    {
                        path: 'detainhiemvu', children: [
                            { path: 'lstdetaicuatoi', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                            { path: 'xetduyet', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                            { path: 'dangthuchien', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                            { path: 'nghiemthu', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                            { path: 'hoanthanh', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                        ],
                    },
                    {
                        path: 'sangkien', children: [
                            { path: 'lstsangkiencuatoi', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                            { path: 'xetduyet', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                            { path: 'dangthuchien', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                            { path: 'thulao', loadChildren: () => import('app/modules/admin/listorganization/listorganization.module').then(m => m.OrganizationModule) },
                        ],
                    },
                ]
            },
        ]
    },
    {
        path: 'errors',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        children: [
            // 404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '500-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: '401-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-401/error-401.module').then(m => m.Error401Module) },
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '500-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    },
];
