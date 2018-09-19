

export const SET_SHOW_CUSTOM = "SET_SHOW_CUSTOM"
export function setShowCustom(showBool) {
  
  return {
    type: SET_SHOW_CUSTOM,
    show: showBool
  }
}