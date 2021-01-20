<script type="ts">
    import EventHeader from '../components/EventHeader.svelte';
    import EventVideoGrid from '../components/EventVideoGrid.svelte';
    import SideBarRight from '../components/SideBarRight.svelte';
    import MultiPane from '../components/MultiPane.svelte';
    import Toolbar from '../components/Toolbar.svelte';

    import { retrieveEvent, activeEventStore } from '../stores/event';

    let eventTime, eventLocation, activeEvent;

    function getEventTime() {
        const date = new Date();
        const localOffset = date.getTimezoneOffset() * 60000;
        date.setTime(parseInt(activeEvent.time_from) + localOffset);
        return date.toLocaleString();
    }

    function getEventLocation() {
        const location = activeEvent?.additional_info?.location;
        return location == undefined ? "Unknown" : location;
    }

    function setupEventStore() {
        let hash = window.location.hash;
        hash = hash.substring(hash.lastIndexOf('/')+1)
        retrieveEvent(hash);
    }

    activeEventStore.subscribe((event)=>{
        if(!event.init){
            activeEvent = event;
            eventTime = getEventTime();
            eventLocation = getEventLocation();
        }
    });

    setupEventStore();

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
                    <Toolbar />
                </div>
            </div>
            <MultiPane>
                {#if activeEvent.camera}
                    <EventVideoGrid
                        camera="{activeEvent.camera}"
                    ></EventVideoGrid>
                {/if}
                <SideBarRight
                    additionalInfo="{activeEvent.additional_info}"
                ></SideBarRight>
            </MultiPane>
        </div>
        </div>
    </div>
{/if}


