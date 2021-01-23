<template>
	<div>
		<v-row 
			class="mt-5 ma-0" 
			justify="center"
		>
		<v-card
			v-for="place in addresses"
			:key="place.id"
			class="ma-5"
			max-width="400"
		>
			<v-img
				:src="place.imgSrc"
				height="200px"
			></v-img>
	
			<v-card-title class="text-capitalize">
				{{place.address}}
			</v-card-title>
	
			<v-card-subtitle>
				<v-icon>mdi-phone</v-icon> {{place.phone}}
			</v-card-subtitle>
	
			<v-card-actions>
				<v-btn
					color="orange lighten-2"
					text
					to="/order"
				>
					Закакзать
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
	</div>
</template>

<script>
	import axios from "axios";
	import { URL_API } from "@/settings";

	export default {
		name: "Addresses",
		data() {
			return {
				addresses: [],
			}
		},

		methods: {
			getAddresses(){
				axios({
					method: "get",
					url: `${URL_API}/order/stores`,
				})
				.then(response => {
					console.log(response);
					const { data } = response;

					this.addresses = data.map(
						elem => {
							const { id, phone } = elem;
							const { planningStructure, street } = elem.address;
							let randomImage = Math.ceil(Math.random() * 5 + 1);
							return {
								address: `${planningStructure}. ${street}`.toLowerCase(),
								imgSrc: require(`../assets/shops/shop${randomImage}.jpg`),
								id: id,
								phone: phone
							};
						}
					);
				})
			}
		},

		created() {
			this.getAddresses()
			// this.addresses.forEach( a => {
			// 	a.imgSrc = require(a.imgSrc);
			// });
		}
	}
</script>