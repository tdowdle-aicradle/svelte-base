<script lang="ts">
	import Tailwind from "./Tailwind.svelte"
	import SideBar from './components/SideBar.svelte';
	import MenuBar from './components/MenuBar.svelte';

	import type { MenuBarItem } from './types/menubar.type';

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
        h1 {
            font-size: 22rem;
		}
		.app-window {
			@apply pl-8;
			background: #13131A;
			color: #6b6b6b;
		}
	}
	
</style>

<Tailwind />
<main>
	<div class="app__layout flex">
		<div class="app__menu">
			<SideBar
				on:sideBarClose={toggleSideBar}
				on:sideBarOpen={toggleSideBar}
				isOpen="{sideBarOpen}"
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
			<h1 class="text-red-400">The rest of our app will be here</h1>
		</div>
	</div>	
<!-- 	<SideBar
		:pushContent="true"
		:rightHand="false"
		:isOpen="sideBarOpen"
		@sideBarClose="toggleSideBar()"
		@sideBarOpen="toggleSideBar()"
	>
		<template v-slot:opened-slot>
		<MenuBar :isOpen="sideBarOpen" :menuItems="menuItems"></MenuBar>
		</template>
		<template v-slot:closed-slot>
		<MenuBar :isOpen="sideBarOpen" :menuItems="menuItems"></MenuBar>
		</template>
	</SideBar> -->
</main>