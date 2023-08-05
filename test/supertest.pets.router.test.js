import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Adotpme', () => {
    describe('Test de Mascotas', () => {
        it('En el endpoint POST /api/pets debe registrar una mascota', async() => {
            const response = await requester.post('/api/pets').send({
                name: 'Firulais',
                specie: 'dog',
                birthDate: '10-10-2020'
            })
            expect(response._body.payload).to.have.property('_id')
        })
    })
})