// ==================== DATA STORE ====================
let items = [];
let assets = [];
let categories = [
    { id: 1, nama: 'Elektronik', subKategori: ['Komputer', 'Printer', 'Proyektor', 'AC'] },
    { id: 2, nama: 'Furniture', subKategori: ['Meja', 'Kursi', 'Lemari', 'Rak'] },
    { id: 3, nama: 'Alat Lab', subKategori: ['Mikroskop', 'Alat Ukur', 'Peralatan Medis'] },
    { id: 4, nama: 'Kendaraan', subKategori: ['Mobil', 'Motor', 'Ambulans'] },
    { id: 5, nama: 'Perlengkapan Kantor', subKategori: ['ATK', 'Perlengkapan Rapat'] }
];
let locations = [
    { id: 1, nama: 'Ruang Lab Komputer', gedung: 'Gedung A', lantai: 'Lantai 2' },
    { id: 2, nama: 'Ruang Kelas 101', gedung: 'Gedung A', lantai: 'Lantai 1' },
    { id: 3, nama: 'Ruang Dosen', gedung: 'Gedung B', lantai: 'Lantai 1' },
    { id: 4, nama: 'Lab Keperawatan', gedung: 'Gedung C', lantai: 'Lantai 1' },
    { id: 5, nama: 'Perpustakaan', gedung: 'Gedung A', lantai: 'Lantai 3' },
    { id: 6, nama: 'Gudang', gedung: 'Gedung D', lantai: 'Lantai 1' }
];
let history = [];
let maintenanceHistory = [];
let itemCounter = 1;
let assetCounter = 1;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    updateDashboard();
    renderAllTables();
    setupEventListeners();
    generateItemCode();
    generateAssetCode();
    populateDropdowns();
});

function initializeData() {
    // Sample Items
    items = [
        { id: 1, nama: 'Komputer Desktop HP', kode: 'INVT-2025-0001', kategori: 'Elektronik', subKategori: 'Komputer', kondisi: 'Bagus', lokasi: 'Ruang Lab Komputer', tanggalMasuk: '2025-01-15', supplier: 'PT Datacom', kepemilikan: 'Institusi', jumlah: 20, keterangan: 'Unit baru untuk lab', foto: null },
        { id: 2, nama: 'Proyektor Epson', kode: 'INVT-2025-0002', kategori: 'Elektronik', subKategori: 'Proyektor', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101', tanggalMasuk: '2025-02-10', supplier: 'CV Tekno Jaya', kepemilikan: 'Institusi', jumlah: 5, keterangan: '', foto: null },
        { id: 3, nama: 'Meja Dosen', kode: 'INVT-2025-0003', kategori: 'Furniture', subKategori: 'Meja', kondisi: 'Bagus', lokasi: 'Ruang Dosen', tanggalMasuk: '2024-08-20', supplier: 'UD Mebel Jaya', kepemilikan: 'Institusi', jumlah: 15, keterangan: '', foto: null },
        { id: 4, nama: 'Printer Canon', kode: 'INVT-2025-0004', kategori: 'Elektronik', subKategori: 'Printer', kondisi: 'Proses Perbaikan', lokasi: 'Ruang Dosen', tanggalMasuk: '2024-03-05', supplier: 'PT Canon Indonesia', kepemilikan: 'Hibah', jumlah: 3, keterangan: 'Toner habis', foto: null },
        { id: 5, nama: 'AC Daikin 2PK', kode: 'INVT-2025-0005', kategori: 'Elektronik', subKategori: 'AC', kondisi: 'Rusak', lokasi: 'Ruang Kelas 101', tanggalMasuk: '2023-06-15', supplier: 'PT Cool Teknik', kepemilikan: 'Institusi', jumlah: 2, keterangan: 'Kompresor rusak', foto: null },
        { id: 6, nama: 'Mikroskop Digital', kode: 'INVT-2025-0006', kategori: 'Alat Lab', subKategori: 'Mikroskop', kondisi: 'Bagus', lokasi: 'Lab Keperawatan', tanggalMasuk: '2025-03-01', supplier: 'PT Labindo', kepemilikan: 'Hibah', jumlah: 10, keterangan: 'Hibah dari Kemenkes', foto: null },
        { id: 7, nama: 'Kursi Kuliah', kode: 'INVT-2025-0007', kategori: 'Furniture', subKategori: 'Kursi', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101', tanggalMasuk: '2024-07-20', supplier: 'CV Furniture Pro', kepemilikan: 'Institusi', jumlah: 100, keterangan: '', foto: null },
        { id: 8, nama: 'Lemari Arsip', kode: 'INVT-2025-0008', kategori: 'Furniture', subKategori: 'Lemari', kondisi: 'Bagus', lokasi: 'Ruang Dosen', tanggalMasuk: '2024-05-10', supplier: 'UD Mebel Jaya', kepemilikan: 'Institusi', jumlah: 8, keterangan: '', foto: null }
    ];
    itemCounter = 9;

    // Sample Assets
    assets = [
        { id: 1, nama: 'Gedung Utama', kode: 'AST-2025-0001', jenisAset: 'Tetap', kategori: 'Bangunan', nilaiPerolehan: 15000000000, tanggalPembelian: '2010-01-01', umurEkonomis: 40, lokasi: 'Kampus Utama', keterangan: 'Gedung utama kampus' },
        { id: 2, nama: 'Tanah Kampus', kode: 'AST-2025-0002', jenisAset: 'Tetap', kategori: 'Tanah', nilaiPerolehan: 25000000000, tanggalPembelian: '2005-01-01', umurEkonomis: 0, lokasi: 'Kampus Utama', keterangan: 'Luas 5 hektar' },
        { id: 3, nama: 'Mobil Operasional Toyota Innova', kode: 'AST-2025-0003', jenisAset: 'Tetap', kategori: 'Kendaraan', nilaiPerolehan: 450000000, tanggalPembelian: '2022-06-15', umurEkonomis: 8, lokasi: 'Parkiran', keterangan: 'Kendaraan operasional' },
        { id: 4, nama: 'Ambulans', kode: 'AST-2025-0004', jenisAset: 'Tetap', kategori: 'Kendaraan', nilaiPerolehan: 650000000, tanggalPembelian: '2021-03-20', umurEkonomis: 10, lokasi: 'Parkiran', keterangan: 'Ambulans untuk praktik' },
        { id: 5, nama: 'Server Dell PowerEdge', kode: 'AST-2025-0005', jenisAset: 'Tetap', kategori: 'Elektronik', nilaiPerolehan: 250000000, tanggalPembelian: '2023-01-10', umurEkonomis: 5, lokasi: 'Ruang Server', keterangan: 'Server utama' },
        { id: 6, nama: 'Set Furniture Lab', kode: 'AST-2025-0006', jenisAset: 'Non-Tetap', kategori: 'Perabotan', nilaiPerolehan: 75000000, tanggalPembelian: '2024-02-15', umurEkonomis: 5, lokasi: 'Lab Keperawatan', keterangan: '' }
    ];
    assetCounter = 7;

    // Sample History
    history = [
        { id: 1, itemId: 1, itemName: 'Komputer Desktop HP', type: 'masuk', date: '2025-01-15', from: '-', to: 'Ruang Lab Komputer', description: 'Barang baru masuk dari supplier PT Datacom' },
        { id: 2, itemId: 2, itemName: 'Proyektor Epson', type: 'masuk', date: '2025-02-10', from: '-', to: 'Ruang Kelas 101', description: 'Barang baru masuk dari supplier CV Tekno Jaya' },
        { id: 3, itemId: 4, itemName: 'Printer Canon', type: 'status', date: '2025-03-01', from: 'Bagus', to: 'Proses Perbaikan', description: 'Toner habis, menunggu penggantian' },
        { id: 4, itemId: 5, itemName: 'AC Daikin 2PK', type: 'status', date: '2025-02-20', from: 'Bagus', to: 'Rusak', description: 'Kompresor rusak, butuh perbaikan mayor' },
        { id: 5, itemId: 6, itemName: 'Mikroskop Digital', type: 'masuk', date: '2025-03-01', from: '-', to: 'Lab Keperawatan', description: 'Hibah dari Kementerian Kesehatan' }
    ];

    // Sample Maintenance
    maintenanceHistory = [
        { id: 1, assetId: 3, assetName: 'Mobil Operasional Toyota Innova', date: '2024-12-15', type: 'Service Rutin', cost: 2500000, description: 'Ganti oli dan tune up' },
        { id: 2, assetId: 4, assetName: 'Ambulans', date: '2024-11-20', type: 'Perbaikan', cost: 5000000, description: 'Perbaikan sistem AC' },
        { id: 3, assetId: 5, assetName: 'Server Dell PowerEdge', date: '2025-01-05', type: 'Upgrade', cost: 15000000, description: 'Upgrade RAM dan storage' }
    ];
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            if (page) showPage(page);
        });
    });

    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Global Search
    document.getElementById('globalSearch').addEventListener('input', function(e) {
        globalSearch(e.target.value);
    });

    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // Category change for sub-category
    setTimeout(() => {
        const itemKategori = document.getElementById('itemKategori');
        if (itemKategori) {
            itemKategori.addEventListener('change', function() {
                updateSubCategories(this.value);
            });
        }
    }, 100);
}

