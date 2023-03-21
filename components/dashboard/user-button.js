import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/ds-layout.module.css';
import usrDd from '../../styles/user-dropdown.module.css';
import { getCookie } from 'cookies-next';


export default function UserButton() {
  
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);

  //email
  const [email, setEmail] = useState("empty")

  function handleClickOutsideTooltip(event) {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsTooltipOpen(false);
    }
  }

  useEffect(() => {
    //fetch email
    setEmail(getCookie('email'))

    document.addEventListener('mousedown', handleClickOutsideTooltip);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideTooltip);
    };
  }, []);

  function handleCreateButtonClick() {
    setIsTooltipOpen(!isTooltipOpen);
  }


  


  return (
    <div 
      id="user-container"
      className={styles['container']}
      >
      <div>
        <svg 
          className={styles['user-icon']}
          title="Profile" 
          onClick={handleCreateButtonClick}>
            <title>Profile</title>
            <circle cx="50" cy="50" r="40" fill="blue" />
        </svg>
      </div>
      {isTooltipOpen && (
        <div class={`container bg-white shadow-lg rounded-2 ${usrDd['dropdown']}`}>
          <div className={`container-fluid ${usrDd['email']}`} >
            <a>{email}</a>
          </div>
          <div 
            className={`container-fluid ${usrDd['options']}`} 
            ref={tooltipRef}>
              <a 
                href='#' 
                class='text-decoration-none'>
                Profile</a>
              <a 
                href='#' 
                class='text-decoration-none'
              >Sign out</a>
          </div>
        </div>
      )}
    </div>
  );
}
