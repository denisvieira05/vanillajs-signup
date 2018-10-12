import { INPUT_VALIDATION_TYPES, REGEX_VALIDATORS, INPUT_VALIDATION_TYPES_TEXT } from './FormInputConstants'
import { documentSelector, createElement } from '../../utils'

class FormInput {

  constructor(formInputContainerReferenceName, isCheckingOnAllChange, inputValidationTypes,
    showTextRulesOnView, showStrenghtIndicatorsOnView, formInputContainerReferenceNameToBeMatch) {

    this.formInputElement = documentSelector(`${formInputContainerReferenceName} > .forminput`);
    this.formInputContainer = documentSelector(formInputContainerReferenceName);
    this.formInputToBeMatch = null;
    this.validationTypes = inputValidationTypes;
    this.invalidRules = []
    this.validValue = ''
    this.activeSimpleInputValidatorOnView = false;
    this.isShowTextRulesOnView = showTextRulesOnView;
    this.isShowStrenghtIndicatorsOnView = showStrenghtIndicatorsOnView;

    if (formInputContainerReferenceNameToBeMatch) {
      this.formInputToBeMatch = documentSelector(`${formInputContainerReferenceNameToBeMatch} > .forminput`);
    }

    this._addListeners(isCheckingOnAllChange);

    if (showStrenghtIndicatorsOnView)
      this._showStrenghtRulesIndicatorsOnView()

    if (showTextRulesOnView)
      this._showTextRulesOnView(this.validationTypes)

    if (!showStrenghtIndicatorsOnView && !showTextRulesOnView && inputValidationTypes.length !== 0)
      this._activeSimpleValidatorOnView()
  }

  _activeSimpleValidatorOnView() {
    this.activeSimpleInputValidatorOnView = true
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

  _showTextRulesOnView(validationTypes, allValidatorsIsInvalid) {
    let textRulesListContainer = createElement('ul');
    textRulesListContainer.className = 'list-container';

    validationTypes.forEach((validationType) => {
      const strenghtIndicator = createElement('li')
      strenghtIndicator.className = 'itemlist'
      strenghtIndicator.innerHTML = this._getValidationTextByType(validationType)

      if (allValidatorsIsInvalid)
        strenghtIndicator.classList.add('isinvalid')

      textRulesListContainer.appendChild(strenghtIndicator)
    })

    this.textRulesListContainer = textRulesListContainer;

    this.formInputContainer.appendChild(textRulesListContainer);
  }

  _getValidationTextByType(validationType) {
    return INPUT_VALIDATION_TYPES_TEXT[validationType]
  }

  _addListeners(checkOnChange) {
    const listenerType = checkOnChange ? 'input' : 'change'
    this.formInputElement.addEventListener(listenerType, () => {
      if (this.validationTypes.length > 0)
        this._runInputValidators()
    })
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

  _inputValueValidator(inputValueOnValidation, validConditionFunction, validationType) {
    validConditionFunction() ? (
      this._updateValidValue(inputValueOnValidation),
      this._removeInvalidRule(validationType)
    ) : this._addInvalidRule(validationType)
  }

  _runInputValidators() {
    const inputValueChanged = this.formInputElement.value

    this.validationTypes.forEach(validationType => {
      this._inputValueValidator(inputValueChanged,
        this._getValidationRuleByType(
          validationType, inputValueChanged), validationType)
    });

    const invalidRulesQuantity = this.invalidRules.length

    if (invalidRulesQuantity === 0)
      this._showValidInputStyle()
    else
      this._showInvalidInputStyle()

    if (this.isShowTextRulesOnView)
      this._updateTextRulesStatusIndicators()

    if (this.isShowStrenghtIndicatorsOnView)
      this._updateStrenghtRulesIndicators(invalidRulesQuantity)

    if (this.activeSimpleInputValidatorOnView) {

      if (invalidRulesQuantity === 0) {
        this._removeSimpleInvalidRulesContainerOnView()
      } else {
        this._showSimpleInvalidRulesContainerOnView(this.invalidRules)
      }
    }
  }

  _showSimpleInvalidRulesContainerOnView(invalidRules) {
    this._removeSimpleInvalidRulesContainerOnView()
    this._showTextRulesOnView(invalidRules, true)
  }

  _removeSimpleInvalidRulesContainerOnView() {
    if (this.textRulesListContainer)
      this.textRulesListContainer.remove()
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
      HAS_EMAIL: () => this._hasValidEmail(valueToVerify),
      NOT_EMPTY: () => this._isNotEmpty(valueToVerify),
      HAS_AN_CAPITAL_LETTER: () => this._hasAnCapitalLetter(valueToVerify),
      HAS_AN_NUMBER: () => this._hasAnNumber(valueToVerify),
      HAS_MINIMAL_CHARACTERS: () => this._hasMinimalCharacters(valueToVerify),
      INPUT_VALUE_IS_EQUAL_TO_THE_OTHER_FORM_INPUT: () => this._otherFormInputIsMatched(valueToVerify),
    }

    return validatorsMap[validationType]
  }

  _otherFormInputIsMatched(value) {
    return this.formInputToBeMatch.value === value
  }

  _hasMinimalCharacters(value) {
    return value.length >= 6
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

  _showInvalidInputStyle() {
    this.formInputElement.classList.remove('isvalid');
    this.formInputElement.classList.add('isinvalid');
  }

  _showValidInputStyle() {
    this.formInputElement.classList.remove('isinvalid');
    this.formInputElement.classList.add('isvalid');
  }

  getInputValue() {
    return this.validValue
  }

}

export default FormInput;
