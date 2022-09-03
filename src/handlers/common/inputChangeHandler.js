export function inputChangeHandler(formData, setFormData, event) {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value,
  });
}

export function checkboxChangeHandler(value, setValue) {
  setValue(!value);
}
