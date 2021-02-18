const dev = process.env.NODE_ENV !==
    'production'

export const server = dev ? 'http://localhost:3000' : 'https://note-taking-app.now.sh'
// null is your website domain