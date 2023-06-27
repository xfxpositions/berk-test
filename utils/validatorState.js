class ValidatorState {
  constructor(value, validators) {
    let rawValue = ref(value);
    this.value = rawValue.value;
    this.errorMessagesRaw = ref([]);
    this.errorMessages = this.errorMessagesRaw.value;
    this.validators = validators;
  }

  validator() {
    this.validators.forEach((validator) => {
      const isValid = validator.validation(this.value);

      if (!isValid && !validator.error) {
        this.errorMessages.push(validator.errorMessage);
        validator.error = true;
      } else if (isValid && validator.error) {
        const index = this.errorMessages.indexOf(validator.errorMessage);
        if (index !== -1) {
          this.errorMessages.splice(index, 1);
        }
        validator.error = false;
      }
    });
  }
}
export default ValidatorState;
