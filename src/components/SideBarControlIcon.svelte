<script lang="ts">
    export let isOpen;
    export let rightHandControl;

    let openSVGColor = "#53B9EA",
        SVGSize: string = "32px";
</script>

<style lang="scss">
    @import "../styles/corelib.scss";
    
    .side-bar__control {
      position: absolute;
      top: 50px;
      background: $sidebar-control-background;
      border-radius: 25px;
      box-shadow: $sidebar-control-box-shadow;
      cursor: pointer;
      height: 50px;
      width: 50px;
      &--right {
        left: -25px;
      }
      &--left {
        right: -25px;
      }
    }
    .side-bar__control__icon {
      position: absolute;
      top: 8px;
      &--right {
        left: 10px;
      }
      &--left {
        left: 8px;
      }
    }
</style>

    <div
      class="side-bar__control"
      class:side-bar__control--right="{rightHandControl}"
      class:side-bar__control--left="{!rightHandControl}"
    >
    {#if rightHandControl}
        {#if isOpen}
            <svg
            class="side-bar__control__icon side-bar__control__icon--right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="{openSVGColor}"
            width="{SVGSize}"
            height="{SVGSize}"
            >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
        {:else}
            <svg
            class="side-bar__control__icon side-bar__control__icon--left"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="{openSVGColor}"
            width="{SVGSize}"
            height="{SVGSize}"
            >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
        {/if}
    {:else}
        {#if isOpen}
            <svg
            class="side-bar__control__icon side-bar__control__icon--left"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="{openSVGColor}"
            width="{SVGSize}"
            height="{SVGSize}"
            >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
        {:else}
            <svg
            class="side-bar__control__icon side-bar__control__icon--right"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="{openSVGColor}"
            width="{SVGSize}"
            height="{SVGSize}"
            >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
        {/if}
      {/if}
    </div>
  

  

  