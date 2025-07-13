export const generateTimeSlot = () => {
    const slots = [];
    for (let hours = 5; hours < 23; hours++) {
        for (let minutes = 0; minutes < 60; minutes += 30) {
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`;
            slots.push(timeString);
        }
    }
    return slots;
}