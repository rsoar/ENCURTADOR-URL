const express = require('express')
const router = express.Router()
const urlModel = require('./model/urlModel')
const validUrl = require('valid-url')
const short_id = require('shortid')

const baseUrl = 'http://localhost:3000'

router.post('/shorten', async (req, res) => {

    const { urlRec } = req.body

    try{
        //verifica se a url base é valida
        const isValid = validUrl.isUri(baseUrl)
        if (!isValid)
         return res.send({
            error: "Invalid base URL"
        })

        const urlCode = short_id.generate()

        //verifica se a url recebida é inválida - caso seja retorna erro
        if (!validUrl.isUri(urlRec))
         return res.send({
            error: "Invalid URL"
        })

        let url = await urlModel.findOne({ urlRec })
        if(!url){
            const urlEnc = `${baseUrl}/${urlCode}`
            url = new urlModel({
                urlRec,
                urlEnc,
                urlCode,
            })
            await url.save()
            res.send({ url })

        }else{
            return res.send({ url })
        }

    }catch(err){
        console.log(err)
        return res.status(400).send({
            error: 'bad request'
        })
    }
})

router.get('/:code', async (req, res) => {

    const { code } = req.params

    try{
        const url = await urlModel.findOne({ urlCode: code })
        if(!url)
         return res.send({
             error: 'URL not found'
         })
        return res.redirect(url.urlRec)

    }catch(err){
        console.log(err)
        return res.status(400).send({
            error: 'bad request'
        })
    }
})

module.exports = router
