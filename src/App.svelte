<script lang="ts">
    import Tailwind from "./Tailwind.svelte"
</script>

<style lang="scss">
    main {
        h1 {
            font-size: 22rem;
        }
    }
</style>

<Tailwind />
<main>
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
    <h1 class="text-red-400">The rest of our app will be here</h1>
</main>