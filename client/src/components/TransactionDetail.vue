<template>
  <div class="q-pa-md" style="width: 100%">
     <q-card bordered class="my-cardss">
       <div></div>
       <div></div>
      <q-card-section>
        <div class="text-h6">Id: {{thisTrans._id}}</div>
        <div class="text-subtitle2">{{thisTrans.createdAt.slice(0,10)}}</div>
      </q-card-section>
      <q-card-section>
        Product: 
        <ul>
          <li v-for="product in thisTrans.cart" :key="product.i">{{product.product.name}} (@ Rp. {{product.product.price}} ), {{product.qty}}pcs</li>
        </ul>
        Total price: Rp. {{ totalPrice }}
      </q-card-section>
    </q-card>


        <div class="text-h6">Status</div>

    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Waiting Confirmation"
        icon="settings"
        :done="step > 1"
      >
        Waiting for admin to approve your payment
      </q-step>

      <q-step
        :name="2"
        title="Paid"
        icon="create_new_folder"
        :done="step > 2"
      >
        An ad group contains one or more ads which target a shared set of keywords.
      </q-step>

      <q-step
        :name="3"
        title="On Delivered"
        icon="assignment"
        :done="step > 3"
      >
        This step won't show up because it is disabled.
      </q-step>

      <q-step
        :name="4"
        title="Done"
        icon="add_comment"
      >
        Your transactions is finished
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
export default {
  props: ['thisTrans'],
  data(){
    return{
        step: 1
    }
  },
  computed : {
    totalPrice(){
      let total = 0
      this.thisTrans.cart.forEach(element => {
        total += (element.product.price * element.qty)
      });
      return total
    }
  }
}
</script>

<style>

</style>