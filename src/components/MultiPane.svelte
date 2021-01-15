
  <script type="ts">
    
      let isResizing = false;
    
      let onMouseDown = function ({ target: resizer, pageX: initialPageX, touches: touchEvents }) {
        if (
          resizer.parentElement.classList.length !== 0 &&
          (resizer.parentElement.className.match("multipane-resizer") ||
            resizer.parentElement.parentElement.parentElement.parentElement.className.match(
              "multipane-resizer"
            ))
        ) {
          /* eslint-disable  @typescript-eslint/no-this-alias */
          const self = this;
          const { $el: container } = this;
          if (initialPageX === undefined) {
            initialPageX = touchEvents[0].pageX;
          }
    
          const videoPane = document.getElementById("event-video-grid");
          const sideBarPane = document.getElementById("side-bar-right");
          const { offsetWidth: initialPaneWidth } = videoPane;
    
          const usePercentage = !!(videoPane.style.width + "").match("%");
          const containerWidth = container.clientWidth;
          const resize = (initialSize, offset = 0) => {
            const paneWidth = initialSize + offset;
            const videoSize = usePercentage
              ? (paneWidth / containerWidth) * 100 + "%"
              : paneWidth + "px";
            videoPane.innerHeight = videoSize;
            return (videoPane.style.width = videoSize);
          };
    
          // This adds is-resizing class to container
          self.isResizing = true;
    
          // Resize once to get current computed size
          let size = resize();
    
          // Trigger paneResizeStart event
          self.$emit("paneResizeStart", videoPane, resizer, size);
          self.$emit(
            "paneResizeStart",
            sideBarPane,
            resizer,
            containerWidth - Number(size.replace("px", "")) + "px"
          );
    
          const onMouseMove = function({ pageX: pageX, touches: touchEvents }) {
            if (pageX === undefined) {
              pageX = touchEvents[0].pageX;
            }
            size = resize(initialPaneWidth, pageX - initialPageX);
            self.$emit("paneResize", videoPane, resizer, size);
            const sideBarSize = usePercentage
              ? 100 - Number(size.replace("%", "")) + "%"
              : containerWidth - Number(size.replace("px", "")) + "px";
            sideBarPane.innerHeight = sideBarSize;
            sideBarPane.style.width = sideBarSize;
            self.$emit(
              "paneResize",
              sideBarPane,
              resizer,
              containerWidth - Number(size.replace("px", "")) + "px"
            );
          };
    
          const onMouseUp = function() {
            // Run resize one more time to set computed width/height.
            //size = resize(pane.clientWidth);
    
            // This removes is-resizing class to container
            self.isResizing = false;
    
            removeEventListener("mousemove", onMouseMove);
            removeEventListener("mouseup", onMouseUp);
            removeEventListener("touchmove", onMouseMove);
            removeEventListener("touchend", onMouseUp);
    
            self.$emit("paneResizeStop", videoPane, resizer, size);
            self.$emit(
              "paneResizeStop",
              sideBarPane,
              resizer,
              containerWidth - Number(size.replace("px", "")) + "px"
            );
          };
    
          addEventListener("mousemove", onMouseMove);
          addEventListener("mouseup", onMouseUp);
          addEventListener("touchmove", onMouseMove);
          addEventListener("touchend", onMouseUp);
        }
      }
    </script>


    <style lang="scss">
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

        .layout-v > .multipane-resizer {
        width: 10px;
        height: 100%;
        margin-left: -10px;
        left: 5px;
        cursor: col-resize;
        }
    </style>


    <div
      class="multipane layout-v"
      on:mousedown="{onMouseDown}"
      on:touchstart="{onMouseDown}"
    >
      <slot></slot>
    </div>
  

  
  