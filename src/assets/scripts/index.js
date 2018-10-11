import FormInput from './components/form-input/FormInput'
import { INPUT_VALIDATION_TYPES } from './components/form-input/FormInputConstants'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log('JavaScript is enabled in the browser');
}

const pattern1 = new RegExp('.{6,}') // At least 6 characters
const pattern2 = new RegExp('(?=.*[A-Z])') // At least an uppercase letter
const pattern3 = new RegExp('(?=.*[0-9])') // At least a number

new FormInput('#signuppassword-container', [
  INPUT_VALIDATION_TYPES.HAS_EMAIL,
  INPUT_VALIDATION_TYPES.NOT_EMPTY,
  INPUT_VALIDATION_TYPES.HAS_AN_CAPITAL_LETTER,
  INPUT_VALIDATION_TYPES.HAS_AN_NUMBER,
], true, true)