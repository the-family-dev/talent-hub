import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@heroui/react";
import { observer } from "mobx-react-lite";

import { vacanciesNoauthStore } from "../../noauth/vacancies/vacanciesNoauthStore";
import { FileSelect } from "../../../components/FileSelect";

export const CreateVacancyPublicRespondModal = observer(() => {
  const { vacancyId, name, phone, pdfFile, email, telegram, note } =
    vacanciesNoauthStore.publicVacancyRespond;

  const isDisabledButton = !name || !phone;

  return (
    <Modal
      size="lg"
      isOpen={Boolean(vacancyId)}
      onClose={() => vacanciesNoauthStore.resetPublicRespond()}
    >
      <ModalContent>
        <ModalHeader>Отклик</ModalHeader>

        <ModalBody className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Input
                isRequired
                value={name}
                onChange={(e) =>
                  vacanciesNoauthStore.setPublicRespondField(
                    "name",
                    e.target.value
                  )
                }
                label="ФИО"
                size="sm"
              />
              <Input
                isRequired
                errorMessage="Введите корректный номер телефона в формате +79991234567."
                pattern="^\+?\d{10,15}$"
                label="Номер телефона"
                value={phone ?? ""}
                onChange={(e) =>
                  vacanciesNoauthStore.setPublicRespondField(
                    "phone",
                    e.target.value
                  )
                }
                size="sm"
              />
            </div>
            <div className="flex flex-row gap-2">
              <Input
                value={telegram ?? ""}
                onChange={(e) =>
                  vacanciesNoauthStore.setPublicRespondField(
                    "telegram",
                    e.target.value
                  )
                }
                label="Telegram"
                size="sm"
              />
              <Input
                errorMessage="Введите корректный email."
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                value={email ?? ""}
                onChange={(e) =>
                  vacanciesNoauthStore.setPublicRespondField(
                    "email",
                    e.target.value
                  )
                }
                label="Эл. почта"
                size="sm"
              />
            </div>
            <Textarea
              value={note}
              onChange={(e) =>
                vacanciesNoauthStore.setPublicRespondField(
                  "note",
                  e.target.value
                )
              }
              placeholder="Сопроводительное письмо"
            />
            <FileSelect
              text="Загрузить резюме, файл PDF"
              allowedFileExts={[".pdf"]}
              file={pdfFile}
              onChange={(file) =>
                vacanciesNoauthStore.setPublicRespondField("pdfFile", file)
              }
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onPress={() => vacanciesNoauthStore.resetPublicRespond()}
            variant="flat"
          >
            Отмена
          </Button>
          <Button
            onPress={() => vacanciesNoauthStore.sendVacancyPublicRespond()}
            color="primary"
            isDisabled={isDisabledButton}
          >
            Отправить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});