// ==================== NAVIGATION ====================
function showPage(pageName) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === pageName) item.classList.add('active');
    });

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(pageName + 'Page').classList.add('active');

    const pageNames = {
        'dashboard': 'Dashboard', 'inventaris': 'Inventaris Barang', 'aset': 'Manajemen Aset',
        'kategori': 'Kategori', 'lokasi': 'Lokasi', 'laporan': 'Laporan & Export',
        'depresiasi': 'Depresiasi Aset', 'riwayat': 'Riwayat Pergerakan', 'scanner': 'Scan QR/Barcode'
    };
    document.getElementById('currentPage').textContent = pageNames[pageName] || pageName;
    
    // Close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');

    ['asetTetapTab', 'asetNonTetapTab', 'perawatanTab'].forEach(id => {
        document.getElementById(id).style.display = id === tabId ? 'block' : 'none';
    });
}

// ==================== MODAL FUNCTIONS ====================
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    if (modalId === 'addItemModal') generateItemCode();
    else if (modalId === 'addAssetModal') generateAssetCode();
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// ==================== CODE GENERATION ====================
function generateItemCode() {
    const year = new Date().getFullYear();
    const code = `INVT-${year}-${String(itemCounter).padStart(4, '0')}`;
    const el = document.getElementById('generatedCode');
    if (el) el.value = code;
    return code;
}

function generateAssetCode() {
    const year = new Date().getFullYear();
    const code = `AST-${year}-${String(assetCounter).padStart(4, '0')}`;
    const el = document.getElementById('generatedAssetCode');
    if (el) el.value = code;
    return code;
}

// ==================== DROPDOWN POPULATION ====================
function populateDropdowns() {
    ['itemKategori', 'filterKategori'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const first = select.options[0];
            select.innerHTML = '';
            select.appendChild(first);
            categories.forEach(cat => {
                const opt = document.createElement('option');
                opt.value = cat.nama;
                opt.textContent = cat.nama;
                select.appendChild(opt);
            });
        }
    });

    ['itemLokasi', 'filterLokasi', 'assetLokasi'].forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            const first = select.options[0];
            select.innerHTML = '';
            select.appendChild(first);
            locations.forEach(loc => {
                const opt = document.createElement('option');
                opt.value = loc.nama;
                opt.textContent = `${loc.nama} - ${loc.gedung}`;
                select.appendChild(opt);
            });
        }
    });
}

function updateSubCategories(kategoriNama) {
    const subSelect = document.getElementById('itemSubKategori');
    if (!subSelect) return;
    subSelect.innerHTML = '<option value="">Pilih Sub-Kategori</option>';
    const kategori = categories.find(c => c.nama === kategoriNama);
    if (kategori && kategori.subKategori) {
        kategori.subKategori.forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub;
            opt.textContent = sub;
            subSelect.appendChild(opt);
        });
    }
}

