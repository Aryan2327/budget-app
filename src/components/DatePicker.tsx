import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

interface DateSelectorProps {
    curDate: Date | null
    setCurDate: (date: Date | null) => void
    highlightedDates: Date[]
}

export const DateSelector = ({curDate, setCurDate, highlightedDates}: DateSelectorProps) => {
    const isInThisMonth = (date: Date) => {
        const currentMonth = new Date().getMonth()
        return currentMonth == date.getMonth()
    }
    const CustomInput = forwardRef<HTMLButtonElement, React.HTMLProps<HTMLButtonElement>>(({ value, onClick }, ref) => (
        <button className="custom_input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));
    return (
        <DatePicker selected={curDate} onChange={(date) => setCurDate(date)} filterDate={isInThisMonth} customInput={<CustomInput />} highlightDates={highlightedDates} withPortal/>
    );
};