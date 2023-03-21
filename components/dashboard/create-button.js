import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/ds-layout.module.css';


function CreateButton() {
  
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const tooltipRef = useRef(null);

  function handleClickOutsideTooltip(event) {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsTooltipOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideTooltip);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideTooltip);
    };
  }, []);


  function handleCreateButtonClick() {
    setIsTooltipOpen(!isTooltipOpen);
  }

  return (
    <div>
      <button onClick={handleCreateButtonClick}>Create</button>
      {isTooltipOpen && (
        <div className={styles['tooltip-dropdown']} ref={tooltipRef}>
          <button>By Form</button>
          <button>By API</button>
        </div>
      )}
    </div>
  );
}

export default CreateButton