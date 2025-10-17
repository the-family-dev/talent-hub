import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import { Button, Input } from "@heroui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export const StartPage = observer(() => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>();

  return (
    <div className="flex items-center justify-center h-full m-6">
      <div className="max-w-4xl justify-center bg-gray-100 dark:bg-gray-900 p-32 rounded-3xl">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Добро пожаловать в TalentHub
          </h1>
        </div>
        <div className="flex flex-row p-2 gap-4">
          <Input
            size="lg"
            isClearable
            onClear={() => setSearch("")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Профессия, компания или стек"
            startContent={
              <MagnifyingGlassIcon className="w-5 h-5 text-default-400 pointer-events-none shrink-0" />
            }
            classNames={{
              inputWrapper: "bg-white dark:bg-gray-800",
              input: "text-gray-900 dark:text-gray-100",
            }}
          />
          <Button
            size="lg"
            color="primary"
            variant="solid"
            onPress={() => navigate("vacancy")}
          >
            Найти
          </Button>
        </div>
      </div>
    </div>
  );
});
