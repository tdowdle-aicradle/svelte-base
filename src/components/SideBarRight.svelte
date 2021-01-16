


  <script type="ts">
    import MultipaneResizer from "./MultiPaneResizer.svelte";

    export let additionalInfo:Object;

    additionalInfo = {
        vehicles: []
    };

    let showStats = true,
        mutateDiv = false,
        color = additionalInfo.severity === "Severe";
    
    function activateResize() {
        this.mutateDiv = true;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

</script>


<style lang="scss">
@import '../styles/main.scss';

.side-bar-right {
  background: linear-gradient(180deg, #1b1a27 0%, #20222d 57.44%, #2c2e3c 100%);
}
.stat-icon {
  width: 38px;
  height: 35px;
  padding-right: .5rem;
  padding-bottom: .5rem;

  background: $si-icon-background;
  border-radius: 5px;
}

.h-custom {
  height: 32rem;
}

.pl-custom-fire {
  padding-left: 0.8rem;
}

.pl-custom-eject {
  padding-left: 0.6rem;
}

.chevron-down {
  transform: rotate(180deg);
}

.multipane {
  display: flex;
  &.layout-h {
    flex-direction: column;
  }
  &.layout-v {
    flex-direction: row;
  }
}

.multipane > div {
  position: relative;
  z-index: 1;
}

.multipane-resizer {
  display: flex;
  position: relative;
  z-index: 2;
}

.resizer-img {
    user-drag: none; 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
.layout-v > .multipane-resizer {
  width: 10px;
  height: 100%;
  margin-left: -10px;
  left: 5px;
  cursor: col-resize;
}

</style>
    <div
      id="side-bar-right"
      class="flex menu-bar pt-2 side-bar-right overflow-hidden w-1/3"
    >
      <div class="flex h-full">
        <div
          class="flex flex-col justify-end h-custom"
          on:mousedown="{activateResize}"
        >
          <MultipaneResizer>
            <img class="resizer-img" src="./assets/pane-handle.svg" />
          </MultipaneResizer>
        </div>
        {#if additionalInfo}
            <div class="flex flex-col justify-start">
                <div class="px-4 pt-4 mg-2 dashboard menu-item flex justify-between flex-wrap">
                    <h6
                    class="flex text-gray-500 text-left text-sm font-semibold pl-4 py-2"
                    >
                    Severity rating
                    </h6>
                    <img src="./assets/edit-icon.svg" class="flex mt-4 ml-4" />
                    <img src="./assets/add-icon.svg" class="flex mt-4 ml-4" />
                </div>
                <div class="flex px-4 mg-2">
                    <h1
                    class="text-left font-semibold text-xl px-4"
                    class:text-red-700="{color}"
                    class:text-green-700="{!color}"
                    >
                    { additionalInfo.severity }
                    </h1>
                </div>
                <div class="flex">
                    <div>
                        <div class="flex justify-between px-4 pt-4 mg-2 flex-wrap">
                            <h6 class="text-gray-500 text-left text-base font-semibold px-4">
                            Applicable Crash Stats
                            </h6>
                            <img src="./assets/chevron-right.svg" 
                            class="mx-3 my-2"
                            class:chevron-down="{showStats}"
                            on:click="{()=>{showStats = !showStats}}"
                            />
                        </div>
                        {#if showStats}
                            <div>
                                <div class="flex justify-start px-4 pt-4 mg-2 flex-wrap">
                                    <div>
                                        <div class="px-4 py-1">
                                            <img src="./assets/point-of-impact.svg" class="stat-icon pt-3 pl-2" />
                                        </div>
                                    </div>
                                    <div class="py-1">
                                        <h6
                                        class="text-gray-500 text-left text-sm font-semibold px-4"
                                        >
                                        Point of Impact
                                        </h6>
                                        <h6 class="text-white text-left text-xs font-semibold px-4">
                                        { additionalInfo.pointOfImpact }
                                        </h6>
                                    </div>
                                </div>
                                <div class="flex justify-start px-4 pt-4 mg-2 flex-wrap">
                                    <div class="px-4 py-1">
                                        <img src="./assets/number-of-vehicle.svg" class="stat-icon pt-3 pl-2" />
                                    </div>
                                    <div class="py-1">
                                        <h6
                                        class="text-gray-500 text-left text-sm font-semibold px-4"
                                        >
                                        Number of Vehicles
                                        </h6>
                                        <h6 class="text-white text-left text-xs font-semibold px-4">
                                        { additionalInfo.vehicles.length }
                                        </h6>
                                    </div>
                                </div>
                                <div class="flex justify-start px-4 pt-4 mg-2 flex-wrap">
                                    <div class="px-4 py-1">
                                        <img src="./assets/avg-mph.svg" class="stat-icon pt-2 pl-2" />
                                    </div>
                                    <div class="py-1">
                                        <h6
                                        class="text-gray-500 text-left text-sm font-semibold px-4"
                                        >
                                        Avg MPH
                                        </h6>
                                        {#each additionalInfo.vehicles as vehicle, i}
                                            <div>
                                                <h6 class="text-white text-left text-xs font-semibold px-4">
                                                    {capitalizeFirstLetter(vehicle.color) }
                                                    {capitalizeFirstLetter(vehicle.type) } -
                                                    {vehicle.speed }MPH
                                                </h6>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                                <div class="flex justify-start px-4 pt-4 mg-2 flex-wrap">
                                    <div class="px-4 py-1">
                                        <img src="./assets/fire-present.svg" class="stat-icon pt-2 pl-custom-fire" />
                                    </div>
                                    <div class="py-1">
                                        <h6
                                        class="text-gray-500 text-left text-sm font-semibold px-4"
                                        >
                                        Fire Present
                                        </h6>
                                        <h6 class="text-white text-left text-xs font-semibold px-4">
                                        { additionalInfo.fire ? "Yes" : "No" }
                                        </h6>
                                    </div>
                                </div>
                                <div class="flex justify-start px-4 pt-4 mg-2 flex-wrap">
                                    <div class="px-4 py-1">
                                        <img src="./assets/ejected-persons.svg" class="stat-icon pt-3 pl-custom-eject" />
                                    </div>
                                    <div class="py-1">
                                        <h6
                                        class="text-gray-500 text-left text-sm font-semibold px-4"
                                        >
                                        Ejected Persons
                                        </h6>
                                        <h6 class="text-white text-left text-xs font-semibold px-4">
                                        { additionalInfo.ejectedPersons }
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
      </div>
    </div>
  
  
  