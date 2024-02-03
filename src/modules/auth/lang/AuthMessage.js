export const AuthMessage = {
  en: {
    login:{
      placeholder: 'Password',
      forgot_password: 'Forgot password?',
      button:['Login', 'Register'],
      or: 'or',
      text: "Don't have an account?",
      link: "Sign up",
      verify: {
        title: "Your email has not been verified.",
        text: "Send a message to {email} again?",
        buttons: {
          cancel: "Cancel",
          verify: "Send",
        }
      }
    },
    reset_password: {
      send_letter: [ 'Send the letter again', 'Send a new code through'],
      title: "Reset your password",
      text: "Please enter your email address and we will send you a link to reset your password",
      placeholder: "Enter your email",
      confirm_text: [
          "Check you email for the password reset link sent to {email}",
          "Didn’t receive the email? Please check junk folder or click below to resend the link",
      ]
    },
    change_password: {
      title: "Changing password",
      text: "To change your password you need to remember the current one",
      inputs: {
        label: ["Current password","New password","Confirm new password"],
        placeholder: ["Enter current password","Enter new password","Confirm new password"],
      },
      buttons: {
        change: "Change",
        close: "Close",
      },
      wrong_password: "Пароль не совпадает",
      success: {
        title: "Successfully",
        text: "Password has been changed",
      },
    },
    registration: {
      title: "Signing up",
      steps: {
        titles: ["Creating account", "Creating password", "Confirming email"],
        inputs: {
          sub: {
            label: "Subaccount name",
            placeholder: "Enter your subaccount name",
          },
          email: {
            label: "Email",
            placeholder: "Enter your email",
          },
          password: {
            label: "Password",
            placeholder: "Enter password",
          },
          password_confirm: {
            label: "Confirm password",
            placeholder: "Confirm your password",
          },
        },
        confirm_email: {
          text: "To confirm your email please follow the link sent to {email}",
          link: "Resend email",
        }
      },
      buttons: {
        continue: "Continue",
        back: "Back",
        finish: "Log in",
      },
      message: {
        text: "By registering, you confirm that you accept our ",
        link: "Terms of Privacy Policy",
      },
      confirm_block: {
        title: "Successfully",
        message: "You’ve signed up in allbtc pool",
      },
      validate: {
        length: "Length from 8 characters",
        lowercase_letter: "Lowercase letter (a-z)",
        uppercase_letter: "Uppercase letter (A-Z)",
        characters: "Special character (!, ?, %, $ etc.)",
        number: "Digit (0-9)",
      }
    },
    google: {
      title: 'Google Authentication',
      text: 'Enter a temporary code from the Google Authenticator app to confirm your login.',
      button: 'Continue',
    },
  },
  ru: {
    login: {
      placeholder: 'Пароль',
      forgot_password: 'Забыли пароль?',
      button: ['Войти', 'Зарегистрироваться'],
      or: 'или',
      text: 'Нет аккаунта?',
      link: "Зарегистрироваться",
      verify: {
        title: "Ваша почта не подтверждена",
        text: "Отправить сообщение на почту {email} повторно?",
        buttons: {
          cancel: "Отменить",
          verify: "Отправить",
        }
      }
    },
    reset_password: {
      send_letter: ['Отправить письмо повторно', 'Отправить новый код через'],
      title: "Восстановление пароля",
      text: "Укажите email для отправки ссылки восстановления пароля",
      placeholder: "Введите ваш email",
      confirm_text: [
        "Ссылка восстановления пароля отправлена на почту {email}",
        "Не получили письмо? Проверьте папку спам или отправьте письмо повторно",
      ]
    },
    change_password: {
      title: "Изменение пароля",
      text: "Чтобы изменить пароль, вам необходимо помнить текущий",
      inputs: {
        label: ["Текущий пароль","Новый пароль","Повторите новый пароль"],
        placeholder: ["Введите текущий пароль","Введите новый пароль","Повторите новый пароль"],
      },
      buttons: {
        change: "Изменить",
        close: "Закрыть",
      },
      wrong_password: "Пароль не совпадает",
      success: {
        title: "Успешно",
        text: "Пароль изменен",
      }
    },
    registration: {
      title: "Регистрация",
      steps: {
        titles: ["Пользовательские данные", "Создание пароля", "Подтверждение почты"],
        inputs: {
          sub: {
            label: "Имя субаккаунта",
            placeholder: "Введите имя субаккаунта",
          },
          email: {
            label: "Email",
            placeholder: "Введите email",
          },
          password: {
            label: "Пароль",
            placeholder: "Введите пароль",
          },
          password_confirm: {
            label: "Повторить пароль",
            placeholder: "Введите пароль повторно",
          },
        },
        confirm_email: {
          text: "Для подтверждения регистрации перейдите по ссылке, отправленной на почту {email}",
          link: "Отправить письмо повторно",
        }
      },
      buttons: {
        continue: "Продолжить",
        back: "Назад",
        finish: "Войти в личный кабинет",
      },
      message: {
        text: "Регистрируясь, вы соглашаетесь с ",
        link: "Политикой конфиденциальности",
      },
      confirm_block: {
        title: "Успешно",
        message: "Вы зарегистрировались на Allbtc Pool",
      },
      validate: {
        length: "Длина пароля от 8 символов",
        lowercase_letter: "Строчная буква (a-z)",
        uppercase_letter: "Заглавная буква (A-Z)",
        characters: "Спецсимвол (!, ?, %, $ и др.)",
        number: "Цифра (0-9)",
      }
    },
    google: {
      title: 'Google аутентификация',
      text: "Для подтверждения входа введите временный код из приложения Google Authenticator",
      button: "Продолжить",
    }
  }
}