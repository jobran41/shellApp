import React from 'react';
import { Switch, Redirect,withRouter ,Route} from 'react-router-dom';


import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  CreateMachine as CreateMachineView,
  BackupMachine as BackupMachineView,
  RestaurationMachine as RestaurationMachineView,
} from './views';

const authService = {
	isAuthenticated() {
		const tok = localStorage ? localStorage : null;
		if (tok.length !== 0) {
			return true;
		}
		return false;
	}
};

const Routes = () => {

  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
{/*       <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      /> */}
      <PrivateRoute         
      component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        />


{/*       <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      /> */}
            <RouteWithLayout
        component={CreateMachineView}
        exact
        layout={MainLayout}
        path="/create-machine"
      />
            <RouteWithLayout
        component={BackupMachineView}
        exact
        layout={MainLayout}
        path="/backup-machine"
      />
            <RouteWithLayout
        component={RestaurationMachineView}
        exact
        layout={MainLayout}
        path="/restoration-machine"
      />


      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};
const PrivateRoute = ({layout: Layout, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authService.isAuthenticated() ? (
        <Layout>
            <Component {...props} />
        </Layout>
				
			) : (
				<Redirect
					to={{
						pathname: "/",
						state: { target: props.location }
					}}
				/>
			)}
	/>
);
export default withRouter(Routes);
