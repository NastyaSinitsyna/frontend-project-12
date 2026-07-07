import leoProfanity from 'leo-profanity'

leoProfanity.loadDictionary('ru')

export default (text) => leoProfanity.clean(text)