// ==================== CRUD OPERATIONS ====================
function saveItem() {
    const form = document.getElementById('addItemForm');
    const formData = new FormData(form);
    
    const newItem = {
        id: itemCounter,
        nama: formData.get('nama'),
        kode: document.getElementById('generatedCode').value,
        kategori: formData.get('kategori'),
        subKategori: formData.get('subKategori'),
        kondisi: formData.get('kondisi'),
        lokasi: formData.get('lokasi'),
        tanggalMasuk: formData.get('tanggalMasuk'),
        supplier: formData.get('supplier'),
        kepemilikan: formData.get('kepemilikan'),
        jumlah: parseInt(formData.get('jumlah')) || 1,
        keterangan: formData.get('keterangan'),
        foto: null
    };

    if (!newItem.nama || !newItem.kategori || !newItem.kondisi || !newItem.lokasi || !newItem.tanggalMasuk || !newItem.kepemilikan) {
        showToast('error', 'Error', 'Mohon lengkapi semua field yang wajib diisi');
        return;
    }

    items.push(newItem);
    itemCounter++;

    history.unshift({
        id: history.length + 1, itemId: newItem.id, itemName: newItem.nama, type: 'masuk',
        date: newItem.tanggalMasuk, from: '-', to: newItem.lokasi,
        description: `Barang baru masuk${newItem.supplier ? ' dari supplier ' + newItem.supplier : ''}`
    });

    if (newItem.kondisi === 'Rusak') {
        showToast('warning', 'Notifikasi', `${newItem.nama} tercatat dalam kondisi rusak`);
    }

    closeModal('addItemModal');
    form.reset();
    generateItemCode();
    updateDashboard();
    renderAllTables();
    showToast('success', 'Berhasil', 'Barang berhasil ditambahkan');
}

function saveAsset() {
    const form = document.getElementById('addAssetForm');
    const formData = new FormData(form);
    
    const newAsset = {
        id: assetCounter,
        nama: formData.get('nama'),
        kode: document.getElementById('generatedAssetCode').value,
        jenisAset: formData.get('jenisAset'),
        kategori: formData.get('kategori'),
        nilaiPerolehan: parseFloat(formData.get('nilaiPerolehan')) || 0,
        tanggalPembelian: formData.get('tanggalPembelian'),
        umurEkonomis: parseInt(formData.get('umurEkonomis')) || 5,
        lokasi: formData.get('lokasi'),
        keterangan: formData.get('keterangan')
    };

    if (!newAsset.nama || !newAsset.jenisAset || !newAsset.kategori || !newAsset.nilaiPerolehan || !newAsset.tanggalPembelian) {
        showToast('error', 'Error', 'Mohon lengkapi semua field yang wajib diisi');
        return;
    }

    assets.push(newAsset);
    assetCounter++;

    closeModal('addAssetModal');
    form.reset();
    generateAssetCode();
    updateDashboard();
    renderAllTables();
    showToast('success', 'Berhasil', 'Aset berhasil ditambahkan');
}

function saveKategori() {
    const form = document.getElementById('addKategoriForm');
    const formData = new FormData(form);
    const nama = formData.get('nama');
    const subStr = formData.get('subKategori');
    
    if (!nama) { showToast('error', 'Error', 'Nama kategori harus diisi'); return; }

    categories.push({
        id: categories.length + 1,
        nama: nama,
        subKategori: subStr ? subStr.split(',').map(s => s.trim()).filter(s => s) : []
    });

    closeModal('addKategoriModal');
    form.reset();
    populateDropdowns();
    renderKategoriTable();
    showToast('success', 'Berhasil', 'Kategori berhasil ditambahkan');
}

function saveLokasi() {
    const form = document.getElementById('addLokasiForm');
    const formData = new FormData(form);
    const nama = formData.get('nama');
    
    if (!nama) { showToast('error', 'Error', 'Nama lokasi harus diisi'); return; }

    locations.push({
        id: locations.length + 1,
        nama: nama,
        gedung: formData.get('gedung') || '-',
        lantai: formData.get('lantai') || '-'
    });

    closeModal('addLokasiModal');
    form.reset();
    populateDropdowns();
    renderLokasiTable();
    showToast('success', 'Berhasil', 'Lokasi berhasil ditambahkan');
}

function deleteItem(id) {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
        items = items.filter(item => item.id !== id);
        updateDashboard();
        renderAllTables();
        showToast('success', 'Berhasil', 'Barang berhasil dihapus');
    }
}

function deleteAsset(id) {
    if (confirm('Apakah Anda yakin ingin menghapus aset ini?')) {
        assets = assets.filter(asset => asset.id !== id);
        updateDashboard();
        renderAllTables();
        showToast('success', 'Berhasil', 'Aset berhasil dihapus');
    }
}

function deleteKategori(id) {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
        categories = categories.filter(c => c.id !== id);
        populateDropdowns();
        renderKategoriTable();
        showToast('success', 'Berhasil', 'Kategori berhasil dihapus');
    }
}

function deleteLokasi(id) {
    if (confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) {
        locations = locations.filter(l => l.id !== id);
        populateDropdowns();
        renderLokasiTable();
        showToast('success', 'Berhasil', 'Lokasi berhasil dihapus');
    }
}

// ==================== EDIT FUNCTIONS ====================
function editItem(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    // Populate edit dropdowns
    populateEditDropdowns();

    // Fill form with item data
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editNama').value = item.nama;
    document.getElementById('editKode').value = item.kode;
    document.getElementById('editKategori').value = item.kategori;
    
    // Update sub-categories and set value
    updateEditSubCategories(item.kategori);
    setTimeout(() => {
        document.getElementById('editSubKategori').value = item.subKategori || '';
    }, 50);
    
    document.getElementById('editKondisi').value = item.kondisi;
    document.getElementById('editLokasi').value = item.lokasi;
    document.getElementById('editTanggalMasuk').value = item.tanggalMasuk;
    document.getElementById('editKepemilikan').value = item.kepemilikan;
    document.getElementById('editSupplier').value = item.supplier || '';
    document.getElementById('editJumlah').value = item.jumlah;
    document.getElementById('editKeterangan').value = item.keterangan || '';

    openModal('editItemModal');
}

