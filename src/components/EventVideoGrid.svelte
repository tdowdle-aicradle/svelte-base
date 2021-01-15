<script type="ts">

import { onMount } from 'svelte';
//import ShowDetectionSwitch from "@/assets/show-detection-switch.svg";

export let camera: Object;

let showDetection = true,
    intersectionResolve,
    intersectionPromise = new Promise((intersectionResolve, reject) => {
        intersectionResolve = intersectionResolve;
    });

(async () => {
    await console.log('run this');
/*     await this.$store
        .dispatch(
          "event/retrieveEventIntersection",
          this.$props.camera.intersection_id
        )
        .then(result => {
          this.intersectionResolve(result);
        });   */  
})();


let filterCameras = [];

/*     get activeIntersection() {
      return this.$store.state.event.activeIntersection;
    }
  
    get filterCameras() {
      return this.activeIntersection
        ? this.activeIntersection?.cameras?.filter(
            camera => camera.id !== this.$props.camera.id
          ) || []
        : [];
    } */

    onMount(()=>{
        let Hls = null;
        if (Hls && Hls.isSupported()) {
            // handle event camera
            const video = document.getElementById("event-video");
            const hls = new Hls();
            hls.attachMedia(video);
            hls.loadSource(this.$props.camera.liveSource);
    
            //handle additional intersection cameras
            this.intersectionPromise.then(() => {
            for (const camera of this.activeIntersection.cameras || []) {
                const videoId = `camera-${camera.id}`;
                const video = document.getElementById(videoId);
                const hls = new Hls();
                hls.attachMedia(video);
                console.log(camera.liveSource);
                hls.loadSource(camera.liveSource);
            }
            });
        }
    });


</script>

<style lang="scss">

@import '../styles/main.scss';

.event-video-grid {
  background-color: $si-background-dark;
}

.detection-switch {
  /* Rectangle 1985 */
  width: 50.88px;
  height: 20.58px;
  left: 493.73px;
  top: 134px;

  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
}

.detection-switch-on {
  background: $si-show-detection-switch-active;
}

.detection-switch-off {
  background: $si-show-detection-switch-inactive;
}

.view-live {
  /* Dismiss */
  height: 16px;
  left: 72.5%;
  right: 23.19%;
  top: calc(50% - 16px/2 - 367.34px);

  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  text-align: center;

  color: $si-text-active;
}

.main-video {
  /* Base */

  left: 24.93%;
  right: 23.2%;
  top: 17.01%;
  bottom: 38.86%;

  background: linear-gradient(241.25deg, rgba(29, 33, 45, 0.68) 4.4%, rgba(41, 45, 55, 0.78) 61.77%, rgba(29, 33, 45, 0.76) 119.94%);
  box-shadow: 0px 51px 69px rgba(23, 18, 43, 0.585739);
  backdrop-filter: blur(23px);
  /* Note: backdrop-filter has minimal browser support */
  border-radius: 5px;

}

</style>

<div class="event-video-grid overflow-hidden flex-grow">
    <div class="flex justify-between px-4 py-2">
    <div class="flex px-4 py-2 gap-2">
        <h6
        class="text-gray-500 text-left text-sm font-semibold whitespace-no-wrap"
        >
        SHOW DETECTIONS
        </h6>
        <div>
        <div
            on:click="{()=>{showDetection = !showDetection}}"
            class="detection-switch flex"
            class:justify-end="{showDetection}"
            class:detection-switch-on="{showDetection}"
            class:detection-switch-off="{!showDetection}"
        >
            <img src="./assets/show-detection-switch.svg" />
        </div>
        </div>
    </div>
    <div class="view-live px-4 py-4">
        VIEW LIVE
    </div>
    </div>
    <div class="px-8 py-4">
    <video
        id="event-video"
        controls
        muted
        autoplay
        class="w-full main-video overflow-hidden"
    ></video>
    </div>
    <div class="px-8 py-4">
        {#if filterCameras}
            <div class="flex gap-2 justify-between flex-wrap">
                {#each filterCameras as intersectionCamera}
                    <video
                    id="{'camera-' + intersectionCamera.id}"
                    class="main-video w-64 overflow-hidden"
                    controls
                    muted
                    autoplay
                    />
                {/each}
            </div>
        {/if}
    </div>
</div>
  
  
  