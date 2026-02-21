import { useState, useEffect } from 'react';
import { GuestbookService, GuestbookEntry} from '../services/guestbook_service';

const MAX_NAME_LENGTH = 50;
const MAX_MESSAGE_LENGTH = 300;
const MAX_EMAIL_LENGTH = 100;

const Guestbook = ({
  colors = {
    mainColor: 'purple',                     // used for borders, buttons, inputs
    backgroundColor: 'rgba(53, 6, 59, 0.5)', // container bg
    inputBackground: 'rgba(53, 6, 59, 0.2)', // inputs bg
    textColor: 'white',                       // text inside inputs, container
    errorText: 'red',                         // error messages
    entryBackground: 'rgba(53, 6, 59, 0.3)', // entries background
    entryEmailText: '#bbb',                   // email text color in entries
  },
}) => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (name.trim() === '') {
      setError('Name is required.');
      return;
    }
    if (message.trim() === '') {
      setError('Message is required.');
      return;
    }
    if (email.trim() !== '' && !validateEmail(email.trim())) {
      setError('Please enter a valid email or leave it blank.');
      return;
    } 

    const newEntry = await GuestbookService.createEntryGuestbookPost({
      name: name.trim(),
      email: email.trim() === '' ? undefined : email.trim(),
      message: message.trim(),
    }) 
    setEntries([newEntry, ...entries]);
    setName('');
    setEmail('');
    setMessage('');
  };

  useEffect(() => {
    GuestbookService.listEntriesGuestbookGet().then(setEntries).catch(console.error);
  }, []);

  const boxStyle = {
    width: '180px',
    height:'365px',
    padding: '7px',
    borderRadius: '4px',
    border: `5px double ${colors.mainColor}`,
    backgroundColor: colors.backgroundColor,
    color: colors.textColor,
    zIndex: 2,
  };

  const inputStyle = {
    padding: '4px',
    maxWidth: '100%',
    backgroundColor: colors.inputBackground,
    border: `solid 2px ${colors.mainColor}`,
    color: colors.textColor,
  };

  const buttonStyle = {
    padding: '8px 16px',
    width: '100%',
    backgroundColor: colors.mainColor,
    color: colors.textColor,
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const entryStyle = {
    marginBottom: '0.75rem',
    borderBottom: `1px solid ${colors.mainColor}`,
    paddingBottom: '0.75rem',
    backgroundColor: colors.entryBackground,
    color: colors.textColor,
    padding: '3px',
  };

  return (
    <div style={{ margin: '0', display: 'flex', flexDirection: 'row', gap: '5px' }}>
      <div style={boxStyle}>
        <h2 style={{margin: '10px'}}>Guestbook</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', width: '100%' }}>
          <div style={{ marginBottom: '7px', display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              required
            />
            <small>
              {name.length}/{MAX_NAME_LENGTH}
            </small>
          </div>

          <div style={{ marginBottom: '7px', display: 'flex', flexDirection: 'column'  }}>
            <input
              type="email"
              placeholder="Your email (optional)"
              value={email}
              maxLength={MAX_EMAIL_LENGTH}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
            <small>
              {email.length}/{MAX_EMAIL_LENGTH}
            </small>
          </div>

          <div style={{ marginBottom: '7px', display: 'flex', flexDirection: 'column'  }}>
            <textarea
              placeholder="Your message"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...inputStyle, minHeight: '100px', }}
              required
            />
            <small>
              {message.length}/{MAX_MESSAGE_LENGTH}
            </small>
          </div>

          {error && <p style={{ color: colors.errorText, marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" style={buttonStyle}>
            Sign Guestbook
          </button>
        </form>
      </div>

      <div style={{...boxStyle , overflowY: 'hidden' }}>
        <h2 style={{margin: '10px'}}>Entries</h2>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', height:'90%', padding: 0, margin: 0, overflowY: 'scroll'  }}>
            {entries.map((entry) => (
              <li key={entry.id} style={entryStyle}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    marginBottom: '0.1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                  }}
                >
                  <strong>{entry.name}</strong>
                  <em style={{color: '#bbb'}}>
                    {String(new Date(entry.created_at).getDate()).padStart(2, '0')}/
                    {String(new Date(entry.created_at).getMonth() + 1).padStart(2, '0')}/
                    {String(new Date(entry.created_at).getFullYear()).slice(-2)}
                  </em>
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '12px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    color: colors.entryEmailText,
                    textAlign: 'left',
                  }}
                >
                  {entry.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Guestbook;
