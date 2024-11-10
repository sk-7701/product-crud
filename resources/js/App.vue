<template>
    <div id="app">
      
      <header>
        <nav>
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link>
        </nav>
      </header>
  
      <router-view></router-view>
  
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style scoped>
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  

  </style>
  