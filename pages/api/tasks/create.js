// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { table } from '../utils/airtable'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async (req, res) => {
    const { description } = req.body
    const { user } = getSession(req, res)

    try {
        const createdRecords = await table.create([
            { fields: { description, userId: user.sub, color: '#0000ff' } },
        ])
        const createdRecord = {
            id: createdRecords[0].id,
            fields: createdRecords[0].fields,
        }
        res.status(200).json(createdRecord)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: 'Something went wrong' })
    }
})
