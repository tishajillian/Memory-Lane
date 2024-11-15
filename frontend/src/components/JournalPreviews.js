import React from 'react'

const JournalDetails = ({ journal }) => {

  const defaultProfilePicture = '/images/default-profile-picture.png'

  return (

    <div className="journal-preview-container">
      <div className="journal-previews">
        <div className="user-info">
          <div className="image-container">
            <img
              src={journal.userId?.profilePicture || defaultProfilePicture}
              alt="Profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
            />
          </div>
          <div className="text-container">
            <p className='text-username'>@{journal.userId?.username || "UnknownUser"}</p>
            <p>{new Date(journal.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              // hour: "2-digit",
              // minute: "2-digit"
            })}</p>
          </div>
        </div>
        <div className="journal-content">
            <h4>{ journal.title || "" }</h4>
            <div dangerouslySetInnerHTML={{ __html: journal.content }} />
        </div>
        {/* journalPhotos */}
      </div>
    </div>
  )
}

export default JournalDetails