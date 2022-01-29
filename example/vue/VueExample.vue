<script setup>
import { onSubmit } from 'web-form-helper';
const loginUser = onSubmit((obj) => {
  console.log(obj)
})
</script>

<template>
  <form v-on:submit="loginUser">
    <input name="test1" />
    <input name="test2" />
    <input name="test3.test4" />
    <input name="test4" />
    <button type="submit">submit</button>
  </form>
</template>