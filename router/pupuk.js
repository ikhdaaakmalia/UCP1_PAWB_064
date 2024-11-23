import express, { Router } from "express";

const router = express.Router();
const pupuk = [
    {
        id: 1,
        Nama: "Urea",
        Jenis: "Kimia",
        Stok: "200",
    },
    {
        id: 2,
        Nama: "Kompos",
        Jenis: "Organik",
        Stok: "100",
    }
];

// Mendapatkan semua pupuk
router.get("/", (req, res) => {
    res.send(pupuk);
});

// Menambahkan pupuk baru
router.post('/', (req, res) => {
    const { Nama, Jenis, Stok } = req.body;

    if (!Nama || !Jenis || !Stok) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const newPupuk = {
        id: pupuk.length + 1, 
        Nama, 
        Jenis, 
        Stok,
    };

    pupuk.push(newPupuk);
    res.status(201).json(newPupuk);
});

// Menghapus pupuk berdasarkan ID
router.delete('/:id', (req, res) => {
    const pupukIndex = pupuk.findIndex(p => p.id === parseInt(req.params.id));
    if (pupukIndex === -1) return res.status(404).json({ message: 'Pupuk tidak ditemukan' });

    const deletedPupuk = pupuk.splice(pupukIndex, 1)[0];
    res.status(200).json({ message: `Pupuk '${deletedPupuk.Nama}' telah dihapus` });
});

// Memperbarui pupuk berdasarkan ID
router.put('/:id', (req, res) => {
    const pupukId = parseInt(req.params.id);
    const pupukIndex = pupuk.findIndex(p => p.id === pupukId);
    if (pupukIndex === -1) return res.status(404).json({ message: `'${pupukId}' pupuk tidak ditemukan` });

    const { Nama, Jenis, Stok } = req.body;

    if (Nama) pupuk[pupukIndex].Nama = Nama;
    if (Jenis) pupuk[pupukIndex].Jenis = Jenis;
    if (Stok) pupuk[pupukIndex].Stok = Stok;

    res.status(200).json({
        message: `Pupuk dengan ID '${pupukId}' telah diperbarui`,
        updatedPupuk: pupuk[pupukIndex]
    });
});

export default router;
