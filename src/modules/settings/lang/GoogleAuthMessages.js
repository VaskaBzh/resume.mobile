export const GoogleAuthMessages = {
    en: {
        connect: {
            title: "Google Authentication",
            sub_title: "Connect your account to Google Authenticator using QR code or setup key",
            label: "Setup key",
            warning: "Save this setup key. You will need it if you lose your device with the Google Authenticator application.",
            button: "Connect",
            successful: {
                title: "Successfully",
                text: "You have connected to Google Authenticator",
                button: "Close"
            }
        },
        disconnect: {
            title: "Disconnecting 2FA",
            sub_title: "Please enter the code from Google Authenticator for disconnecting",
            warning: {
                text: "If you don't have access to the Google Authenticator app and can't enter your verification code, please contact support.",
                link: "Contact support",
            },
            button: "Disconnect",
            successful: {
                title: "Successfully",
                text: "You have been disconnected from two factor authentication",
                button: "Close"
            }
        }
    },
    ru: {
        connect: {
            title: "Google аутентификация",
            sub_title: "Привяжите аккаунт к Google Authenticator с помощью QR-кода или ключа настройки",
            label: "Ключ настройки",
            warning: "Важно! Сохраните данный ключ настройки. Он понадобится в том случае, если вы потеряете устройство с приложением Google Authenticator.",
            button: "Подключить",
            successful: {
                title: "Успешно",
                text: "Вы подключили двухфакторную аутентификацию с помощью Google Authenticator",
                button: "Закрыть"
            }
        },
        disconnect: {
            title: "Отключение 2FA",
            sub_title: "Для отключения введите временный код из приложения Google Authenticator",
            warning: {
                text: "Важно! Если у вас отсутствует доступ к приложению Google Authenticator, и вы не можете ввести код подтверждения, свяжитесь со службой поддержки.",
                link: "Связаться со службой поддержки",
            },
            button: "Отключить",
            successful: {
                title: "Успешно",
                text: "Вы отключили двухфакторную аутентификацию",
                button: "Закрыть"
            }
        }
    }
}