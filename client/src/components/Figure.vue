<template>
  <div style="border-radius:0px !important;" class="addproduct productpic producttext border-0 card bg-dark text-white">
    <img :src="pic" class="card-img " alt="...">
    <div class="card-img-overlay">
      <div class="row no-gutters">
        <div  style="margin-top:22vh; height:15vh;" class="py-3 text-center container">
          <p class="categorynametxt">{{text}}</P>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Figure",
  props : ["pic","text"]
};
</script>

<style>

#addproduct {
  width : 50%;
  border-style : 1px solid grey !important;
  border-radius : 30px;
}

.productpic:hover button{
  background-color: rgb(214, 208, 208);
}


.productpic:hover {
  transition: 0.4s all;
  opacity: 0.9;
}


.producttext {
    list-style: none;
    display: inline-block;
}

.producttext {
    text-decoration: none;
    position: relative;
    font-size: 12px;
    font-weight: 500;
    overflow: hidden;
    transition: 0.4s all;
}

.producttext:before {
    content: '';
    width: 60px;
    position: absolute;
    border-bottom: 2px solid #313131;
    bottom: 0;
    right: 350px;
    transition: 0.4s all;
}

.producttext:hover:before {
    right: 0;
}

.categorynametxt {
  font-family: "Vollkorn", serif;
  font-weight: 600;
  font-size: 4.3rem;
  font-style: italic;
}
</style>
