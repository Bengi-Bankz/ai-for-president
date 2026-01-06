<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		type: 'full-width' | 'max-width';
		children: Snippet;
	};

	const props: Props = $props();
</script>

<div class="ui-modal-button-wrap">
	<div class={props.type}>
		{@render props.children()}
	</div>
</div>


<style lang="scss">
   .ui-modal-button-wrap {
	   width: 100%;
	   display: flex;
	   justify-content: center;
   }

   .full-width {
	   width: 100%;
   }

   .max-width {
	   width: 100%;
	   max-width: 250px;
   }

   .button {
	   width: 100%;
	   position: relative;
	   font-family: "BungeeSpice-Regular", sans-serif;
	   cursor: pointer;
	   display: inline-flex;
	   justify-content: center;
	   background-color: black;
	   border-color: aliceblue;
	   padding: 0;
   }
</style>
