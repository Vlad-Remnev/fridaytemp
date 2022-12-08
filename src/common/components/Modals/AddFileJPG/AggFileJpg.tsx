import React, {ChangeEvent, FC, ReactNode} from 'react';
import s from "./AggFileJpg.module.css";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {minFileSize} from "../../../../features/Profile/Profile";
import {convertFileToBase64} from "../../../utils/convertFileToBase64";
import {setAppErrorAC} from "../../../../app/appReducer";
import {useDispatch} from "react-redux";
import {AppDispatchType} from "../../../../app/store";
type AggFileJpgType = {
  children: ReactNode
  callback: (file64: string) => void
  id: string
}

const AggFileJpg: FC<AggFileJpgType> = ({children, callback, id}) => {

  const dispatch = useDispatch<AppDispatchType>();

  const convertInFile64Handler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < minFileSize) {
        convertFileToBase64(file, (file64: string) => {
          callback(file64)
        });
      } else {
        dispatch(setAppErrorAC('File is too BIG'));
      }
    }
  };
  return (
    <div className={s.packTitle}>
      <div>{children}</div>
      <div>
        <input
          id={id}
          type={'file'}
          style={{display: 'none'}}
          accept={'image/**'}
          onChange={convertInFile64Handler}
        />
        <label htmlFor={id}>
          <AddAPhotoIcon sx={{cursor: 'pointer'}}/>
        </label>
      </div>
    </div>
  );
};

export default AggFileJpg;