import leoProfanity from 'leo-profanity'

leoProfanity.loadDictionary('ru')
leoProfanity.add(leoProfanity.getDictionary('en'))

export default (text) => leoProfanity.clean(text)
