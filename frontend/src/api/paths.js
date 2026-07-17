const apiPath = '/api/v1'

export default {
  signupPath: () => `${apiPath}/signup`,
  loginPath: () => `${apiPath}/login`,
  channelsPath: () => `${apiPath}/channels`,
  messagesPath: () => `${apiPath}/messages`
}
