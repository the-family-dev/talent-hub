import React, { useState, useRef } from "react";
import { Input, Chip, Button } from "@heroui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags = [],
  onChange,
  placeholder = "Введите тег и нажмите Enter",
  label = "Теги",
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTag = (): void => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue && !tags.includes(trimmedValue)) {
      const newTags = [...tags, trimmedValue];
      onChange(newTags);
      setInputValue("");

      // Фокусируемся обратно на инпут после добавления
      inputRef.current?.focus();
    }
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2">
        <Input
          label={label}
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          fullWidth
          endContent={
            <Button
              variant="light"
              onPress={handleAddTag}
              isIconOnly
              aria-label="Добавить тег"
              className="item-end"
            >
              <PlusIcon className="size-6" />
            </Button>
          }
        />
      </div>

      <div className="flex flex-wrap gap-2 min-h-[50px]">
        {tags.map((tag, index) => (
          <Chip
            key={`${tag}-${index}`}
            variant="flat"
            color="primary"
            endContent={
              <XMarkIcon
                className="h-4 w-4 cursor-pointer hover:text-danger transition-colors"
                onClick={() => handleRemoveTag(tag)}
              />
            }
          >
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
};
