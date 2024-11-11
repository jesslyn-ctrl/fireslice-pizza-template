// utils/formatRupiah.ts
export const formatRupiah = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")},-`;
};