function populateEditDropdowns() {
    // Kategori dropdown
    const editKategori = document.getElementById('editKategori');
    editKategori.innerHTML = '<option value="">Pilih Kategori</option>';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.nama;
        opt.textContent = cat.nama;
        editKategori.appendChild(opt);
    });

    // Lokasi dropdown
    const editLokasi = document.getElementById('editLokasi');
    editLokasi.innerHTML = '<option value="">Pilih Lokasi</option>';
    locations.forEach(loc => {
        const opt = document.createElement('option');
        opt.value = loc.nama;
        opt.textContent = `${loc.nama} - ${loc.gedung}`;
        editLokasi.appendChild(opt);
    });

    // Asset lokasi dropdown
    const editAssetLokasi = document.getElementById('editAssetLokasi');
    if (editAssetLokasi) {
        editAssetLokasi.innerHTML = '<option value="">Pilih Lokasi</option>';
        locations.forEach(loc => {
            const opt = document.createElement('option');
            opt.value = loc.nama;
            opt.textContent = `${loc.nama} - ${loc.gedung}`;
            editAssetLokasi.appendChild(opt);
        });
    }

    // Add change listener for category
    document.getElementById('editKategori').addEventListener('change', function() {
        updateEditSubCategories(this.value);
    });
}

function updateEditSubCategories(kategoriNama) {
    const subSelect = document.getElementById('editSubKategori');
    if (!subSelect) return;
    subSelect.innerHTML = '<option value="">Pilih Sub-Kategori</option>';
    const kategori = categories.find(c => c.nama === kategoriNama);
    if (kategori && kategori.subKategori) {
        kategori.subKategori.forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub;
            opt.textContent = sub;
            subSelect.appendChild(opt);
        });
    }
}

function updateItem() {
    const id = parseInt(document.getElementById('editItemId').value);
    const itemIndex = items.findIndex(i => i.id === id);
    if (itemIndex === -1) return;

    const oldItem = items[itemIndex];
    const oldKondisi = oldItem.kondisi;
    const oldLokasi = oldItem.lokasi;

    // Update item data
    items[itemIndex] = {
        ...oldItem,
        nama: document.getElementById('editNama').value,
        kategori: document.getElementById('editKategori').value,
        subKategori: document.getElementById('editSubKategori').value,
        kondisi: document.getElementById('editKondisi').value,
        lokasi: document.getElementById('editLokasi').value,
        tanggalMasuk: document.getElementById('editTanggalMasuk').value,
        kepemilikan: document.getElementById('editKepemilikan').value,
        supplier: document.getElementById('editSupplier').value,
        jumlah: parseInt(document.getElementById('editJumlah').value) || 1,
        keterangan: document.getElementById('editKeterangan').value
    };

    const newItem = items[itemIndex];

    // Add to history if status changed
    if (oldKondisi !== newItem.kondisi) {
        history.unshift({
            id: history.length + 1,
            itemId: newItem.id,
            itemName: newItem.nama,
            type: 'status',
            date: new Date().toISOString().split('T')[0],
            from: oldKondisi,
            to: newItem.kondisi,
            description: `Status berubah dari ${oldKondisi} menjadi ${newItem.kondisi}`
        });

        // Notification for broken items
        if (newItem.kondisi === 'Rusak') {
            showToast('warning', 'Notifikasi', `${newItem.nama} tercatat dalam kondisi rusak`);
        }
    }

    // Add to history if location changed
    if (oldLokasi !== newItem.lokasi) {
        history.unshift({
            id: history.length + 1,
            itemId: newItem.id,
            itemName: newItem.nama,
            type: 'pindah',
            date: new Date().toISOString().split('T')[0],
            from: oldLokasi,
            to: newItem.lokasi,
            description: `Dipindahkan dari ${oldLokasi} ke ${newItem.lokasi}`
        });
    }

    closeModal('editItemModal');
    updateDashboard();
    renderAllTables();
    showToast('success', 'Berhasil', 'Data barang berhasil diperbarui');
}

function editAsset(id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) return;

    // Populate edit dropdowns
    populateEditDropdowns();

    // Fill form with asset data
    document.getElementById('editAssetId').value = asset.id;
    document.getElementById('editAssetNama').value = asset.nama;
    document.getElementById('editAssetKode').value = asset.kode;
    document.getElementById('editJenisAset').value = asset.jenisAset;
    document.getElementById('editAssetKategori').value = asset.kategori;
    document.getElementById('editNilaiPerolehan').value = asset.nilaiPerolehan;
    document.getElementById('editTanggalPembelian').value = asset.tanggalPembelian;
    document.getElementById('editUmurEkonomis').value = asset.umurEkonomis;
    document.getElementById('editAssetLokasi').value = asset.lokasi || '';
    document.getElementById('editAssetKeterangan').value = asset.keterangan || '';

    openModal('editAssetModal');
}

function updateAsset() {
    const id = parseInt(document.getElementById('editAssetId').value);
    const assetIndex = assets.findIndex(a => a.id === id);
    if (assetIndex === -1) return;

    const oldAsset = assets[assetIndex];

    // Update asset data
    assets[assetIndex] = {
        ...oldAsset,
        nama: document.getElementById('editAssetNama').value,
        jenisAset: document.getElementById('editJenisAset').value,
        kategori: document.getElementById('editAssetKategori').value,
        nilaiPerolehan: parseFloat(document.getElementById('editNilaiPerolehan').value) || 0,
        tanggalPembelian: document.getElementById('editTanggalPembelian').value,
        umurEkonomis: parseInt(document.getElementById('editUmurEkonomis').value) || 0,
        lokasi: document.getElementById('editAssetLokasi').value,
        keterangan: document.getElementById('editAssetKeterangan').value
    };

    closeModal('editAssetModal');
    updateDashboard();
    renderAllTables();
    showToast('success', 'Berhasil', 'Data aset berhasil diperbarui');
}

