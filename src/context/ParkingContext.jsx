import { createContext, useState, useContext } from 'react';

const ParkingContext = createContext();

export const ParkingProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // --- GENERATE 3 FLOORS OF SLOTS ---
  const generateSlots = () => {
    const floors = [1, 2, 3];
    let allSlots = [];
    
    floors.forEach(floor => {
      for (let i = 1; i <= 8; i++) { // 8 slots per floor
        allSlots.push({
          id: `${floor}-${i}`, // Unique ID like 1-1, 2-1
          label: `${floor === 1 ? 'A' : floor === 2 ? 'B' : 'C'}-${i < 10 ? '0'+i : i}`,
          floor: floor,
          type: i % 3 === 0 ? 'SUV' : 'Compact',
          price: i % 3 === 0 ? 20 : 10,
          status: Math.random() < 0.3 ? 'occupied' : 'free' // Randomize status
        });
      }
    });
    return allSlots;
  };

  const [slots, setSlots] = useState(generateSlots());

  const register = (data) => setUser(data);
  
  const login = (username, password) => {
    if (user && user.username === username && user.password === password) return true;
    return false;
  };
  
  const logout = () => setUser(null);

  const bookSlot = (id) => {
    setSlots(prev => prev.map(s => s.id === id ? { ...s, status: 'occupied' } : s));
  };

  const getSlot = (id) => slots.find(s => s.id === id);

  return (
    <ParkingContext.Provider value={{ user, register, login, logout, slots, bookSlot, getSlot }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => useContext(ParkingContext);