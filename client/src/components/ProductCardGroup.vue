<template>
  <mdb-container>
		<mdb-row>
			<mdb-card-group class="" v-for="(product, i) in productGroup" :key="i" deck>
				<ProductCard :product="product" />
			</mdb-card-group>
		</mdb-row>
	</mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCardGroup } from 'mdbvue';
import ProductCard from './ProductCard'

export default {
  name: 'product-card-group',
  props: ['productGroup'],
  components: {
      ProductCard,
			mdbContainer,
			mdbRow,
			mdbCardGroup
		}
};
</script>

<style scoped>
  
</style>