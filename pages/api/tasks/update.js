// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { table, getMinifiedRecord } from '../utils/airtable'
import { withApiAuthRequired } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async (req, res) => {
    const { id, fields } = req.body
    try {
        const updatedRecords = await table.update([{ id, fields }])
        res.statusCode = 200
        res.json(getMinifiedRecord(updatedRecords[0]))
    } catch (err) {
        console.error(err)
        res.statusCode = 500
        res.json({ msg: 'Something went wrong' })
    }
})
