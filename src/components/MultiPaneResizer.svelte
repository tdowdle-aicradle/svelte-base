
<style lang="scss">
.multipane-resizer {
  position: relative;
  z-index: 2;
  &:hover { cursor: col-resize; }
}

.layout-v > .multipane-resizer {
  width: 10px;
  height: 100%;
  margin-left: -10px;
  left: 5px;
  cursor: col-resize;
}

</style>


<div class="multipane-resizer">
    <slot></slot>
</div>
  
  