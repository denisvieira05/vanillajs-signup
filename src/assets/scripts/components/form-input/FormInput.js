import { INPUT_VALIDATION_TYPES, REGEX_VALIDATORS, INPUT_VALIDATION_TYPES_TEXT } from './FormInputConstants'
import { documentSelector, createElement } from '../../utils'

class FormInput {

  constructor(formInputContainerReferenceName, inputValidationTypes, showTextRulesOnView, showStrenghtIndicatorsOnView) {
    this.inputElement = documentSelector(`${formInputContainerReferenceName} > .forminput`);
    this.formInputContainer = documentSelector(formInputContainerReferenceName);
    this.validationTypes = inputValidationTypes;
    this.invalidRules = []
    this.validValue = ''

    this._addListeners();

    if (showStrenghtIndicatorsOnView)
      this._showStrenghtRulesIndicatorsOnView()

    if (showTextRulesOnView)
      this._showTextRulesOnView()

  }

  _showStrenghtRulesIndicatorsOnView() {
    let strenghtValidationContainer = createElement('div');
    strenghtValidationContainer.className = 'strenght-container';

    this.validationTypes.forEach((validationType) => {
      const strenghtIndicator = createElement('div')

      strenghtIndicator.className = 'strenght-indicator'
      strenghtValidationContainer.appendChild(strenghtIndicator)
    })

    this.strenghtValidationContainer = strenghtValidationContainer

    this.formInputContainer.appendChild(strenghtValidationContainer);
  }

  _showTextRulesOnView() {
    let textRulesListContainer = createElement('ul');
    textRulesListContainer.className = 'list-container';

    this.validationTypes.forEach((validationType) => {
      const strenghtIndicator = createElement('li')
      strenghtIndicator.className = 'itemlist'
      strenghtIndicator.innerHTML = this._getValidationTextByType(validationType)

      textRulesListContainer.appendChild(strenghtIndicator)
    })

    this.textRulesListContainer = textRulesListContainer;

    this.formInputContainer.appendChild(textRulesListContainer);
  }

  _getValidationTextByType(validationType) {
    return INPUT_VALIDATION_TYPES_TEXT[validationType]
  }

  _addListeners() {
    this.inputElement.addEventListener('input', () => this._runInputValidators())
  }

  _addInvalidRule(invalidValidationType) {
    if (!this.invalidRules.includes(invalidValidationType))
      this.invalidRules.push(invalidValidationType)
  }

  _removeInvalidRule(invalidValidationType) {
    if (this.invalidRules.includes(invalidValidationType))
      this.invalidRules.splice(this.invalidRules.indexOf(invalidValidationType), 1)
  }

  _updateValidValue(value) {
    this.validValue = value;
  }

  _inputValueValidator(inputValueOnValidation, validCondition, validationType) {
    validCondition ? (
      this._updateValidValue(inputValueOnValidation),
      this._removeInvalidRule(validationType)
    ) : this._addInvalidRule(validationType)
  }

  _runInputValidators() {
    const inputValueChanged = this.inputElement.value

    this.validationTypes.forEach(validationType => {
      this._inputValueValidator(inputValueChanged,
        this._getValidationRuleByType(
          validationType, inputValueChanged), validationType)
    });

    const invalidRulesQuantity = this.invalidRules.length

    if (invalidRulesQuantity === 0)
      this.showValidInputStyle()
    else
      this.showInvalidInputStyle()

    this._updateTextRulesStatusIndicators()
    this._updateStrenghtRulesIndicators(invalidRulesQuantity)
  }

  _updateTextRulesStatusIndicators() {
    const textRulesElements = this.textRulesListContainer.childNodes
    const invalidRulesIndexes = this._getIndexesOnRulesReceivedWithInvalidRulesChecked()

    textRulesElements.forEach((item, index) => {
      item.classList.remove('isinvalid', 'isvalid')

      if (invalidRulesIndexes.includes(index))
        item.classList.add('isinvalid')
      else
        item.classList.add('isvalid')

    })
  }

  _getIndexesOnRulesReceivedWithInvalidRulesChecked() {
    let indexesOnRulesReceived = []
    this.validationTypes.forEach((validationType, index) => {
      if (this.invalidRules.includes(validationType))
        indexesOnRulesReceived.push(index)
    })

    return indexesOnRulesReceived
  }

  _updateStrenghtRulesIndicators(invalidRulesQuantity) {
    const validationTypesTotalQuantity = this.validationTypes.length
    const strenghtValidRulesQuantity = validationTypesTotalQuantity - invalidRulesQuantity

    this._putValidColorOnStrenghtRulesIndicators(strenghtValidRulesQuantity)
  }

  _putValidColorOnStrenghtRulesIndicators(quantityToValid) {
    const strenghtRulesIndicatorsElements = this.strenghtValidationContainer.childNodes
    let statusClassNameToShow = this._getStrenghtStatusClassNameToShow(quantityToValid,
      this.validationTypes.length)

    strenghtRulesIndicatorsElements.forEach((item, index) => {
      item.classList.remove('isinvalid', 'iswarning', 'isvalid')

      if (index < quantityToValid) {
        item.classList.add(statusClassNameToShow)
      }

    })
  }

  _getStrenghtStatusClassNameToShow(quantityToValid, totalElementsQuantity) {
    if (quantityToValid === 1)
      return 'isinvalid'
    else if (quantityToValid > 1 && quantityToValid < totalElementsQuantity)
      return 'iswarning'
    else if (quantityToValid === totalElementsQuantity)
      return 'isvalid'
  }

  _getValidationRuleByType(validationType, valueToVerify) {
    const validatorsMap = {
      HAS_EMAIL: this._hasValidEmail(valueToVerify),
      NOT_EMPTY: this._isNotEmpty(valueToVerify),
      HAS_AN_CAPITAL_LETTER: this._hasAnCapitalLetter(valueToVerify),
      HAS_AN_NUMBER: this._hasAnNumber(valueToVerify),
      HAS_MINIMAL_CHARACTERS: this._hasMinimalCharacters(valueToVerify),
    }

    return validatorsMap[validationType]
  }

  _hasMinimalCharacters(value) {
    return value.length >= 10
  }

  _hasAnNumber(value) {
    return REGEX_VALIDATORS.hasAnNumberRegex.test(value)
  }

  _hasAnCapitalLetter(value) {
    return REGEX_VALIDATORS.hasUpperCaseRegex.test(value)
  }

  _hasValidEmail(value) {
    return REGEX_VALIDATORS.hasEmail.test(value)
  }

  _isNotEmpty(value) {
    return value !== '' && value !== undefined && value !== null
  }

  showInvalidInputStyle() {
    this.inputElement.classList.remove('isvalid');
    this.inputElement.classList.add('isinvalid');
  }

  showValidInputStyle() {
    this.inputElement.classList.remove('isinvalid');
    this.inputElement.classList.add('isvalid');
  }

}

export default FormInput;
