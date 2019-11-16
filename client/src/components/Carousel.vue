<template>
    <div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
                <img class="d-block img-fluid carousel-img" src="https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2019/02/Pokemon-Sword-Shield.jpg" alt="First slide" >
            </div>
            <div class="carousel-item">
                <img class="d-block img-fluid carousel-img" src="https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_TheWorldEndsWithYouFinalRemix_image1600w.jpg" alt="Second slide">
            </div>
            <div class="carousel-item">
                <img class="d-block img-fluid carousel-img" src="https://nintendoeverything.com/wp-content/uploads/monster-hunter-generations-ultimate.jpg" alt="Third slide">
            </div>
            <div class="carousel-item">
                <img class="d-block img-fluid carousel-img" src="https://i1.wp.com/www.nintendo-insider.com/wp-content/uploads/2015/09/animal-crossing-happy-home-designer-review-banner.jpg?fit=1920%2C1080&ssl=1" alt="Fourth slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</template>

<script>
export default {
  name: 'Carousel'

}
</script>

<style scoped>
.carousel-img {
    object-fit: cover;
    height: 350px;
    width: 900px;
}
</style>
