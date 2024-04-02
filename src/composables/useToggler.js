import { ref } from 'vue';

const useToggler = (initialValue = false) => {
  const value = ref(initialValue);

  const getToggle = () => value.value;

  const toggle = () => (value.value = !value.value);

  const setToggleTrue = () => (value.value = true);

  const setToggleFalse = () => (value.value = false);

  const setToggle = (newValue) => (value.value = newValue);

  const resetToggle = () => (value.value = initialValue);

  return [
    getToggle,
    toggle,
    setToggleTrue,
    setToggleFalse,
    setToggle,
    resetToggle,
  ];
};

export default useToggler;
