import { useEffect, useState } from 'react'
import { useJournalsContext } from '../hooks/useJournalsContext.js';

// components
import JournalDetails from '../components/JournalPreviews.js'

const Home = () => {

    console.log("Home component rendered");

    // const [journals, setJournals] = useState(null)
    const {journals, dispatch} = useJournalsContext()

    useEffect(() => {
        const fetchJournals = async () => {
            const response = await fetch('/api/journals')
            const json = await response.json()

            console.log(response);
            console.log(json);

            if (response.ok) {
                // setJournals(json)
                dispatch({type: 'SET_JOURNALS', payload: json})
            }
        }

        fetchJournals()
    }, [])

    return (
        <div className="home">
            <div className="journals">
                {journals && journals.map((journal) => (
                    <JournalDetails key={journal._id} journal={journal} />
                ))}
            </div>
        </div>
    );

}

export default Home;