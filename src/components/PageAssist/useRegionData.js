import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const useRegionData = (regionId) => {
    const [description, setDescription] = useState("Loading content...");
    const [isSaving, setIsSaving] = useState(false);
    
    const defaultText = `Content coming soon!`;

    useEffect(() => {
        const fetchData = async () => {
            if (!regionId) return;
            const docRef = doc(db, "regions", regionId);
            
            try {
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data().description;
                    setDescription(data || defaultText);
                } else {
                    setDescription(defaultText);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setDescription("Error loading content.");
            }
        };

        fetchData();
    }, [regionId]);

    const saveDescription = async (newText) => {
        setIsSaving(true);
        try {
            const docRef = doc(db, "regions", regionId);
            await setDoc(docRef, { description: newText }, { merge: true });
            setDescription(newText || defaultText);
    
            return true;
        } catch (error) {
            console.error("Error saving:", error);
            alert("Failed to save.");
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    return { description, saveDescription, isSaving };
};

export default useRegionData;