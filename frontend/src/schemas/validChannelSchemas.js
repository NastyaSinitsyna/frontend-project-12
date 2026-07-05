import * as yup from 'yup'

export const validChannelSchema = (channels) => yup.object().shape({
    name: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channels.map(ch => ch.name), 'Должно быть уникальным')
  })
