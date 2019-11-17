<template>
  <div class="q-pa-md" style="width: 100%">
     <q-card bordered class="my-cardss">
      <q-card-section>
        <div class="text-h6">Id: {{thisTrans._id}}</div>
        <div v-if="thisTrans.createdAt">
          <div class="text-subtitle2">{{thisTrans.createdAt.slice(0,10)}}</div>
        </div>
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
        :done="metaStep > 1"
      >
        <div v-if="!user.admin">
          Waiting for admin to approve your payment
        </div>
        <div v-if="user.admin">
          Check your balance, customer waiting for your approval..
        </div>
      </q-step>

      <q-step
        :name="2"
        title="Paid"
        icon="create_new_folder"
        :done="metaStep >= 2"
      >
        <div v-if="!user.admin">
          Waiting for admin delivering package
        </div>
        <div v-if="user.admin">
         Confirm that package is ready to delivered
        </div>
      </q-step>

      <q-step
        :name="3"
        title="On Delivered"
        icon="assignment"
        :done="metaStep >= 3"
      >
        <div v-if="!user.admin">
          Confirm that product has arrived
        </div>
        <div v-if="user.admin">
         Waiting for user to confirm that product is arrived
        </div>
      </q-step>

      <q-step
        :name="4"
        title="Done"
        icon="done"
        :done="metaStep == 4"
      >
        Transaction finish
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <!-- <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 2 ? 'Finish' : 'Continue'" /> -->
          <div v-if="!user.admin">
            <q-btn v-if="metaStep === 3" flat color="primary" @click="packageArrived" label="Confirm arrive" class="q-ml-sm" />
          </div>
          <div v-if="user.admin">
            <q-btn v-if="metaStep === 1" flat color="primary" @click="approvePayment" label="Confirm payment" class="q-ml-sm" />
            <q-btn v-if="metaStep === 2" flat color="primary" @click="sendPackage" label="Send package" class="q-ml-sm" />
          </div>
        </q-stepper-navigation>
      </template>
    </q-stepper>

    <div id="deleteButton" v-if="user.admin">
      <q-btn color="red" :ripple="false" :no-caps="true"  @click="confirm = true">Delete this transactions</q-btn>
    </div>

  <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="report_problem" color="red" text-color="white" />
          <div v-if="this.thisTrans.status !== 'Done'">
            <span class="q-ml-sm">Are you sure to delete this transaction? it hasn't finished yet!</span>
          </div>
          <div  v-if="this.thisTrans.status == 'Done'">
            <span class="q-ml-sm">Are you sure to delete this transaction?</span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat :no-caps="true" label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes"  :no-caps="true" color="primary" @click="deleteTransaction" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['thisTrans'],
  data(){
    return{
      metaStep : 0,
      confirm: false
    }
  },
  methods: {
    packageArrived(){
      console.log('confirm arrive')
        let payload = {
        transactionId : this.thisTrans._id,
        status : 'Done'
      }
      this.$store.dispatch('transactions/updateTransactions',payload)
        .then(() => {
          return this.$store.dispatch('transactions/userTransactions')
        })
        .then(() => {
          this.metaStep = 4
        })
    },
    approvePayment(){
      console.log('payment approved');
      let payload = {
        transactionId : this.thisTrans._id,
        status : 'Processing Package'
      }
      this.$store.dispatch('transactions/updateTransactions',payload)
        .then(() => {
          return this.$store.dispatch('transactions/allTransactions')
        })
        .then(() => {
          console.log('masuk')
          this.metaStep = 2
        })
    },
    sendPackage(){
      console.log('payment approved');
      let payload = {
        transactionId : this.thisTrans._id,
        status : 'Sending Package'
      }
      this.$store.dispatch('transactions/updateTransactions',payload)
        .then(() => {
          return this.$store.dispatch('transactions/allTransactions')
        })
        .then(() => {
          this.metaStep = 3
        })
    },
    deleteTransaction(){
      this.$store.dispatch('transactions/deleteTransactions',this.thisTrans._id)
      .then(() => {
        this.$emit('getAnother')
          this.$store.dispatch('transactions/allTransactions')
        })
    }
  },
  computed : {
    ...mapState('users',['user']),
    totalPrice(){
      let total = 0
      if(this.thisTrans.cart){
        this.thisTrans.cart.forEach(element => {
          total += (element.product.price * element.qty)
        });
      }
      return total
    },
    step(){
      if(this.thisTrans) {
        if(this.thisTrans.status === 'Waiting Confirmation'){
          this.metaStep = 1
          return 1
        } else if (this.thisTrans.status === 'Processing Package'){
          this.metaStep = 2
          return 2
        } else if (this.thisTrans.status === 'Sending Package'){
          this.metaStep = 3
          return 3
        } else if (this.thisTrans.status === 'Done'){
          this.metaStep = 4
          return 4
        }
      } else {
        console.log('masuk step 0')
        return 0
      }
    }
  }
}
</script>

<style>
#deleteButton{
  margin-top: 10px
}
</style>