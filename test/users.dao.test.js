import mongoose from "mongoose";
import User from '../src/dao/Users.dao.js'
import Assert from 'assert'

mongoose.connect('mongodb://localhost:27017/clase21_test')

const assert = Assert.strict

describe('ASSERT Testing GET method of User DAO', () => {
    before(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
        this.userDao = new User()
    })
    it('El GET debe devolver un arreglo', async function() {
        const result = await this.userDao.get()
        assert.strictEqual(Array.isArray(result), true)
    })
    it('El array que devuelve El GET debe estar vacío', async function() {
        const result = await this.userDao.get()
        assert.strictEqual(result.length, 0)
    })
})

describe('Testing SAVE method of User DAO', () => {
    before(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
        this.userDao = new User()
    })
    it('El DAO debe poder crear usuarios', async function() {
        const result = await this.userDao.save({
            first_name: 'Alex',
            last_name: 'Marin',
            email: 'alexmarinmendez@gmail.com',
            password: 'secret'
        })
        assert.ok(result._id)
    })
})

describe('Testing GETBY method of User DAO', () => {
    before(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
        this.userDao = new User()
    })
    it('El DAO debe poder buscar por email', async function() {
        const result = await this.userDao.save({
            first_name: 'Alex',
            last_name: 'Marin',
            email: 'alexmarinmendez@gmail.com',
            password: 'secret'
        })
        const user = await this.userDao.getBy({ email: 'alexmarinmendez@gmail.com'})

        assert.strictEqual(typeof user, 'object')
    })
    after(async function() {
        try {
            await mongoose.connection.collections.users.drop()
        } catch(err) {}
    })
})