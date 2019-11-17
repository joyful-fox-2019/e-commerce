<template>
  <b-container>
    <b-row>
      
      
        <b-card-group class="mt-3" columns>
          

          

          <b-card img-src="https://66.media.tumblr.com/a065703190ad984d19db0b695de70085/b5c7edb4358aa7e7-13/s540x810/decb5e16ae095f7b853b2c26e37197cb1731c3f7.jpg" img-alt="Image" img-top>
            <p style="font-size: 25px" class="m-0"><b>Death Stranding</b></p>
            <template v-slot:footer>
              <b-button variant="dark" disabled class="btn-sm mr-2">$20</b-button>
              <b-button variant="dark" class="btn-sm mr-2">Add to cart</b-button>
            </template>
          </b-card>

          

          

          <b-card img-src="https://picsum.photos/400/200/?image=41" img-alt="Image" img-top>
            <b-card-text>
              This is a wider card with supporting text below as a natural lead-in to additional content.
              This card has even longer content than the first.
            </b-card-text>
            <template v-slot:footer>
              <small class="text-muted">Footer Text</small>
            </template>
          </b-card>
        </b-card-group>
      

    </b-row>
  </b-container>
</template>

<script>


export default {
  name: 'home',
  components: {
    
  }
}
</script>
