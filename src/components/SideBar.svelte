<script>
    export let isOpen = false;
    export let rightHand = true;
    export let background = "linear-gradient(180deg, #1b1a27 0%, #20222d 57.44%, #2c2e3c 100%)";

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let styleObject = {
        position: "fixed",
        background: background
    }

    function emitSideBarClose() {
		dispatch('sideBarClose');
    }
    function emitSideBarOpen() {
        dispatch('sideBarOpen');
    }
</script>

<style>
	/* styles go here */
</style>


{#if isOpen}
    <div
        style="{styleObject}"
        class="side-bar h-full min-h-screen shadow"
        :class="{rightHand ? 'side-bar__right right-0' : 'side-bar__left left-0'}"
    >
        <div id="sideBarCloseControl" on:click="{emitSideBarClose}">
            <SideBarControlIcon
                rightHandControl="{rightHand}"
                isOpen="{isOpen}"
            ></SideBarControlIcon>
        </div>
        <div>
            <slot name="opened-slot"></slot>
        </div>
    </div>
{:else}
    <div
        style="{styleObject}"
        class="side-bar h-full min-h-screen shadow"
        :class="{rightHand ? 'right-0 side-bar__right side-bar__right--closed' : 'left-0 side-bar__left side-bar__left--closed'}"
    >
    <div id="sideBarOpenControl" on:click="{emitSideBarOpen}">
        <SideBarControlIcon
            rightHandControl="rightHand"
            isOpen="isOpen"
        ></SideBarControlIcon>
        </div>
        <div>
        <slot name="closed-slot"></slot>
        </div>
    </div>
{/if}
