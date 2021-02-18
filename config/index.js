const dev = process.env.NODE_ENV !==
    'production'

export const server = dev ? 'http://localhost:3000' : 'https://note-taking-app-5udjynrjd.vercel.app'
// null is your website domain