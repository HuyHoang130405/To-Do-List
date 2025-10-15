import DatePicker from "react-datepicker";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/datetime-picker.css";
import React from "react";

export const DateTimeInput = React.memo(function DateTimeInput({
    label,
    value,
    onChange,
    minDate,
    gradient,
}: {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    gradient: string;
}) {
    return (
        <div>
            <label className="block text-sm text-gray-400 mb-2 ml-1">{label}</label>
            <div className="relative w-full">
                <DatePicker
                    selected={value && !isNaN(value.getTime()) ? value : null}
                    onChange={onChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy HH:mm"
                    className={`w-full px-4 py-3 rounded-xl ${gradient} border border-white/10 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/60 transition-all duration-200`}
                    minDate={minDate}
                    calendarStartDay={1}
                    renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                    }) => (
                        <div className="flex items-center justify-center gap-2 py-2">
                            <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className="p-1 rounded hover:bg-white/10">
                                <ChevronLeft size={20} className="text-purple-400" />
                            </button>
                            <span className="font-semibold text-white text-base">
                                {date.toLocaleString("vi-VN", { month: "long", year: "numeric" })}
                            </span>
                            <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled} className="p-1 rounded hover:bg-white/10">
                                <ChevronRight size={20} className="text-purple-400" />
                            </button>
                        </div>
                    )}
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
        </div>
    )
});