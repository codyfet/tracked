import React from "react";

interface IProps {
    className?: string;
}
/**
 * Икнока Плюс.
 */
export const Plus = (props: IProps) => {
    return (
        <svg
            className="plus"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M27 11.25V42.75"
                stroke="#DFDFE4"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.25 27H42.75"
                stroke="#DFDFE4"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
