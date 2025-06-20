'use client';

import { Copy, Server, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import React, { useState } from "react";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}
const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin",
};
const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive",
};
export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant = "public",
}) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <Alert>
            <Server className="h-4 w-4" />
            <AlertTitle className="flex items-center gap-x-3 flex-wrap">
                {title}
                <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-y-2 gap-x-2 w-full">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all max-w-full flex-1">
                    {description}
                </code>
                <Button variant="outline" size="icon" onClick={onCopy} className="mt-2 sm:mt-0">
                    {copied ? <Check /> : <Copy />}
                </Button>
            </AlertDescription>
        </Alert>
    );
};
