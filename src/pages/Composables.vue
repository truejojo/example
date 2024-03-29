<script setup>
import { ref, computed, onMounted } from "vue";
import Button from "../components/single/Button.vue";
import useCounter from "../composables/useCounter.js";
import useToggler from "../composables/useToggler.js";
import useDate from "../composables/useDate.js";
import useRandomCharacter from '../composables/useRandomCharacter.js';

const [ getCount, incrementCount, decrementCount, resetCount ] = useCounter();
const [ getCount2, incrementCount2, decrementCount2, resetCount2 ] = useCounter(
  5,
  5
);
const [ getToggle, toggle, setToggleTrue, setToggleFalse ] = useToggler();
const { getTimestampDate, getTimestampFull, getShortDate, getMediumDate, getLongDate, getFullDate } = useDate();
const { getNumbersIdent, getLettersIdent, getCharactersIdent } = useRandomCharacter();

const textColor = computed(() => (getToggle() ? "red" : "blue"));

  const numbers = ref('');
  const letters = ref('');
  const chars = ref('');
  
  onMounted(() => {
    numbers.value = getNumbersIdent();
    letters.value = getLettersIdent();
    chars.value = getCharactersIdent(20);
  });
</script>

<template>
  <h2>Identify</h2>
  <p>{{ numbers }}</p>
  <p>{{ letters }}</p>
  <p>{{ chars }}</p>
  <hr />
  <h2>Date</h2>
  <p>{{ getTimestampDate() }}</p>
  <p>{{ getTimestampFull() }}</p>
  <p>{{ getShortDate() }}</p>
  <p>{{ getMediumDate() }}</p>
  <p>{{ getLongDate() }}</p>
  <p>{{ getFullDate() }}</p>
  <hr />
  <h2>Counter</h2>
  <p>Count: {{ getCount() }}</p>
  <Button :onClick="incrementCount">+</Button>
  <Button :onClick="decrementCount">-</Button>
  <Button :onClick="resetCount">Reset</Button>
  <hr />
  <p>Count: {{ getCount2() }}</p>
  <Button :onClick="incrementCount2">+</Button>
  <Button :onClick="decrementCount2">-</Button>
  <Button :onClick="resetCount2">Reset</Button>
  <hr />
  <h2>Toggler</h2>
  <p :style="{ color: textColor }">Toggle: {{ getToggle() }}</p>
  <Button :onClick="toggle">Toggle</Button>
  <Button :onClick="setToggleTrue">ToggleTrue</Button>
  <Button :onClick="setToggleFalse">ToggleFalse</Button>
  <hr />
</template>

<style></style>
