import { Dispatch } from 'redux';
import axios, { AxiosError } from 'axios';
import {
  setAppErrorAC,
  SetAppErrorType,
  setAppStatusAC,
  SetAppStatusType,
} from '../../app/appReducer';

type ActionErrorType = SetAppErrorType | SetAppStatusType;

export const handleServerAppError = (
  err: Error | AxiosError,
  dispatch: Dispatch<ActionErrorType>,
) => {
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? (err.response.data as { error: string }).error : err.message;
    dispatch(setAppErrorAC(error));
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`));
  }
  dispatch(setAppStatusAC('failed'));
};
