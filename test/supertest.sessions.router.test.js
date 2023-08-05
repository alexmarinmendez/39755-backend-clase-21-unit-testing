import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Adotpme', () => {
    const fakerEmail = faker.internet.email()
    describe('Test de Sessions', () => {
        it('Debe registrar un usuario', async() => {
            const response = await requester.post('/api/sessions/register').send({
                first_name: 'Alex',
                last_name: 'Marin',
                email: fakerEmail,
                password: 'secret'
            })
            expect(response._body.payload).to.be.ok
        })
        it('Debe loggear un user y DEVOLVER UNA COOKIE', async() => {
            const result = await requester.post('/api/sessions/login').send({
                email: fakerEmail,
                password: 'secret'
            })
            const cookieResult = result.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok
            
            //COOKIE_NAME=COOKIE_VALUE
            expect(cookieResult.split('=')[0]).to.be.ok.and.eql('coderCookie')
            expect(cookieResult.split('=')[1]).to.be.ok
        })
        it('Enviar cookie para ver el contenido del user', async() => {
            const result = await requester.post('/api/sessions/login').send({
                email: fakerEmail,
                password: 'secret'
            })
            const response = await requester.get('/api/sessions/current').set('Cookie', [`${result.headers['set-cookie'][0]}`])

            expect(response._body.payload.email).to.be.eql(fakerEmail)
        })
    })
})