// ==================== VIEW ITEM/ASSET ====================
function viewItem(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    document.getElementById('viewItemContent').innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
            <div>
                <h3 style="margin-bottom:20px;font-size:18px;">Informasi Barang</h3>
                <div class="depreciation-info">
                    <div class="depreciation-item"><label>Nama Barang</label><strong>${item.nama}</strong></div>
                    <div class="depreciation-item"><label>Kode</label><strong>${item.kode}</strong></div>
                    <div class="depreciation-item"><label>Kategori</label><strong>${item.kategori}${item.subKategori ? ' - ' + item.subKategori : ''}</strong></div>
                    <div class="depreciation-item"><label>Lokasi</label><strong>${item.lokasi}</strong></div>
                    <div class="depreciation-item"><label>Kondisi</label><strong><span class="status-badge ${item.kondisi.toLowerCase().replace(/ /g,'')}">${item.kondisi}</span></strong></div>
                    <div class="depreciation-item"><label>Kepemilikan</label><strong><span class="ownership-badge ${item.kepemilikan.toLowerCase()}">${item.kepemilikan === 'Institusi' ? 'Milik Institusi' : 'Hibah'}</span></strong></div>
                    <div class="depreciation-item"><label>Tanggal Masuk</label><strong>${formatDate(item.tanggalMasuk)}</strong></div>
                    <div class="depreciation-item"><label>Jumlah</label><strong>${item.jumlah} unit</strong></div>
                </div>
                ${item.supplier ? `<p style="margin-top:12px;"><strong>Supplier:</strong> ${item.supplier}</p>` : ''}
                ${item.keterangan ? `<p style="margin-top:8px;"><strong>Keterangan:</strong> ${item.keterangan}</p>` : ''}
            </div>
            <div>
                <h3 style="margin-bottom:20px;font-size:18px;">QR Code</h3>
                <div class="qr-container" id="qrCodeContainer">
                    <div class="qr-code" id="qrCode"></div>
                    <div class="qr-label">${item.kode}</div>
                    <div class="qr-sublabel">${item.nama}</div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const qrContainer = document.getElementById('qrCode');
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: JSON.stringify({ kode: item.kode, nama: item.nama, lokasi: item.lokasi }),
            width: 150, height: 150, colorDark: '#1e3a5f', colorLight: '#ffffff'
        });
    }, 100);

    openModal('viewItemModal');
}

function viewAsset(id) {
    const asset = assets.find(a => a.id === id);
    if (!asset) return;

    const dep = calculateDepreciation(asset);
    
    document.getElementById('viewItemContent').innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
            <div>
                <h3 style="margin-bottom:20px;font-size:18px;">Informasi Aset</h3>
                <div class="depreciation-info">
                    <div class="depreciation-item"><label>Nama Aset</label><strong>${asset.nama}</strong></div>
                    <div class="depreciation-item"><label>Kode</label><strong>${asset.kode}</strong></div>
                    <div class="depreciation-item"><label>Jenis Aset</label><strong>${asset.jenisAset}</strong></div>
                    <div class="depreciation-item"><label>Kategori</label><strong>${asset.kategori}</strong></div>
                    <div class="depreciation-item"><label>Nilai Perolehan</label><strong>${formatCurrency(asset.nilaiPerolehan)}</strong></div>
                    <div class="depreciation-item"><label>Tanggal Pembelian</label><strong>${formatDate(asset.tanggalPembelian)}</strong></div>
                    <div class="depreciation-item"><label>Umur Ekonomis</label><strong>${asset.umurEkonomis} tahun</strong></div>
                    <div class="depreciation-item"><label>Lokasi</label><strong>${asset.lokasi || '-'}</strong></div>
                </div>
                <h3 style="margin:24px 0 20px;font-size:18px;">Informasi Depresiasi</h3>
                <div class="depreciation-info">
                    <div class="depreciation-item"><label>Depresiasi/Tahun</label><strong>${formatCurrency(dep.perYear)}</strong></div>
                    <div class="depreciation-item"><label>Depresiasi/Bulan</label><strong>${formatCurrency(dep.perMonth)}</strong></div>
                    <div class="depreciation-item"><label>Akumulasi Depresiasi</label><strong>${formatCurrency(dep.accumulated)}</strong></div>
                    <div class="depreciation-item"><label>Nilai Buku</label><strong>${formatCurrency(dep.bookValue)}</strong></div>
                </div>
            </div>
            <div>
                <h3 style="margin-bottom:20px;font-size:18px;">QR Code</h3>
                <div class="qr-container" id="qrCodeContainer">
                    <div class="qr-code" id="qrCode"></div>
                    <div class="qr-label">${asset.kode}</div>
                    <div class="qr-sublabel">${asset.nama}</div>
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const qrContainer = document.getElementById('qrCode');
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: JSON.stringify({ kode: asset.kode, nama: asset.nama, nilai: asset.nilaiPerolehan }),
            width: 150, height: 150, colorDark: '#1e3a5f', colorLight: '#ffffff'
        });
    }, 100);

    openModal('viewItemModal');
}

// ==================== DEPRECIATION ====================
function calculateDepreciation(asset) {
    if (asset.umurEkonomis === 0 || asset.kategori === 'Tanah') {
        return { perYear: 0, perMonth: 0, accumulated: 0, bookValue: asset.nilaiPerolehan };
    }

    const perYear = asset.nilaiPerolehan / asset.umurEkonomis;
    const perMonth = perYear / 12;
    
    const purchaseDate = new Date(asset.tanggalPembelian);
    const now = new Date();
    const monthsDiff = (now.getFullYear() - purchaseDate.getFullYear()) * 12 + (now.getMonth() - purchaseDate.getMonth());
    
    const accumulated = Math.min(monthsDiff * perMonth, asset.nilaiPerolehan);
    const bookValue = Math.max(asset.nilaiPerolehan - accumulated, 0);

    return { perYear, perMonth, accumulated, bookValue };
}

// ==================== RENDER FUNCTIONS ====================
function updateDashboard() {
    document.getElementById('totalBarang').textContent = items.length;
    document.getElementById('barangBagus').textContent = items.filter(i => i.kondisi === 'Bagus').length;
    document.getElementById('barangPerbaikan').textContent = items.filter(i => i.kondisi === 'Proses Perbaikan').length;
    document.getElementById('barangRusak').textContent = items.filter(i => i.kondisi === 'Rusak').length;
    document.getElementById('inventarisCount').textContent = items.length;

    let totalNilai = 0, totalDepresiasi = 0, totalBuku = 0, depresiasiTahunan = 0;
    assets.forEach(asset => {
        const dep = calculateDepreciation(asset);
        totalNilai += asset.nilaiPerolehan;
        totalDepresiasi += dep.accumulated;
        totalBuku += dep.bookValue;
        depresiasiTahunan += dep.perYear;
    });

    document.getElementById('totalNilaiAset').textContent = formatNumber(totalNilai);
    document.getElementById('totalDepresiasi').textContent = formatNumber(totalDepresiasi);
    document.getElementById('nilaiBuku').textContent = formatNumber(totalBuku);

    document.getElementById('totalAset').textContent = assets.length;
    document.getElementById('asetTetap').textContent = assets.filter(a => a.jenisAset === 'Tetap').length;
    document.getElementById('asetNonTetap').textContent = assets.filter(a => a.jenisAset === 'Non-Tetap').length;
    document.getElementById('depresiasiTahunan').textContent = formatNumber(depresiasiTahunan);

    document.getElementById('totalPerolehan').textContent = formatNumber(totalNilai);
    document.getElementById('akumulasiDepresiasi').textContent = formatNumber(totalDepresiasi);
    document.getElementById('totalNilaiBuku').textContent = formatNumber(totalBuku);
}

