const express = require('express')
const {
    getAllJournals,
    getJournalById,
    createJournal,
    deleteJournal,
    updateJournal
} = require('../controllers/journalController')


const router = express.Router()

router.get('/', getAllJournals)

router.get('/:id', getJournalById)

router.post('/', createJournal)

router.delete('/:id', deleteJournal)

router.patch('/:id', updateJournal)

module.exports = router