import {FieldValues, SubmitErrorHandler, SubmitHandler, UseFormWatch} from "react-hook-form";
import React from "react";

export interface IOpen {
    type: string;
    stoppingModal: boolean;
    paymentModal: boolean;
}

export type TStoppingModal = {
    handleClose?: () => void;
    handleSubmit: (
        onValid: SubmitHandler<FieldValues>,
        onInvalid?: SubmitErrorHandler<FieldValues>
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    control?: any;
    onSubmit: (data: any) => void;
    open: IOpen;
    errors?: any;
    price?: number;
    watch: UseFormWatch<FieldValues>;
    priceStatus?: "success" | "danger" | "warning";
};