function renderAllTables() {
    renderItemsTable();
    renderRecentItems();
    renderAsetTable();
    renderKategoriTable();
    renderLokasiTable();
    renderDepresiasiTable();
    renderHistoryTimeline();
    renderMaintenanceTable();
}

function renderItemsTable(filteredItems = null) {
    const data = filteredItems || items;
    const tbody = document.getElementById('itemsTable');
    document.getElementById('itemCount').textContent = `${data.length} item`;
    document.getElementById('totalItems').textContent = data.length;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;"><p style="color:var(--text-secondary);">Belum ada data barang</p></td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(item => `
        <tr>
            <td><div class="item-info"><div class="item-image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div><div class="item-details"><h4>${item.nama}</h4><span>${item.jumlah} unit</span></div></div></td>
            <td><code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;font-size:12px;">${item.kode}</code></td>
            <td>${item.kategori}${item.subKategori ? '<br><small style="color:var(--text-secondary);">' + item.subKategori + '</small>' : ''}</td>
            <td>${item.lokasi}</td>
            <td><span class="status-badge ${item.kondisi.toLowerCase().replace(/ /g,'')}">${item.kondisi}</span></td>
            <td><span class="ownership-badge ${item.kepemilikan.toLowerCase()}">${item.kepemilikan === 'Institusi' ? 'Institusi' : 'Hibah'}</span></td>
            <td><div class="action-btns">
                <button class="action-btn" onclick="viewItem(${item.id})" title="Lihat Detail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                <button class="action-btn" onclick="editItem(${item.id})" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button class="action-btn danger" onclick="deleteItem(${item.id})" title="Hapus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button>
            </div></td>
        </tr>
    `).join('');
}

function renderRecentItems() {
    const recent = items.slice(-5).reverse();
    document.getElementById('recentCount').textContent = `${recent.length} item`;
    document.getElementById('recentItemsTable').innerHTML = recent.map(item => `
        <tr>
            <td><div class="item-info"><div class="item-image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div><div class="item-details"><h4>${item.nama}</h4><span>${item.jumlah} unit</span></div></div></td>
            <td><code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;font-size:12px;">${item.kode}</code></td>
            <td>${item.kategori}</td>
            <td>${item.lokasi}</td>
            <td><span class="status-badge ${item.kondisi.toLowerCase().replace(/ /g,'')}">${item.kondisi}</span></td>
            <td><span class="ownership-badge ${item.kepemilikan.toLowerCase()}">${item.kepemilikan === 'Institusi' ? 'Institusi' : 'Hibah'}</span></td>
        </tr>
    `).join('');
}

function renderAsetTable() {
    const tetap = assets.filter(a => a.jenisAset === 'Tetap');
    const nonTetap = assets.filter(a => a.jenisAset === 'Non-Tetap');

    document.getElementById('asetTetapCount').textContent = `${tetap.length} item`;
    document.getElementById('asetNonTetapCount').textContent = `${nonTetap.length} item`;

    document.getElementById('asetTetapTable').innerHTML = tetap.map(asset => {
        const dep = calculateDepreciation(asset);
        return `<tr>
            <td><div class="item-info"><div class="item-image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path></svg></div><div class="item-details"><h4>${asset.nama}</h4><span>${asset.kategori}</span></div></div></td>
            <td><code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;font-size:12px;">${asset.kode}</code></td>
            <td>${formatCurrency(asset.nilaiPerolehan)}</td>
            <td>${asset.umurEkonomis > 0 ? asset.umurEkonomis + ' tahun' : '-'}</td>
            <td>${formatCurrency(dep.perYear)}/tahun</td>
            <td>${formatCurrency(dep.bookValue)}</td>
            <td><div class="action-btns">
                <button class="action-btn" onclick="viewAsset(${asset.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                <button class="action-btn" onclick="editAsset(${asset.id})" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button class="action-btn danger" onclick="deleteAsset(${asset.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button>
            </div></td>
        </tr>`;
    }).join('');

    document.getElementById('asetNonTetapTable').innerHTML = nonTetap.map(asset => `
        <tr>
            <td><div class="item-info"><div class="item-image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle></svg></div><div class="item-details"><h4>${asset.nama}</h4><span>${asset.kategori}</span></div></div></td>
            <td><code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;font-size:12px;">${asset.kode}</code></td>
            <td>${formatCurrency(asset.nilaiPerolehan)}</td>
            <td>${formatDate(asset.tanggalPembelian)}</td>
            <td>${asset.lokasi || '-'}</td>
            <td><div class="action-btns">
                <button class="action-btn" onclick="viewAsset(${asset.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                <button class="action-btn" onclick="editAsset(${asset.id})" title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button class="action-btn danger" onclick="deleteAsset(${asset.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button>
            </div></td>
        </tr>
    `).join('');
}

function renderKategoriTable() {
    document.getElementById('kategoriCount').textContent = `${categories.length} kategori`;
    document.getElementById('kategoriTable').innerHTML = categories.map(cat => {
        const count = items.filter(i => i.kategori === cat.nama).length;
        return `<tr>
            <td><strong>${cat.nama}</strong></td>
            <td>${cat.subKategori.length > 0 ? cat.subKategori.join(', ') : '-'}</td>
            <td>${count} barang</td>
            <td><div class="action-btns"><button class="action-btn danger" onclick="deleteKategori(${cat.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button></div></td>
        </tr>`;
    }).join('');
}

function renderLokasiTable() {
    document.getElementById('lokasiCount').textContent = `${locations.length} lokasi`;
    document.getElementById('lokasiTable').innerHTML = locations.map(loc => {
        const count = items.filter(i => i.lokasi === loc.nama).length;
        return `<tr>
            <td><strong>${loc.nama}</strong></td>
            <td>${loc.gedung}</td>
            <td>${loc.lantai}</td>
            <td>${count} barang</td>
            <td><div class="action-btns"><button class="action-btn danger" onclick="deleteLokasi(${loc.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button></div></td>
        </tr>`;
    }).join('');
}

function renderDepresiasiTable() {
    const depreciable = assets.filter(a => a.umurEkonomis > 0);
    document.getElementById('depresiasiTable').innerHTML = depreciable.map(asset => {
        const dep = calculateDepreciation(asset);
        return `<tr>
            <td><div class="item-details"><h4>${asset.nama}</h4><span style="color:var(--text-secondary);font-size:12px;">${asset.kode}</span></div></td>
            <td>${formatCurrency(asset.nilaiPerolehan)}</td>
            <td>${asset.umurEkonomis} tahun</td>
            <td>${formatCurrency(dep.perYear)}</td>
            <td>${formatCurrency(dep.perMonth)}</td>
            <td>${formatCurrency(dep.accumulated)}</td>
            <td><strong>${formatCurrency(dep.bookValue)}</strong></td>
        </tr>`;
    }).join('');
}

function renderHistoryTimeline() {
    const labels = { 'masuk': 'Barang Masuk', 'pindah': 'Perpindahan', 'status': 'Perubahan Status' };
    document.getElementById('historyTimeline').innerHTML = history.map(h => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(h.date)}</div>
            <div class="timeline-content">
                <div class="timeline-title">${labels[h.type]} - ${h.itemName}</div>
                <div class="timeline-desc">${h.description}</div>
            </div>
        </div>
    `).join('');
}

function renderMaintenanceTable() {
    document.getElementById('perawatanCount').textContent = `${maintenanceHistory.length} item`;
    document.getElementById('perawatanTable').innerHTML = maintenanceHistory.map(m => `
        <tr>
            <td><strong>${m.assetName}</strong></td>
            <td>${formatDate(m.date)}</td>
            <td>${m.type}</td>
            <td>${formatCurrency(m.cost)}</td>
            <td>${m.description}</td>
        </tr>
    `).join('');
}

// ==================== FILTER & SEARCH ====================
function filterItems() {
    const kategori = document.getElementById('filterKategori').value;
    const status = document.getElementById('filterStatus').value;
    const lokasi = document.getElementById('filterLokasi').value;

    let filtered = items;
    if (kategori) filtered = filtered.filter(i => i.kategori === kategori);
    if (status) filtered = filtered.filter(i => i.kondisi === status);
    if (lokasi) filtered = filtered.filter(i => i.lokasi === lokasi);

    renderItemsTable(filtered);
}

function globalSearch(query) {
    if (!query) { renderItemsTable(); return; }
    const q = query.toLowerCase();
    const filtered = items.filter(i => 
        i.nama.toLowerCase().includes(q) || i.kode.toLowerCase().includes(q) ||
        i.kategori.toLowerCase().includes(q) || i.lokasi.toLowerCase().includes(q)
    );
    renderItemsTable(filtered);
}

function searchByCode() {
    const code = document.getElementById('manualCode').value.trim();
    if (!code) { showToast('warning', 'Perhatian', 'Masukkan kode barang terlebih dahulu'); return; }

    const item = items.find(i => i.kode.toLowerCase() === code.toLowerCase());
    const asset = assets.find(a => a.kode.toLowerCase() === code.toLowerCase());

    const resultContainer = document.getElementById('scanResult');
    const resultContent = document.getElementById('scanResultContent');

    if (item) {
        resultContainer.style.display = 'block';
        resultContent.innerHTML = `
            <div class="depreciation-info">
                <div class="depreciation-item"><label>Nama Barang</label><strong>${item.nama}</strong></div>
                <div class="depreciation-item"><label>Kode</label><strong>${item.kode}</strong></div>
                <div class="depreciation-item"><label>Kategori</label><strong>${item.kategori}</strong></div>
                <div class="depreciation-item"><label>Lokasi</label><strong>${item.lokasi}</strong></div>
                <div class="depreciation-item"><label>Kondisi</label><strong><span class="status-badge ${item.kondisi.toLowerCase().replace(/ /g,'')}">${item.kondisi}</span></strong></div>
                <div class="depreciation-item"><label>Kepemilikan</label><strong><span class="ownership-badge ${item.kepemilikan.toLowerCase()}">${item.kepemilikan === 'Institusi' ? 'Institusi' : 'Hibah'}</span></strong></div>
            </div>
            <div style="margin-top:20px;"><button class="btn btn-primary" onclick="viewItem(${item.id})">Lihat Detail Lengkap</button></div>
        `;
    } else if (asset) {
        resultContainer.style.display = 'block';
        const dep = calculateDepreciation(asset);
        resultContent.innerHTML = `
            <div class="depreciation-info">
                <div class="depreciation-item"><label>Nama Aset</label><strong>${asset.nama}</strong></div>
                <div class="depreciation-item"><label>Kode</label><strong>${asset.kode}</strong></div>
                <div class="depreciation-item"><label>Jenis</label><strong>${asset.jenisAset}</strong></div>
                <div class="depreciation-item"><label>Kategori</label><strong>${asset.kategori}</strong></div>
                <div class="depreciation-item"><label>Nilai Perolehan</label><strong>${formatCurrency(asset.nilaiPerolehan)}</strong></div>
                <div class="depreciation-item"><label>Nilai Buku</label><strong>${formatCurrency(dep.bookValue)}</strong></div>
            </div>
            <div style="margin-top:20px;"><button class="btn btn-primary" onclick="viewAsset(${asset.id})">Lihat Detail Lengkap</button></div>
        `;
    } else {
        resultContainer.style.display = 'block';
        resultContent.innerHTML = `<div class="empty-state"><h3>Tidak Ditemukan</h3><p>Barang dengan kode "${code}" tidak ditemukan dalam sistem</p></div>`;
    }
}

// ==================== EXPORT FUNCTIONS ====================
function exportToExcel() {
    const data = items.map(item => ({
        'Kode': item.kode, 'Nama Barang': item.nama, 'Kategori': item.kategori,
        'Sub-Kategori': item.subKategori || '-', 'Kondisi': item.kondisi, 'Lokasi': item.lokasi,
        'Tanggal Masuk': item.tanggalMasuk, 'Supplier': item.supplier || '-',
        'Kepemilikan': item.kepemilikan, 'Jumlah': item.jumlah, 'Keterangan': item.keterangan || '-'
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventaris');
    XLSX.writeFile(wb, `Inventaris_STIK_${formatDateFile(new Date())}.xlsx`);
    showToast('success', 'Berhasil', 'Data berhasil di-export ke Excel');
}

function exportReport(type) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN INVENTARIS BARANG', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('STIK Sint Carolus', 105, 28, { align: 'center' });
    doc.text(`Tanggal: ${formatDate(new Date().toISOString().split('T')[0])}`, 105, 36, { align: 'center' });

    doc.setFontSize(11);
    doc.text(`Total Barang: ${items.length}`, 14, 50);
    doc.text(`Kondisi Bagus: ${items.filter(i => i.kondisi === 'Bagus').length}`, 14, 58);
    doc.text(`Proses Perbaikan: ${items.filter(i => i.kondisi === 'Proses Perbaikan').length}`, 14, 66);
    doc.text(`Rusak: ${items.filter(i => i.kondisi === 'Rusak').length}`, 14, 74);

    doc.autoTable({
        startY: 85,
        head: [['Kode', 'Nama', 'Kategori', 'Lokasi', 'Kondisi', 'Kepemilikan']],
        body: items.map(item => [item.kode, item.nama, item.kategori, item.lokasi, item.kondisi, item.kepemilikan]),
        theme: 'striped',
        headStyles: { fillColor: [30, 58, 95] }
    });

    doc.save(`Laporan_Inventaris_STIK_${formatDateFile(new Date())}.pdf`);
    showToast('success', 'Berhasil', 'Laporan berhasil di-export ke PDF');
}

function exportAssetReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN ASET', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('STIK Sint Carolus', 105, 28, { align: 'center' });

    let totalNilai = 0, totalBuku = 0;
    assets.forEach(a => {
        const dep = calculateDepreciation(a);
        totalNilai += a.nilaiPerolehan;
        totalBuku += dep.bookValue;
    });

    doc.setFontSize(11);
    doc.text(`Total Aset: ${assets.length}`, 14, 50);
    doc.text(`Nilai Perolehan: ${formatCurrency(totalNilai)}`, 14, 58);
    doc.text(`Total Nilai Buku: ${formatCurrency(totalBuku)}`, 14, 66);

    doc.autoTable({
        startY: 80,
        head: [['Kode', 'Nama Aset', 'Jenis', 'Nilai Perolehan', 'Nilai Buku']],
        body: assets.map(asset => {
            const dep = calculateDepreciation(asset);
            return [asset.kode, asset.nama, asset.jenisAset, formatCurrencyShort(asset.nilaiPerolehan), formatCurrencyShort(dep.bookValue)];
        }),
        theme: 'striped',
        headStyles: { fillColor: [30, 58, 95] }
    });

    doc.save(`Laporan_Aset_STIK_${formatDateFile(new Date())}.pdf`);
    showToast('success', 'Berhasil', 'Laporan aset berhasil di-export');
}

function exportDepreciationReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('landscape');

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN DEPRESIASI ASET', 148, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('STIK Sint Carolus - Metode Garis Lurus', 148, 28, { align: 'center' });

    const depreciable = assets.filter(a => a.umurEkonomis > 0);
    doc.autoTable({
        startY: 45,
        head: [['Kode', 'Nama Aset', 'Nilai Perolehan', 'Umur', 'Dep/Tahun', 'Dep/Bulan', 'Akumulasi', 'Nilai Buku']],
        body: depreciable.map(asset => {
            const dep = calculateDepreciation(asset);
            return [asset.kode, asset.nama, formatCurrencyShort(asset.nilaiPerolehan), `${asset.umurEkonomis} th`,
                formatCurrencyShort(dep.perYear), formatCurrencyShort(dep.perMonth),
                formatCurrencyShort(dep.accumulated), formatCurrencyShort(dep.bookValue)];
        }),
        theme: 'striped',
        headStyles: { fillColor: [30, 58, 95] },
        styles: { fontSize: 9 }
    });

    doc.save(`Laporan_Depresiasi_STIK_${formatDateFile(new Date())}.pdf`);
    showToast('success', 'Berhasil', 'Laporan depresiasi berhasil di-export');
}

function printQRCode() {
    const qrContainer = document.getElementById('qrCodeContainer');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>Print QR Code</title>
        <style>body{font-family:Arial,sans-serif;text-align:center;padding:40px;}.qr-label{font-weight:bold;margin-top:20px;}.qr-sublabel{color:#666;font-size:14px;}</style>
        </head><body>${qrContainer.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ==================== UTILITY FUNCTIONS ====================
function formatCurrency(value) { return 'Rp ' + value.toLocaleString('id-ID'); }
function formatCurrencyShort(value) {
    if (value >= 1e9) return 'Rp ' + (value / 1e9).toFixed(1) + ' M';
    if (value >= 1e6) return 'Rp ' + (value / 1e6).toFixed(1) + ' Jt';
    return 'Rp ' + value.toLocaleString('id-ID');
}
function formatNumber(value) {
    if (value >= 1e9) return (value / 1e9).toFixed(1) + ' M';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + ' Jt';
    return value.toLocaleString('id-ID');
}
function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
function formatDateFile(date) { return date.toISOString().split('T')[0].replace(/-/g, ''); }

function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) { preview.src = e.target.result; preview.style.display = 'block'; };
        reader.readAsDataURL(input.files[0]);
    }
}

// ==================== TOAST ====================
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'
    };

    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content"><div class="toast-title">${title}</div><div class="toast-message">${message}</div></div>
        <button class="toast-close" onclick="this.parentElement.remove()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}
