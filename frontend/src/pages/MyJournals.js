import { useEffect, useState } from 'react'
import { useJournalsContext } from '../hooks/useJournalsContext.js';
import { useAuthContext } from '../hooks/useAuthContext.js';

// components
import JournalDetails from '../components/JournalPreviews.js'

const MyJournals = () => {

    console.log("MyJournals component rendered");

    // const [journals, setJournals] = useState(null)
    const {journals, dispatch} = useJournalsContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchJournals = async () => {
            const response = await fetch('/api/journals', {
                headers: {
                    'Authorization' : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            console.log(response);
            console.log(json);

            if (response.ok) {
                // setJournals(json)
                dispatch({type: 'SET_JOURNALS', payload: json})
            }
        }

        if(user) {
            fetchJournals()
        }
    }, [dispatch,user])

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

export default MyJournals;