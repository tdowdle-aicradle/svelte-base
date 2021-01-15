<script type="ts">
    export let eventTime: String;
    export let location: String; 
    export let cadId: Number;
</script>

<div class="event-header">
    <div class="px-4 pt-4 mg-2">
    <h1 class="text-white text-3xl text-left font-semibold pt-2">
        Dashboard Idea 19:sidebar
    </h1>
    </div>
    <div class="mg-2">
    <h1
        id="cadIdentificationNum"
        class="text-gray-500 text-left text-sm font-semibold px-4 pb-2"
    >
        { cadId || "N/A" } - { location } - { eventTime }
    </h1>
    </div>
</div>
  