import { useState, useCallback } from "react";
import { PopoverProps } from "@material-ui/core";

// SINGLE POPOVER
export interface UseAnchorPopoverReturn {
    anchorEl: PopoverProps["anchorEl"];
    isOpen: boolean;
    handleOpen: (
        event: React.MouseEvent<
            HTMLButtonElement | HTMLDivElement | SVGSVGElement,
            MouseEvent
        >
    ) => void;
    handleClose: PopoverProps["onClose"];
}

export const useAnchorPopover = (): UseAnchorPopoverReturn => {
    const [anchorEl, setAnchorEl] =
        useState<UseAnchorPopoverReturn["anchorEl"]>(null);

    const isOpen = Boolean(anchorEl);

    const handleOpen: UseAnchorPopoverReturn["handleOpen"] = useCallback(
        (event) => {
            setAnchorEl(event.currentTarget);
        },
        []
    );

    const handleClose: UseAnchorPopoverReturn["handleClose"] =
        useCallback(() => {
            setAnchorEl(null);
        }, []);

    return {
        anchorEl,
        isOpen,
        handleOpen,
        handleClose,
    };
};

// MULTIPLE POPOVER
export interface UseMultipleAnchorPopoverReturn {
    anchorEl: {
        [key: string]: Element | null;
    };
    isOpen: (key: string | number) => boolean;
    handleOpen: (
        key: string | number
    ) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleClose: (key: string | number) => () => void;
}

export const useMultipleAnchorPopover = (): UseMultipleAnchorPopoverReturn => {
    const [anchorEl, setAnchorEl] = useState<
        UseMultipleAnchorPopoverReturn["anchorEl"]
    >({});

    const isOpen = (key: string | number) => Boolean(anchorEl[key]);

    const handleOpen: UseMultipleAnchorPopoverReturn["handleOpen"] =
        useCallback(
            (key) => (e) => {
                setAnchorEl({
                    [key]: e.currentTarget,
                });
            },
            []
        );

    const handleClose: UseMultipleAnchorPopoverReturn["handleClose"] =
        useCallback(
            (key) => () => {
                setAnchorEl((prevState) => ({
                    ...prevState,
                    [key]: null,
                }));
            },
            []
        );

    return {
        anchorEl,
        isOpen,
        handleOpen,
        handleClose,
    };
};
