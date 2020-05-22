<template>
  <div aria-expanded="true" data-modal="dialog" class="v--modal-overlay">
    <div class="v--modal-background-click">
      <div class="v--modal-box v--modal vue-dialog">
        <div class="dialog-content">
          <div class="dialog-c-title">Delete this note?</div>
          <div class="dialog-c-text">After deleting the note, you can't restore it.</div>
        </div>
        <div class="vue-dialog-buttons">
          <button @click="$emit('close')" class="vue-dialog-button">Cancel</button>
          <button @click="$emit('deleteNote')" class="vue-dialog-button">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true
    }
  }
}
</script>

<style>
  .v--modal-overlay {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    z-index: 999;
    opacity: 1;
  }
  .v--modal-overlay .v--modal-background-click {
    min-height: 100%;
    width: 100%;
    padding-bottom: 10px;
  }
  .v--modal {
    background-color: white;
    text-align: left;
    border-radius: 3px;
    box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);
    padding: 0;
    margin: 0 auto;
    top: 200px;
    width: 400px;
    height: auto;
  }
  .v--modal-overlay .v--modal-box {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
  .vue-dialog div {
    box-sizing: border-box;
  }
  .vue-dialog .dialog-content {
    flex: 1 0 auto;
    width: 100%;
    padding: 15px;
    font-size: 14px;
  }
  .vue-dialog .dialog-c-title {
    color: red;
    font-weight: 600;
    padding-bottom: 15px;
  }
  .vue-dialog .vue-dialog-buttons {
    display: flex;
    flex: 0 1 auto;
    width: 100%;
    border-top: 1px solid #eee;
  }
  .vue-dialog button {
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .vue-dialog-button {
    flex: 1 1 50%;
    font-size: 12px !important;
    background: transparent;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
    box-sizing: border-box;
    line-height: 40px;
    height: 40px;
    color: inherit;
    font: inherit;
    outline: none;
  }
</style>