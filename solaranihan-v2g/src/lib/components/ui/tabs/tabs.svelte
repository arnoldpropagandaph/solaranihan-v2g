<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";

	type $$Props = TabsPrimitive.Props;
	type $$Events = TabsPrimitive.Events;

	export let value: $$Props["value"] = undefined;
	export let defaultValue: $$Props["defaultValue"] = undefined;
	export let onValueChange: $$Props["onValueChange"] = undefined;
</script>

<TabsPrimitive.Root
	{value}
	{defaultValue}
	{onValueChange}
	{...$$restProps}
	on:valueChange
>
	<slot />
</TabsPrimitive.Root>
