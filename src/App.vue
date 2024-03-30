<template>
  <div class="a" style="position: relative;background-color: brown;">
    <p>on Moving with Mouse:{{ dragging }}
    <div id='movingState' :style="lightStyle"></div>
    </p>
    <p>initialX:{{ initialX }} initialY:{{ initialY }} offsetX:{{ offsetX }} offsetY:{{ offsetY }} eventX{{ eventX }}
      eventY{{ eventY }}</p>
  </div>
  <div>

    <div style="background-color: aqua;width: 200px;float: left;max-height: 500px;">
      <Components></Components>
    </div>
    <div style="background-color: blue;width: 1000px;height: 625px;float: left;overflow: hidden;">
      <!-- <testMain :sendState="getState"></testMain> -->
      <suoFang :sendState="getState"></suoFang>
      <Location class="footer" style="background-color: pink;"></Location>
    </div>
    <div style="background-color: bisque;width: 200px;float: right;">

      <Attributes></Attributes>
    </div>

  </div>

</template>

<script lang="ts">
import Components from './Components.vue';
import Main from './Main.vue';
import Attributes from './Attributes.vue';
import testMain from './testMain.vue';
import { ref, reactive, computed, type StyleValue } from "vue"
import Location from './Location.vue';
import suoFang from './suoFang.vue';
export default {
  name: 'App',
  components: {
    Components,
    Main,
    Attributes,
    Location,
    testMain,
    suoFang
  }, setup() {
    const eventX = ref(0);
    const eventY = ref(0);
    const initialX = ref(0);
    const initialY = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const dragging = ref(false);
    const lightColor = ref('red');
    const lightStyle = computed<StyleValue>(
      () => ({
        display: 'inline-block',
        width: '10px',
        height: '10px',
        backgroundColor: lightColor.value
      }) as StyleValue);


    function getState(value: boolean, initialXValue: number, initialYValue: number, offsetXValue: number, offsetYValue: number, x: number, y: number) {
      dragging.value = value;
      initialX.value = initialXValue;
      initialY.value = initialYValue;
      offsetX.value = offsetXValue;
      offsetY.value = offsetYValue;
      eventX.value = x;
      eventY.value = y;
      if (value) lightColor.value = 'green'
      else lightColor.value = 'red'
    }

    return { dragging, getState, initialX, initialY, offsetX, offsetY, lightStyle, eventX, eventY }
  }
}
</script>

<style scoped>
.footer {
  position: absolute;
  /* bottom: 0; */
  top: 625px;
  /* 将 footer 置于底部 */
}
</style>