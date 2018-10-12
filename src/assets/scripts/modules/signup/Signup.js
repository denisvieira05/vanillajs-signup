import FormInput from '../../components/form-input/FormInput'
import { INPUT_VALIDATION_TYPES } from '../../components/form-input/FormInputConstants'
import { documentSelector } from '../../utils'

class SignUp {

  constructor() {
    this.nameFormInput = {}
    this.emailFormInput = {}
    this.passwordFormInput = {}
    this.confirmPasswordFormInput = {}
    this.formSubmitButton = {}

    this._runAllFormSetup()
  }

  _runAllFormSetup() {
    this.nameFormInput = new FormInput('#name-container', true, [
      INPUT_VALIDATION_TYPES.NOT_EMPTY
    ], false, false)

    this.emailFormInput = new FormInput('#email-container', true, [
      INPUT_VALIDATION_TYPES.HAS_EMAIL,
    ], false, false)

    this.passwordFormInput = new FormInput('#password-container', true, [
      INPUT_VALIDATION_TYPES.NOT_EMPTY,
      INPUT_VALIDATION_TYPES.HAS_MINIMAL_CHARACTERS,
      INPUT_VALIDATION_TYPES.HAS_AN_CAPITAL_LETTER,
      INPUT_VALIDATION_TYPES.HAS_AN_NUMBER,
    ], true, true)

    this.confirmPasswordFormInput = new FormInput('#confirmpassword-container', true, [
      INPUT_VALIDATION_TYPES.NOT_EMPTY,
      INPUT_VALIDATION_TYPES.HAS_MINIMAL_CHARACTERS,
      INPUT_VALIDATION_TYPES.HAS_AN_CAPITAL_LETTER,
      INPUT_VALIDATION_TYPES.HAS_AN_NUMBER,
      INPUT_VALIDATION_TYPES.INPUT_VALUE_IS_EQUAL_TO_THE_OTHER_FORM_INPUT,
    ], false, false, '#password-container')

    this.formSubmitButton = documentSelector('#submit-button')
    this._addListenerOnSubmitButton()
  }

  _addListenerOnSubmitButton() {
    this.formSubmitButton.addEventListener("click", () => {
      console.log('FORM RESULT \n---------------------')
      console.log('name', this.nameFormInput.getInputValue())
      console.log('email', this.emailFormInput.getInputValue())
      console.log('password', this.passwordFormInput.getInputValue())
      console.log('confirmpassword', this.confirmPasswordFormInput.getInputValue())

    });
  }

}

export default SignUp