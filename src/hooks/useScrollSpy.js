import { useEffect } from 'react';

const useScrollSpy = (sectionIds) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newHash = `#${entry.target.id}`;
            
            if (window.location.hash !== newHash) {
                window.history.replaceState(null, null, newHash);
            }
          }
        });
      },
      {
        threshold: 0.6, 
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);
};

export default useScrollSpy;