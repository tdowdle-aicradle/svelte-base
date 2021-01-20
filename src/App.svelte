<script lang="ts">
	import Tailwind from "./Tailwind.svelte"
	import SideBar from './components/SideBar.svelte';
	import MenuBar from './components/MenuBar.svelte';

	import type { MenuBarItem } from './types/menubar.type';

	import Router from 'svelte-spa-router';
	import { wrap } from 'svelte-spa-router/wrap';

	import Dashboard from './routes/Dashboard.svelte';
	import Event from './routes/Event.svelte';
	import Settings from './routes/Settings.svelte';
	import NotFound from './routes/NotFound.svelte';

	import { getUser, logout } from './stores/user';

	import ApiService from "./api/api";

	ApiService.init();

	const routes = {
		// Exact path
		'/': Dashboard,
		'/settings': Settings,
		// Using named parameters
		'/event/:id': wrap({
			component:Event,
			conditions: [
				(detail) => {
					return getUser().then(session => {
						console.log(session);
						console.log(detail);
        				return true;
					})
					.catch(() => {
						console.log("Login failed");
						return false;
					});
				}
			]
			
		}),
		'/logout': wrap({
			component: Dashboard,
			conditions: [
				() => {
					return logout().then(logoutUrl => {
						localStorage.removeItem("accessToken");
						localStorage.removeItem("refreshToken");
						localStorage.removeItem("routeCache");
						window.location.href = logoutUrl;
        				return false;
					})
					.catch((err) => {
						console.log(err);
						console.log("Logout failed");
						debugger;
						return false;
					});
				}
			]
		}),
		// Catch-all
		// This is optional, but if present it must be the last
		'*': NotFound,
	}

	let dashboardSvg = "./assets/dashboard.svg";
	let notesSvg = "./assets/notes.svg";
	let settingsSvg = "./assets/settings.svg";
	let logoutSvg = "./assets/logout.svg";

	let menuItems: Array<MenuBarItem> = [
      {
        name: "Dashboard",
        url: "/",
        svgComponent: dashboardSvg
      },
      {
        name: "Accident Details",
        url: `/event/activeEventId`,
        svgComponent: notesSvg
      },
      {
        name: "Settings",
        url: "/settings",
        svgComponent: settingsSvg
      },
      {
        name: "Logout",
        url: "/logout",
        svgComponent: logoutSvg
      }
	];
	
	let sideBarOpen = false;

	function toggleSideBar(event) {
		sideBarOpen = !sideBarOpen;
	}

</script>

<style lang="scss">
    main {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		.app-window {
			@apply pl-8;
			background: #13131A;
			color: #6b6b6b;
		}
	}
	
</style>

<Tailwind />
<main>
	<div class="app__layout flex min-h-screen">
		<div class="app__menu">
			<SideBar
				on:sideBarClose={toggleSideBar}
				on:sideBarOpen={toggleSideBar}
				isOpen="{sideBarOpen}"
				pushContent="{true}"
				rightHand="{false}"
			>

				<!-- Do we need two slots here? -->

				<div slot="opened-slot">
					<MenuBar menuOpen="{sideBarOpen}" menuItems="{menuItems}"></MenuBar>
				</div>

				<div slot="closed-slot">
					<MenuBar menuOpen="{sideBarOpen}" menuItems="{menuItems}"></MenuBar>
				</div>

			</SideBar>	
		</div>	
		<div class="flex-grow app-window">
			<Router {routes}/>
		</div>
	</div>	
</main>
