import FormInput from '../../components/form-input/FormInput'
import { INPUT_VALIDATION_TYPES } from '../../components/form-input/FormInputConstants'
import { documentSelector } from '../../utils'
import AuthenticationService from '../../services/AuthenticationService'

class SignUp {

  constructor() {
    this.nameFormInput = {}
    this.emailFormInput = {}
    this.passwordFormInput = {}
    this.confirmPasswordFormInput = {}
    this.allFormInputsFields = []
    this.formSubmitButton = documentSelector('#submit-button')
    this.createAccountText = documentSelector('#createaccount-text')
    this.createAccountLoader = documentSelector('#createaccount-loader')
    this.signUpFormContainer = documentSelector('.signup-form')
    this.onFinishLoaderContainer = documentSelector('.loading-container')
    this.onSuccessContainer = documentSelector('.success-container')
    this.signUpMainSection = documentSelector('.signup-container')

    this.createAccountLoader.remove()
    this.onFinishLoaderContainer.remove()
    this.onSuccessContainer.remove()

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

      const { nameFormInput, emailFormInput, passwordFormInput, confirmPasswordFormInput } = this

      this._showLoadingOnSubmitButton()

      new AuthenticationService().signUp(nameFormInput.getInputValue(),
        emailFormInput.getInputValue(), passwordFormInput.getInputValue())
        .then(() => {
          setTimeout(() => this._redirectToSuccessBox(), 2000)
        })

    });
  }

  _showLoadingOnSubmitButton() {
    this.createAccountText.remove()
    this.formSubmitButton.appendChild(this.createAccountLoader)
  }

  _hideLoadingOnSubmitButton() {
    this.createAccountLoader.remove()
    this.formSubmitButton.appendChild(this.createAccountText)
  }

  _redirectToSuccessBox() {
    this._hideLoadingOnSubmitButton()
    this.signUpFormContainer.remove()
    this.signUpMainSection.appendChild(this.onFinishLoaderContainer)
    setTimeout(() => {
      this.onFinishLoaderContainer.remove()
      this.signUpMainSection.appendChild(this.onSuccessContainer)
    }, 3000)
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