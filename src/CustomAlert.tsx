import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  theme,
  ThemeProvider,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

enum AlertType {
  ALERT,
  CONFIRM,
}

export interface IAlertProps {
  message: string;
  title: string;
  type: AlertType;
  hasCloseIcon?: boolean;
}

let returnResponse: (value: boolean) => void;

const AlertRoot: FC<IAlertProps> = (props) => {
  const { title, message, type, hasCloseIcon = false } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const confirm = () => {
    if (type === AlertType.CONFIRM) {
      returnResponse(true);
    }
    onClose();
  };

  const cancel = () => {
    if (type === AlertType.CONFIRM) {
      returnResponse(false);
    }
    onClose();
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader>{title}</AlertDialogHeader>
            {hasCloseIcon && <AlertDialogCloseButton />}
            <AlertDialogBody>{message}</AlertDialogBody>
            <AlertDialogFooter>
              {type === AlertType.CONFIRM && (
                <Button ref={cancelRef} onClick={cancel}>
                  No
                </Button>
              )}

              <Button colorScheme="blue" ml={3} onClick={confirm}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ThemeProvider>
    </>
  );
};

// pass in alert type
function Create(
  message: string,
  title: string,
  type: AlertType = AlertType.ALERT
) {
  const rootID = "temp";
  let div = document.getElementById(rootID);
  if (!div) {
    div = document.createElement("div");
    div.id = rootID;
    document.body.appendChild(div);
  }
  ReactDOM.render(
    <AlertRoot message={message} title={title} type={type} />,
    div
  );
  if (div) {
    div.remove();
  }
}

export function Confirm({
  message,
  title = "Confirm",
}: {
  message: string;
  title: string;
}) {
  Create(message, title, AlertType.CONFIRM);

  return new Promise<boolean>((resolve) => {
    returnResponse = resolve;
  });
}

export function Alert({
  message,
  title = "Alert",
}: {
  message: string;
  title: string;
}) {
  // pass in type
  Create(message, title, AlertType.ALERT);
}
