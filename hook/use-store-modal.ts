import { create } from "zustand";
export interface ItemsData {
  id: number;
  itemCode: string;
  zahirCode: string;
  itemDescription: string;
  unit: string;
  group: string;
  classification: string;
  stock: number;
  image: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Session {
  user?: {
      id?: string | null;
      name?: string | null;
      image?: string | null;
      username?: string | null;
  };
}

interface useStoreModalStore {
  isOpen: boolean;
  isEdit: boolean;
  isMounted: boolean;
  rowsItems: ItemsData[]; // Menyimpan array data
  selectedItems: ItemsData | null; // Menyimpan data terpilih
  ItemsId: number;
  session: Session | null;
  onOpen: () => void;
  onClose: () => void;
  onEdit: () => void;
  onMounted: () => void;
  setSession: (data: Session | null) => void;
  setRowsItems: (data: ItemsData[]) => void; // Mengupdate rowsItems
  setSelectedItems: (data: ItemsData | null) => void; // Mengupdate selectedItems
  setItemsId: (data: number) => void;
  setEdit: () => void;
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
  isOpen: false,
  isEdit: false,
  isMounted: false,
  rowsItems: [], // Inisialisasi rowsItems dengan array kosong
  selectedItems: null, // Inisialisasi dengan null
  ItemsId: 0,
  session: null,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, isEdit: false }),
  onEdit: () => set({ isEdit: true }),
  onMounted: () => set({ isMounted: true }),
  setRowsItems: (data) => set({ rowsItems: data }), // Mengupdate rowsItems
  setSelectedItems: (data) => set({ selectedItems: data }), // Mengupdate selectedItems
  setItemsId: (data) => set({ ItemsId: data }),
  setEdit: () => set({ isEdit: false }),
  setSession: (data) => set({ session: data }),
}));
