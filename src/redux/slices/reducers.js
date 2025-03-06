import authReducer from './authSlice'
import profileReducer from './profileSlice'

const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
}

export default rootReducer
