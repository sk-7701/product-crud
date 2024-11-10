<template>
    <div>
      <header>
        <nav>
          <router-link to="/home">Home</router-link> |
          <router-link to="/register">Register</router-link>
      
        </nav>
      </header>
      <router-view></router-view>
    </div>
  </template>

  <style scoped>
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  

  </style>
  