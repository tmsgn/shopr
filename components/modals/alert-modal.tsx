"use client"

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}
export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);
       
    if (!isMounted) {
        return null;
    }

    return(
        <Modal title="Are you sure?" description="This action can't be undone" isOpen={isOpen} onClose={onClose}>
            <div className="p-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="destructive" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="default" onClick={onConfirm}>
                    {loading ? "Loading..." : "Continue"}
                </Button>
            </div>
        </Modal>
    )
};