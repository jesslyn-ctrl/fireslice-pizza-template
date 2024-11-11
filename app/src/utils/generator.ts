export const generateOrderNumber = (): string => {
    // Get current date in 'YYYYMMDD' format
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");

    // Generate a random 4-digit alphanumeric string for uniqueness
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();

    // Combine the date part and random part to create an order number
    return `ORD-${datePart}-${randomPart}`;
};
