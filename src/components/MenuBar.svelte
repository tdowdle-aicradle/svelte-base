<script lang="ts">
    import type { MenuBarItem } from '../types/menubar.type';
    
    export let menuItems:Array<MenuBarItem>;
    export let menuOpen:boolean;
    
</script>


<style lang="scss"> 

    @import '../styles/main.scss';

    .menu-bar {
        margin-right: 24px;
        .menu-open {
            margin-right: 40px;
        }

        .menu-items {
            .menu-item {
                align-items: center;
                fill: $si-icon-inactive;
                color: $si-text-inactive;
                .active-mark {
                    min-width: 2rem;
                    img {
                        visibility: hidden;
                    }
                }
                &.active-link {
                    color: $si-text-active;
                    .active-mark {
                        img {
                            visibility: visible;
                        }
                    }
                    .icon * {
                        fill: $si-icon-active;
                    }
                }
            }
        }
    }

</style>


<div
    class="menu-bar"
    class:menu-open="{menuOpen}"
>
    <div class="logo pt-8 pl-8 pb-8 flex">
    <div class="pr-2">
        <img src="./assets/safeXai-logo.svg" />
    </div>
    {#if menuOpen}
        <img src="./assets/safeXai-name.svg" />
    {/if}
    </div>
    <div class="chevron"></div>
    <div class="menu-items flex-col">
        {#each menuItems as menuItem, index}
            <a
                data-to="{menuItem.url}"
                exact-active-class="active-link"
                class="menu-item flex cursor-pointer"
            >
                <div class="active-mark">
                    <img src="./assets/active-state-mark.svg" />
                </div>
                <div class="icon">
                    menuItem.svgComponent
                </div>
                {#if menuOpen}
                    <a class="pl-4">menuItem.name</a>
                {/if}
            </a>
        {/each}
    </div>
</div>
  
  




