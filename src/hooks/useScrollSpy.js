import { useEffect } from 'react';

const useScrollSpy = (sectionIds) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentHash = window.location.hash;

            // Grab everything after the "?"
            const hashQuery = currentHash.includes('?') ? currentHash.substring(currentHash.indexOf('?')) : '';
            
            // Build the new base hash and combine it with the existing query parameters
            const newHashBase = `#${entry.target.id}`;
            const newHashFull = newHashBase + hashQuery;
            
            if (!currentHash.startsWith(newHashBase)) {
                window.history.replaceState(null, null, newHashFull);
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