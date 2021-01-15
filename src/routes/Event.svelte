<script type="ts">
    import EventHeader from '../components/EventHeader.svelte';
    import EventVideoGrid from '../components/EventVideoGrid.svelte';

    let activeEvent = {
        additionalInfo: {},
        time_from: 1610732923435,
        camera: {}
    } as any,
    eventTime = getEventTime(),
    eventLocation = getEventLocation();

    function getEventTime() {
        const date = new Date();
        const localOffset = date.getTimezoneOffset() * 60000;
        date.setTime(parseInt(activeEvent.time_from) + localOffset);
        return date.toLocaleString();
    }

    function getEventLocation() {
        const location = activeEvent?.additionalInfo?.location;
        return location == undefined ? "Unknown" : location;
    }

</script>
{#if activeEvent}
    <div class="text-center h-full">
        {#if activeEvent.error}
            <div id="onResponseError" class="event-view">
            Error: { activeEvent.statusText + ", " + activeEvent.data }
            </div>
        {/if}
        <div id="onResponseSuccess" v-else class="event-view flex h-full">
        <div class="w-full">
            <div class="flex-col justify-between">
                <div class="flex justify-between event-header">
                    <EventHeader
                    eventTime="{eventTime}"
                    cadId="{activeEvent.cad_id}"
                    location="{eventLocation}"
                    ></EventHeader>
                    <tool-bar class="inset-y-0 right-0"></tool-bar>
                </div>
            </div>
            <multi-pane>
                {#if activeEvent.camera}
                    <EventVideoGrid
                        camera="{activeEvent.camera}"
                    ></EventVideoGrid>
                {/if}
                <side-bar-right
                    id="side-bar-right"
                    additionalInfo="{activeEvent.additionalInfo}"
                ></side-bar-right>
            </multi-pane>
        </div>
        </div>
    </div>
{/if}


