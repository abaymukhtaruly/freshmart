"use client";

import { useRef, useState, useTransition } from "react";
import { uploadProductImage } from "@/actions/upload";

type ImageUploadFieldProps = {
  name?: string;
  defaultValue?: string | null;
};

export default function ImageUploadField({
  name = "imageUrl",
  defaultValue,
}: ImageUploadFieldProps) {
  const [imageUrl, setImageUrl] = useState(defaultValue ?? "");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    setError(null);
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      const result = await uploadProductImage(formData);
      if (result.success && result.data?.url) {
        setImageUrl(result.data.url);
      } else if (!result.success) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="sm:col-span-2 space-y-3">
      <label className="block text-sm font-medium text-text-primary">Изображение</label>

      {imageUrl ? (
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="Превью"
            className="w-24 h-24 rounded-lg object-cover border border-border bg-background"
          />
          <button
            type="button"
            onClick={() => setImageUrl("")}
            className="text-xs text-accent hover:underline"
          >
            Удалить
          </button>
        </div>
      ) : null}

      <input type="hidden" name={name} value={imageUrl} />

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="bg-white border border-border text-sm font-medium px-4 py-2 rounded-lg hover:border-primary transition-colors disabled:opacity-50"
        >
          {pending ? "Загрузка..." : "Загрузить файл"}
        </button>
        <span className="text-xs text-muted">или вставьте URL ниже</span>
      </div>

      <input
        type="url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="https://..."
        className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
      />

      {error && (
        <p className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}
