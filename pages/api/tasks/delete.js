// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { table, getMinifiedRecord } from '../utils/airtable'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async (req, res) => {
    const { id } = req.body
    const { user } = getSession(req, res)
    try {
        const deletedRecords = await table.destroy([id])
        res.status(200).json(getMinifiedRecord(deletedRecords[0]))
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
})
