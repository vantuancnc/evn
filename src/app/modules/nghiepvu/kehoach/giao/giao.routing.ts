import { ActivatedRouteSnapshot, Route, UrlMatchResult, UrlSegment } from '@angular/router';
import { isEqual } from 'lodash';
import { ApiGiaoDetailsComponent } from './detail/details.component';
import { ApiGiaoEmptyDetailsComponent } from './empty-details/empty-details.component';
import { ApiGiaoListComponent } from './list/list.component';
import { ApiGiaoComponent } from './giao.component';
import { ApiInputDetailResolver, ApiInputListResolver } from './giao.resolvers';


export const ApiInputRunGuardsAndResolvers: (from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot) => boolean = (from: ActivatedRouteSnapshot, to: ActivatedRouteSnapshot) => {

  // If we are navigating from mail to mails, meaning there is an id in
  // from's deepest first child and there isn't one in the to's, we will
  // trigger the resolver

  // Get the current activated route of the 'from'
  let fromCurrentRoute = from;
  while (fromCurrentRoute.firstChild) {
    fromCurrentRoute = fromCurrentRoute.firstChild;
  }

  // Get the current activated route of the 'to'
  let toCurrentRoute = to;
  while (toCurrentRoute.firstChild) {
    toCurrentRoute = toCurrentRoute.firstChild;
  }

  // Trigger the resolver if the condition met
  if (fromCurrentRoute.paramMap.get('id') && !toCurrentRoute.paramMap.get('id')) {
    return true;
  }

  // If the from and to params are equal, don't trigger the resolver
  const fromParams = {};
  const toParams = {};

  from.paramMap.keys.forEach((key) => {
    fromParams[key] = from.paramMap.get(key);
  });

  to.paramMap.keys.forEach((key) => {
    toParams[key] = to.paramMap.get(key);
  });

  if (isEqual(fromParams, toParams)) {
    return false;
  }

  // Trigger the resolver on other cases
  return true;
};
export const ApiInputRouteMatcher: (url: UrlSegment[]) => UrlMatchResult = (url: UrlSegment[]) => {

  // Prepare consumed url and positional parameters
  let consumed = url;
  const posParams = {};
  if (url[0]) {
    consumed = url.slice(0, -1);
  }
  return {
    consumed,
    posParams
  };
};
export const ApiGiaoRoutes: Route[] = [
  {
    path: '',
    component: ApiGiaoComponent,
    children: [
      {
        component: ApiGiaoListComponent,
        matcher: ApiInputRouteMatcher,
        runGuardsAndResolvers: ApiInputRunGuardsAndResolvers,
        resolve: {
          apis: ApiInputListResolver
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ApiGiaoDetailsComponent
          },
          {
            path: ':id',
            runGuardsAndResolvers: 'always',
            component: ApiGiaoDetailsComponent,
            // resolve: {
            //   apiDetail: ApiInputDetailResolver
            // }
          }
        ]
      }
    ]
  }
];
