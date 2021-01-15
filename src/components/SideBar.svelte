<script lang="ts">

    import { createEventDispatcher } from 'svelte';
    import SideBarControlIcon from './SideBarControlIcon.svelte';

    export let isOpen = false;
    export let rightHand = true;
    export let pushContent = false;
    export let background = "linear-gradient(180deg, #1b1a27 0%, #20222d 57.44%, #2c2e3c 100%)";

    const dispatch = createEventDispatcher();

    let styleObject = {
        position: "fixed",
        background: background
    }

    if (pushContent) {
      styleObject.position = "relative";
    }

    let customStyles = '';

    $: Object.entries(styleObject).forEach(([key, value]) => {
		  customStyles += `${key}: ${value};`
	  })

    function emitSideBarClose() {
		dispatch('sideBarClose');
    }
    function emitSideBarOpen() {
        dispatch('sideBarOpen');
    }
</script>

<style lang="scss">
    /* styles go here */
.side-bar {
  &__right {
    &--closed {
      min-width: 25px;
    }
  }
  &__left {
    &--closed {
      min-width: 25px;
    }
  }
}
</style>


{#if isOpen}
    <div
        style="{customStyles}"
        class="side-bar h-full shadow"
        class:side-bar__right="{rightHand}"
        class:right-0="{rightHand}"
        class:side-bar__left="{!rightHand}"
        class:left-0="{!rightHand}"
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
        style="{customStyles}"
        class="side-bar h-full shadow"
        class:side-bar__right="{rightHand}"
        class:right-0="{rightHand}"
        class:side-bar__right--closed="{rightHand}"
        class:side-bar__left="{!rightHand}"
        class:left-0="{!rightHand}"
        class:side-bar__left--closed="{!rightHand}"
    >
    <div id="sideBarOpenControl" on:click="{emitSideBarOpen}">
        <SideBarControlIcon
        rightHandControl="{rightHand}"
        isOpen="{isOpen}"
      ></SideBarControlIcon>
        </div>
        <div>
        <slot name="closed-slot"></slot>
        </div>
    </div>
{/if}
