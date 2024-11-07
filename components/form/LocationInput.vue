<script setup lang="ts">
import { onMounted, ref, defineEmits } from 'vue';

const locationInput = ref(null);
const placeDetails = ref<{ address: string } | null>(null); // Holds selected place details
const emit = defineEmits(['placeSelected']); // Emit event to parent

onMounted(() => {
  if (!locationInput.value) return;

  const autocomplete = new google.maps.places.Autocomplete(
    locationInput.value,
    {
      types: ['geocode'], // Specify type as needed
    }
  );

  // Event listener for place selection
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      placeDetails.value = {
        address: place.formatted_address,
      };
      // Emit the place details to parent
      emit('placeSelected', placeDetails.value);
    }
  });
});
</script>
<template>
  <input
    ref="locationInput"
    type="text"
    placeholder="Enter a location"
    class="location-input"
  />
</template>

<style scoped>
.location-input {
  width: 100%;
  padding: 8px;
}
</style>
