import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 30000,
  video: false,
  e2e: {
    supportFile: false,
    env: {
        user1: {
          userSurName: 'Max',
          userLastName: 'Mustermann',
          userOccupation: 'Teacher',
          userAge: 37,
          userEmail: 'max.mustermann@gmail.com',
          userPassword: 'abcd1234'
         },
         user2: {
          userSurName: 'Jeff',
          userLastName: 'Jefferson',
          userOccupation: 'Developer',
          userAge: 43,
          userEmail: 'jeff.jefferson@web.de',
          userPassword: 'abcd1234'
         },
      },
    setupNodeEvents(on, config){
        // events!
        on('task', {
          log(message) {
            console.log(message)
        
            return null
          },
        })
    }
  },
})
