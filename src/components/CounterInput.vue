<template>
	<v-row>
    <v-col
      class="pr-0"
    >
      <v-text-field
        outlined
        class="ma-1"
        :value="value"
        dense
        hide-details
        readonly
      >
      </v-text-field>
    </v-col>
    <div class="py-4 d-flex  flex-column">
      <v-btn
        x-small
        width="20"
        text
        @click="increase"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <v-btn
        x-small
        width="20"
        text
        @click="decrease"
      >
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </div>
  </v-row>
</template>

<script>
	export default {
		name: "CounterInput",

		props: {
			min: {
				type: Number,
				default: undefined,
			},
			max: {
				type: Number,
				default: undefined,
			},
			value: {
				type: Number,
				default: 0,
			},
			width: {
				type: String,
				default: "150px",
			}
		},

		methods: {
			increase() {
				const { value, max } = this;

				let newValue = value + 1;
				if (isNaN(max) || newValue <= max) {
					this.$emit("input", newValue);
				}
			},

			decrease() {
				const { value, min } = this;

				let newValue = value - 1;
				if (isNaN(min) || newValue >= min) {
					this.$emit("input", newValue);
				}
			}
		}


	}
</script>