<template>
  <div id="leftbar">
      <p class="mt-2"><b>BROWSE CATEGORIES</b></p>
      <a href="#"><div>Action</div></a>
      <a href="#"><div>Adventure</div></a>
      <a href="#"><div>Casual</div></a>
      <a href="#"><div>Indie</div></a>
      <a href="#"><div>Massively Multiplayer</div></a>
      <a href="#"><div>Racing</div></a>
      <a href="#"><div>RPG</div></a>
      <a href="#"><div>Simulation</div></a>
      <a href="#"><div>Sports</div></a>
      <a href="#"><div>Strategy</div></a>
  </div>
</template>

<script>
export default {
  name: 'Leftbar'
}
</script>

<style scoped>
#leftbar p {
    text-align: left;
    font-size: 14px;
    margin-left: 0.5em;
}

#leftbar a {
    text-align: left;
    font-size: 15px;
    color: rgba(0,0,0,.65);
    text-decoration: none;
}

#leftbar a :hover {
    text-align: left;
    font-size: 15px;
    color:black;
    text-decoration: none;
}

#leftbar a div {
    margin-bottom: 0.5em;
    margin-left: 0.5em;
}
</style>
