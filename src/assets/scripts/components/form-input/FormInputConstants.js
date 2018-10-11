export const REGEX_VALIDATORS = {
  hasAnNumberRegex: /(\d+)/,
  hasLowerCaseRegex: /[a-z]/,
  hasUpperCaseRegex: /[A-Z]/,
  hasEmail: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

export const INPUT_VALIDATION_TYPES = {
  HAS_EMAIL: 'HAS_EMAIL',
  NOT_EMPTY: 'NOT_EMPTY',
  HAS_AN_CAPITAL_LETTER: 'HAS_AN_CAPITAL_LETTER',
  HAS_AN_NUMBER: 'HAS_AN_NUMBER',
  HAS_MINIMAL_CHARACTERS: 'HAS_MINIMAL_CHARACTERS',
}

export const INPUT_VALIDATION_TYPES_TEXT = {
  HAS_EMAIL: 'Deve conter um email válido',
  NOT_EMPTY: 'O campo não pode estar vazio',
  HAS_AN_CAPITAL_LETTER: 'Pelo menos 1 letra maiúscula',
  HAS_AN_NUMBER: 'Pelo menos 1 número',
  HAS_MINIMAL_CHARACTERS: 'Pelo menos 6 caracteres',
}