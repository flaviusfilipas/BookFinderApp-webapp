function getAlertType (alertOptions) {
  if (alertOptions.length > 1) {
    return 'all'
  }
  return alertOptions[0]
}

export default {
  getAlertType
}
