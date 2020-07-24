<template lang="pug">
	header.row
		.container
			.section
				img(
					src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png",
					alt="openweather")
				span
					|API
</template>

<script>

export default {
	name: 'headerComponent'
}

</script>

<style scoped>
	.row {
		background-color: #3298dc;
		box-shadow: 0 -11px 29px rgba(50, 50, 50, .8);
	}
	.section {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
	}
	img {
		display: inline-block;
		max-height: 4rem;
	}
	img+span {
		color: #fff;
		font-weight: bold;
		font-size: 1.5rem;
		line-height: 1;
		margin-left: .3rem;
	}
</style>