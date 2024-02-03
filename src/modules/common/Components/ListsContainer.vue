<template>
	<div class="list">
		<slot />
	</div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.list {
	display: flex;
	flex-direction: column;
	gap: 24px;
	padding-bottom: 24px;
	width: 100%;
}
</style>