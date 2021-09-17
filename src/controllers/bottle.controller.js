const { request, response } = require('express')
const bottle_type = require('../models').bottle_type


let msg = {}
const bottleGet = async (req, res) => {
    console.log(bottle_type);
    try {
        const resp = await bottle_type.findAll({ where: { deleted: false } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar los registros revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const bottleGetById = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await bottle_type.findAll({ where: { deleted: false, id: id } })
        return (resp != null && resp.length != 0) ? res.status(200).json(resp) : res.status(201).json({ error: 'fallo al recuperar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const bottleCreate = async (req = request, res = response) => {
    const { name, value } = req.body
    try {
        const resp = await bottle_type.create(
            { name, value, createdAt: new Date(), updatedAt: new Date() }
        )
        return (resp != null && resp.length != 0) ? res.status(201).json(resp) : res.status(201).json({ error: 'fallo al registrar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const bottleUpdate = async (req, res) => {
    const { id } = req.params
    const { name, value, state } = req.body
    try {
        const resp = await bottle_type.update(
            { name, value, state, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al actualizar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
const bottleDelete = async (req, res) => {
    const { id } = req.params
    try {
        const resp = await bottle_type.update(
            { deleted: true, updatedAt: new Date() },
            { where: { id: id } })
        return (resp != null && resp != 0) ? res.status(201).json(resp) : res.status(400).json({ error: 'fallo al eliminar el registro revise los datos' })
    } catch (error) {
        msg = { 'error': error, 'msg': error.message }
        console.log(msg);
        return res.status(500).json({ msg })
    }
}
module.exports = {
    bottleGet,
    bottleGetById,
    bottleCreate,
    bottleUpdate,
    bottleDelete
}