import Main from '@/components/Main';
import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);
const routes = [
	{
		path: "/",
		component: Main,
		children: [
			{
				path: "addresses",
				components: {
					contentView: () => import('@/components/Addresses')
				}
			}, {
				path: "menu",
				components: {
					contentView: () => import('@/components/Menu')
				}
			}, {
				path: "order",
				components: {
					contentView: () => import('@/components/Order')
				}
			}, {
				path: "constructor",
				components: {
					contentView: () => import('@/components/Constructor')
				}
			}, {
				path: "login",
				components: {
					contentView: () => import('@/components/LoginPage')
				}
			}, {
				path: "registration",
				components: {
					contentView: () => import('@/components/RegistrationPage')
				}
			}, {	
				path: "profile",
				components: {
					contentView: () => import('@/components/Profile')
				}
			}, {	
				path: "favorites",
				components: {
					contentView: () => import('@/components/Favorites')
				}
			}, {
				path: "barista",
				components: {
					contentView: () => import('@/components/Barista')
				}
			}, {
				path: "admin",
				components: {
					contentView: () => import('@/components/Admin')
				}
			}, {
				path: "",
				redirect: "addresses"
			},
		]
	}
];

const router = new Router({
	routes: routes,
	mode: "history"
});

export default router;

