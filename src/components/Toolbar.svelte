<script type="ts">

    import { user } from '../stores/user';

    let showStats = true,
        userName = '';

const unsubscribe = user.subscribe(user => {
    if(user){
        userName = user.name || user["cognito:username"];
    }
});


/*     import NotificationBell from "@/assets/notifcation-bell.svg";
    import SearchIcon from "@/assets/search-icon.svg";
    import DownArrow from "@/assets/down-arrow.svg"; */
    
</script>


<style lang="scss">
    @import '../styles/main.scss';

.alert-icon {
  width: 48px;
  height: 28px;
  left: 1242px;
  top: 41px;
  padding: 5px;

  background: linear-gradient(180deg, $si-icon-gradient 0%, $si-icon-gradient 100%);
  mix-blend-mode: normal;
  box-shadow: 0px 0px 20px rgba(83, 185, 234, 0.4);
  border-radius: 14px;
}

.chevron-down {
  transform: rotate(180deg);
}

</style>

    <div class="flex justify-center items-center inset-y-0 right-0">
      <div class="flex px-4 pt-4 mg-2 justify-center w-auto">
        <search-icon class="mx-2 my-1" />
        <div class="alert-icon flex mx-2">
          <div class="px-1 flex justify-between">
            <notification-bell class="mt-1 mx-1" />
            <div class="px-1"><p class="text-white text-xs">1</p></div>
          </div>
        </div>
        <p class="text-white text-sm text-right font-semibold py-1">
          { userName }
        </p>
        <down-arrow
          class:chevron-down="{showStats}"
          class="mt-3 ml-2"
          on:click="{()=>{showStats = !showStats}}"
        />
      </div>
    </div>
  
 
  
  
  