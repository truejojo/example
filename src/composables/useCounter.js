import { ref } from "vue";

const useCounter = (startCount = 0, counter = 1) => {
  const count = ref(startCount);

  const incrementCount = () => (count.value = count.value + counter);

  const decrementCount = () => (count.value = count.value - counter);

  const setCount = (newCount) => (count.value = newCount);

  const resetCount = () => (count.value = startCount);

  const getCount = () => count.value;

  return [ getCount, incrementCount, decrementCount, resetCount, setCount ];
};

export default useCounter;
