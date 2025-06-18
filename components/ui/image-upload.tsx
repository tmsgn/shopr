'use client'

import { useRef, useState, useEffect } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
    onChange: (value: string) => void;
    disabled: boolean;
    value: string | null;
    onRemove: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    disabled,
    value,
    onRemove
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (value) {
            setPreview(value);
        } else {
            setPreview(null);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onChange(url);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onRemove(value || "");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                {preview && (
                    <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={handleRemove}
                                variant="destructive"
                                size="icon"
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <img
                            src={preview}
                            alt="Preview"
                            className="object-cover w-full h-full"
                        />
                    </div>
                )}
            </div>
            {!preview && (
                <Button
                    variant="secondary"
                    disabled={disabled}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <ImagePlus className="h-4 w-4" />
                    Upload an image
                </Button>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={disabled}
            />
        </div>
    );
};

export default ImageUpload;