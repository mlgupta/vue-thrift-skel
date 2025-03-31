<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/thrift-test">Thrift Test</router-link>
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.navbar {
  padding: 20px 0;
  text-align: center;
}

.navbar a {
  color: #2c3e50;
  text-decoration: none;
  padding: 0 10px;
}

.navbar a.router-link-active {
  color: #42b983;
}

main {
  margin-top: 20px;
}
</style> 