function getAlertType (alertOptions) {
  if (alertOptions.length > 1) {
    return 'all'
  }
  return alertOptions[0]
}
function isBlank (str) {
  return (!str || /^\s*$/.test(str))
}
export default {
  getAlertType, isBlank
}
