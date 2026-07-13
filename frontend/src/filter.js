import leoProfanity from 'leo-profanity'

leoProfanity.loadDictionary('ru')
leoProfanity.addDictionary('en')

export default (text) => leoProfanity.clean(text)
