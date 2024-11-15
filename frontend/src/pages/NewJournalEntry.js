import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NewJournalEntry = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const savedTitle = localStorage.getItem('journalTitle') || `Journal Entry for ${getCurrentDateTime()}`;

  const [userId, setUserId] = useState("67346b1a46df5f1942305b90") // harusnya userId sesuai current session's user
  const [title, setTitle] = useState(savedTitle)
  const [content, setContent] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // harusnya userId sesuai current session's user
    const journal = { userId, isPublic, title, content } // harusnya ada journalPhotos

    const response = await fetch('api/journals', {
      method: 'POST',
      body: JSON.stringify(journal),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      // setUserId
      setIsPublic(true)
      setTitle("")
      setContent("")
      setError(null)
      console.log("New Journal Entry Added!", json)
    }

  }

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }], // Alignment options
      ['clean'], // Clear formatting
    ],
  }

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'align',
    'color', 'background'
  ]

  const handleSwitch = (value) => {
    setIsPublic(value);
  };

  useEffect(() => {
    localStorage.setItem('journalTitle', title);
  }, [title]);

  return (
    <div className='new-journal-page'>
      <div className="top-container">
        <input
          className="title-input"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Title...'
        />
        <div className="segmented-switch">
          <button
            className={`switch-button ${isPublic ? 'active' : ''}`}
            onClick={() => handleSwitch(true)}
          >
            Public
          </button>
          <button
            className={`switch-button ${!isPublic ? 'active' : ''}`}
            onClick={() => handleSwitch(false)}
          >
            Private
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <button type="submit" className="upload-btn">
            Upload
          </button>
        </form>
      </div>
      <div className="react-quill-container">
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </div>
      {error && <div className='error'>{error}</div>}
    </div>
  )
}

export default NewJournalEntry