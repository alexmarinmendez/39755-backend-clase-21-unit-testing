import mongoose from "mongoose";
import User from '../src/dao/Users.dao.js'
import chai from 'chai'

mongoose.connect('mongodb://localhost:27017/clase21_chai')

const expect = chai.expect

describe('CHAI Testing GET method of User DAO', () => {
    before(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
        this.userDao = new User()
    })
    it('El array que devuelve El GET debe estar vacío', async function() {
        const result = await this.userDao.get()
        expect(result).to.be.deep.equal([])
    })
    after(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
    })
})
