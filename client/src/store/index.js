import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/server.js'
import Swal from 'sweetalert2'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productEdit : {},
    userTransactions : [],
    totalMoney : 0,
    allProducts: [],
    isLogin : false,
    carts : [],
    userProducts : [],
    user : {
      username : '',
      email : '',
      photo : '',
      membership : '', 
      _id : ''     
    }
  },
  mutations: {
    // semua hal yang dilakukan oleh mutations harus sycn
    setTotalMoney(state, payload) {
      state.totalMoney = payload.reduce((total, cart) => {
        console.log(cart)
        return total + cart.totalPrice
      })
    },
    deleteCart(state, payload) {
      state.carts =  state.carts.filter(cart => {   
          return cart.product._id != payload           
          });
      let temp = state.carts
      state.totalMoney = temp.reduce(function(total, cart) {
        return total + cart.totalPrice
      },0)    
    },
    setDataEdit(state, payload) {
      console.log('masuk set data edit', payload)
      state.productEdit = payload
      //$bvModal.show('edit-product')
    },
    setTransactios(state, payload) {
      state.userTransactions = payload
    },
    clearCarts(state) {
      state.carts = []
      state.totalMoney = []
    },
    setUserProduct(state) {
      console.log('set user Products')
      console.log(state.userProducts, state.allProducts)
      state.userProducts = state.allProducts.filter(item => {
        return item.user == state.user._id
      })
    },
    fillProducts (state, data) {
      console.log( JSON.stringify(state.user) + 'fsdfsfsdfsmasuk mutations')
      state.allProducts = data
      
    },
    setLogin(state, payload) {
      state.isLogin = payload
    },
    setUser(state, user) {
      console.log(user._id, 'masuk set User')
      state.user._id = user._id
      state.user.username = user.username,
      state.user.email = user.email,
      state.user.photo = user.photo,
      state.user.membership = user.membership      
    },    
    addProduct(state, payload) {
      console.log('masuk addProduct', state.totalMoney)
      if (state.carts.length == 0) {
          state.carts.push({
            totalItem : 1,
            product : payload,
            totalPrice : Number(payload.price)
          })
          state.totalMoney += Number(payload.price)
      } else {
        for (let i=0; i<state.carts.length; i++) {
            if (state.carts[i].product._id == payload._id) {
                if (state.carts[i].totalItem >= payload.qty) {
                  Swal.fire({
                    title: 'Sorry ..',
                    text: 'Your order exceed the total stocks',
                    icon: 'error'
                  })
                } else {
                  state.carts[i].totalItem += 1
                  state.carts[i].totalPrice += Number(payload.price)
                  state.totalMoney += Number(payload.price)
                }
                return;
            }            
        }
        state.carts.push({
          totalItem : 1,
          product : payload,
          totalPrice : Number(payload.price)
        })
        state.totalMoney += Number(payload.price)
      }
      
    }
  },
  actions: {
    // semua hal yang dilakukan oleh actions harus asyn
    // actions harus selalu memanggil mutations sebelum merubah state
    addCartToDataBase(context) {
      axios.post('/cart', context.state.carts,{
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getAllProducts (context) {
      axios
        .get('/products')
        .then(({ data }) => {
          context.commit('fillProducts', data)
          //context.commit('')
          console.log(data, 'masuk actions')          
        })
        .catch(err => {
          Swal.fire({
            title: 'Opps ..',
            text: `${err}`,
            icon: 'warning'
          })
        })
    },
    findUser(context) {
      console.log('masuk findUser')
      axios.
        get(`/user`, {
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .then(({data}) => {
          console.log(data)
          context.commit('setUser', data.user)
        })
        .catch(err => {
          console.log(err)
        })
    },  
    findTransaction(context) {
      axios.
        get('/transaction',{
          headers : {
            token : localStorage.getItem('token') 
          }
        })
        .then(({data}) => {
          console.log(data)
          context.commit('setTransactios', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  modules: {
  },
})
