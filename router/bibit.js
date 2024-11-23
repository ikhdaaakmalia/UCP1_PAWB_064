import express, { Router } from "express";

const router = express.Router();
const bibit = [
    {
        id : 1,
        Nama : "Kangkung",
        Jenis : "Tumbuhan",
        Stok : "100",
    },
    {
        id : 2,
        Nama : "Sawi",
        Jenis : "Tumbuhan",
        Stok : "50",
    }
];

router.get ("/", (req, res)=>{
    res.send(bibit);
})

router.post('/',(req, res)=>{
    const { Nama, Jenis, Stok} = req.body; 

    if (!Nama || !Jenis || !Stok) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const newbibit = {
        id: bibit.length + 1, 
        Nama, 
        Jenis,
        Stok,
    };

    bibit.push(newbibit); 
    res.status(201).json(newbibit); 
});

router.delete('/:id', (req, res) => {
    const bibitIndex = bibit.findIndex(t => t.id === parseInt(req.params.id));
    if (bibitIndex === -1) return res.status(404).json({ message: 'bibit tidak ditemukan' });

    const deletedbibit = bibit.splice(bibitIndex, 1)[0];
    res.status(200).json({ message: `bibit '${deletedbibit.Jenis}' telah dihapus` });
});

router.put('/:id', (req, res) => {
    const bibitId = parseInt(req.params.id);
    const bibitIndex = bibit.findIndex(t => t.id === bibitId);
    if (bibitIndex === -1) res.status(404).json({message: `'${bibitId}'bibit tidak ditemukan`});

    const {Nama, Jenis, Stok } = req.body;

    if (Nama) bibit[bibitIndex].Nama = Nama;
    if (Jenis) bibit[bibitIndex].Jenis = Jenis;
    if (Stok) bibit[bibitIndex].Stok = Stok;

    res.status(200).json({
        message: `Bibit dengan '${bibitIndex}' telah diperbarui`, 
        updatebibit:bibit[bibitIndex]
    });
});
export default router;