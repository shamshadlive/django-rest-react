import {configureStore} from '@reduxjs/toolkit'
import userBasicReducer from './userBasic/userBasicSlice'


export default configureStore({
    reducer:{
        user:userBasicReducer
    }
})