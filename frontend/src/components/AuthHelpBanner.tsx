import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const AuthHelpBanner = () => {
  return (
    <div className="rounded-md bg-warning-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon className="size-6  text-warning" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-warning">
            Обратите внимание
          </h3>
          <div className="mt-2 text-sm text-warning-600">
            <p>
              Для упрощения авторизации логин используется как идентификатор для
              аккаунта.
            </p>
            <p>Используйте логин для входа</p>
          </div>
        </div>
      </div>
    </div>
  );
};
