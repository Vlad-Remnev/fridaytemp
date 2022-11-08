import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './SuperRange.module.css'
import {Slider} from "@mui/material";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperRangePropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    value: number
    onChangeRange: (value: number| number[]) => void
};

const SuperRange: React.FC<SuperRangePropsType> = (
    {
        type,
        value,
        onChange,
        onChangeRange,
        className,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    // const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    //     onChange && onChange(e) // сохраняем старую функциональность
    //
    //     onChangeRange && onChangeRange(+e.currentTarget.value)
    // }
    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange(newValue);
    };

    return (
        <div className={s.range}>
            <Slider
                value={value}
                onChange={handleChange}
                disableSwap
            />
        </div>
    )
}

export default SuperRange
