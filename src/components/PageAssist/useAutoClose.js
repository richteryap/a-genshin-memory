import { useEffect } from 'react';

const useAutoClose = (isOpen, onClose, timeoutDelay = 4000) => {
    
    useEffect(() => {
        if (!isOpen) return;

        let timeoutId;

        const performClose = () => {
            onClose();
        };

        const resetTimer = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(performClose, timeoutDelay);
        };

        resetTimer();

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('keydown', resetTimer);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        };
    }, [isOpen, onClose, timeoutDelay]);
};

export default useAutoClose;