<script setup>
defineEmits(['click']);
</script>

<template>
  <button class="btn-primario" @click="$emit('click',$event)">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-primario {
  background-color: #00875a;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.2s ease;
}

.btn-primario:hover {
  background-color: #006c48;
}
</style>