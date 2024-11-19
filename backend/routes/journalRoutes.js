const express = require('express')
const {
    getAllJournals,
    getMyJournals,
    getJournalById,
    createJournal,
    deleteJournal,
    updateJournal
} = require('../controllers/journalController')
const requireAuth = require('../middleware/requireAuth')


const router = express.Router()

//require auth for all journal routes
router.use(requireAuth)

router.get('/', getAllJournals)

router.get('/myjournals', getMyJournals)

router.get('/:id', getJournalById)

router.post('/', createJournal)

router.delete('/:id', deleteJournal)

router.patch('/:id', updateJournal)

module.exports = router