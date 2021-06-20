import {CREATE_NAV_BAR} from "../types";

export const navBarReducer = (state = [], action)=>{
    switch (action.type) {
      case CREATE_NAV_BAR:
          return action.payload
      default:
          return state
  }
}