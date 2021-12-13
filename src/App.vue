<template>

  <router-view/>
  
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
  },
  components: {
    
  },
})
</script>

<style>
#app {
  width: 100%; height: 100%; position: relative; 
}

*{ margin: 0; padding: 0; box-sizing: border-box; }
html,body{ width: 100%; height: 100%; color: #000;}
a{ text-decoration: none; color: #000;}
ul,li{ list-style: none;}
.dia-wrap {
  width: 750px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dia-dis {
  width: 100%;
  height: auto;
}

.dia-dis .dialog {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 1.1vw;
  font-size: 18px;
  letter-spacing: 1px;
  transition: all 1s;
}
.mt1w {
  margin-top: 1vw;
}
.editbtn {
  width: 20%;
  margin-left: 78%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
