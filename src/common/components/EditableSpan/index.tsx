import React, {ChangeEvent, FC, KeyboardEvent, useCallback, useState} from 'react';
import s from './EditableSpan.module.css'
import {Button, TextField} from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";

interface IEditableSpan {
    title: string
    checked?: boolean
    onChange: (newTitle: string) => void
}

const SearchButton = () => (
    <Button variant='contained' size='small' style={{marginBottom: '5px'}}>
        Save
    </Button>
)

const EditableSpan: FC<IEditableSpan> = ({title, onChange, checked}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(title)

    const activateEditMode = () => {
        setEditMode(true)
    }

    const onBlur = useCallback(() => {
        setEditMode(false)
        onChange(newTitle)
    }, [onChange, newTitle])

    const changeKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            onBlur()
        }
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    return editMode
        ? <>
            <TextField
                label="Nickname"
                onKeyDown={changeKeyPress}
                onBlur={onBlur}
                onChange={onChangeTitleHandler}
                value={newTitle}
                autoFocus
                color='info'
                variant="standard"
                InputProps={{endAdornment: <SearchButton />}}/>
        </>
        : <>
            <span onDoubleClick={activateEditMode} className={checked ? s.isDone : s.activeDone}>{title}</span>
            <ModeIcon style={{fontSize: '16px', marginLeft: '5px'}}/>
        </>
}

export default EditableSpan;
