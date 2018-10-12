import FormInput from '../../components/form-input/FormInput'
import { INPUT_VALIDATION_TYPES } from '../../components/form-input/FormInputConstants'
import { documentSelector } from '../../utils'

class SignUp {

  constructor() {
    this.nameFormInput = {}
    this.emailFormInput = {}
    this.passwordFormInput = {}
    this.confirmPasswordFormInput = {}
    this.allFormInputsFields = []
    this.formSubmitButton = documentSelector('#submit-button')

    this._runAllFormSetup()
  }

  _runAllFormSetup() {
    this.nameFormInput = new FormInput.Builder('#name-container', [
      INPUT_VALIDATION_TYPES.NOT_EMPTY])
      .shouldRunVerificationOnAllChange()
      .withOnChangeListener(() => this._onChangeField())
      .build()

    this.emailFormInput = new FormInput.Builder('#email-container', [
      INPUT_VALIDATION_TYPES.HAS_EMAIL,])
      .shouldRunVerificationOnAllChange()
      .withOnChangeListener(() => this._onChangeField())
      .build()

    this.passwordFormInput = new FormInput.Builder('#password-container', [
      INPUT_VALIDATION_TYPES.NOT_EMPTY,
      INPUT_VALIDATION_TYPES.HAS_MINIMAL_CHARACTERS,
      INPUT_VALIDATION_TYPES.HAS_AN_CAPITAL_LETTER,
      INPUT_VALIDATION_TYPES.HAS_AN_NUMBER])
      .shouldRunVerificationOnAllChange()
      .withOnChangeListener(() => this._onChangeField())
      .withShowStrenghtIndicatorsOnView()
      .withShowTextRulesOnView()
      .build()

    this.confirmPasswordFormInput = new FormInput.Builder('#confirmpassword-container', [
      INPUT_VALIDATION_TYPES.NOT_EMPTY,
      INPUT_VALIDATION_TYPES.HAS_MINIMAL_CHARACTERS,
      INPUT_VALIDATION_TYPES.HAS_AN_CAPITAL_LETTER,
      INPUT_VALIDATION_TYPES.HAS_AN_NUMBER,
      INPUT_VALIDATION_TYPES.INPUT_VALUE_IS_EQUAL_TO_THE_OTHER_FORM_INPUT])
      .shouldRunVerificationOnAllChange()
      .withOnChangeListener(() => this._onChangeField())
      .withFormInputContainerReferenceNameToBeMatch('#password-container')
      .build()

    this._addListenerOnSubmitButton()

    this.allFormInputsFields.push(this.nameFormInput,
      this.emailFormInput, this.passwordFormInput, this.confirmPasswordFormInput)
  }

  _onChangeField() {
    if (this._allFormInputFieldsAreValid())
      this.formSubmitButton.disabled = false
    else
      this.formSubmitButton.disabled = true
  }

  _addListenerOnSubmitButton() {
    this.formSubmitButton.addEventListener("click", () => {
      console.log('FORM RESULT \n---------------------')
      console.log('name', this.nameFormInput.getInputValue())
      console.log('name is valid', this.nameFormInput.isValid())
      console.log('email', this.emailFormInput.getInputValue())
      console.log('email isValid', this.emailFormInput.isValid())
      console.log('password', this.passwordFormInput.getInputValue())
      console.log('password isValid', this.passwordFormInput.isValid())
      console.log('confirmpassword', this.confirmPasswordFormInput.getInputValue())
      console.log('confirmpassword isValid', this.confirmPasswordFormInput.isValid())

    });
  }

  _allFormInputFieldsAreValid() {
    let allFieldsIsValid = true;

    if (this.allFormInputsFields) {
      this.allFormInputsFields.forEach(formInput => {
        if (!formInput.isValid())
          allFieldsIsValid = false
      });

    } else {
      allFieldsIsValid = false
    }

    return allFieldsIsValid
  }

}

export default SignUp