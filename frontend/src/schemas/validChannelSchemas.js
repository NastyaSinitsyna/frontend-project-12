import * as yup from 'yup'
import i18nextInstance from '../i18n/i18n.js'

export const validChannelSchema = (channels) => yup.object().shape({
    name: yup.string()
      .min(3, i18nextInstance.t('errors.nameLength'))
      .max(20, i18nextInstance.t('errors.nameLength'))
      .required()
      .notOneOf(channels.map(ch => ch.name))
  })
