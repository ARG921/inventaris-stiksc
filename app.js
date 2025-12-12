// ==================== DATA STORE ====================
// Items now have grouped structure with individual units
let items = []; // Each item has 'units' array
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

// Helper: Get status summary for a group
function getStatusSummary(units) {
    const summary = { bagus: 0, rusak: 0, perbaikan: 0, habis: 0 };
    units.forEach(u => {
        if (u.kondisi === 'Bagus') summary.bagus++;
        else if (u.kondisi === 'Rusak') summary.rusak++;
        else if (u.kondisi === 'Proses Perbaikan') summary.perbaikan++;
        else if (u.kondisi === 'Habis') summary.habis++;
    });
    return summary;
}

// Helper: Get total units across all items
function getTotalUnits() {
    return items.reduce((total, item) => total + item.units.length, 0);
}

// Helper: Get total units by condition
function getUnitsByCondition(kondisi) {
    let count = 0;
    items.forEach(item => {
        item.units.forEach(unit => {
            if (unit.kondisi === kondisi) count++;
        });
    });
    return count;
}

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
    // Sample Items with Units (Grouped Structure)
    items = [
        { 
            id: 1, 
            nama: 'Komputer Desktop HP', 
            kodeGroup: 'INVT-2025-0001', 
            kategori: 'Elektronik', 
            subKategori: 'Komputer', 
            tanggalMasuk: '2025-01-15', 
            supplier: 'PT Datacom', 
            kepemilikan: 'Institusi',
            keterangan: 'Unit baru untuk lab',
            units: [
                { unitId: 1, kode: 'INVT-2025-0001/001', kondisi: 'Bagus', lokasi: 'Ruang Lab Komputer' },
                { unitId: 2, kode: 'INVT-2025-0001/002', kondisi: 'Bagus', lokasi: 'Ruang Lab Komputer' },
                { unitId: 3, kode: 'INVT-2025-0001/003', kondisi: 'Bagus', lokasi: 'Ruang Lab Komputer' },
                { unitId: 4, kode: 'INVT-2025-0001/004', kondisi: 'Proses Perbaikan', lokasi: 'Gudang' },
                { unitId: 5, kode: 'INVT-2025-0001/005', kondisi: 'Bagus', lokasi: 'Ruang Lab Komputer' },
            ]
        },
        { 
            id: 2, 
            nama: 'Proyektor Epson', 
            kodeGroup: 'INVT-2025-0002', 
            kategori: 'Elektronik', 
            subKategori: 'Proyektor', 
            tanggalMasuk: '2025-02-10', 
            supplier: 'CV Tekno Jaya', 
            kepemilikan: 'Institusi',
            keterangan: '',
            units: [
                { unitId: 1, kode: 'INVT-2025-0002/001', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
                { unitId: 2, kode: 'INVT-2025-0002/002', kondisi: 'Bagus', lokasi: 'Ruang Dosen' },
                { unitId: 3, kode: 'INVT-2025-0002/003', kondisi: 'Rusak', lokasi: 'Gudang' },
            ]
        },
        { 
            id: 3, 
            nama: 'Meja Dosen', 
            kodeGroup: 'INVT-2025-0003', 
            kategori: 'Furniture', 
            subKategori: 'Meja', 
            tanggalMasuk: '2024-08-20', 
            supplier: 'UD Mebel Jaya', 
            kepemilikan: 'Institusi',
            keterangan: '',
            units: [
                { unitId: 1, kode: 'INVT-2025-0003/001', kondisi: 'Bagus', lokasi: 'Ruang Dosen' },
                { unitId: 2, kode: 'INVT-2025-0003/002', kondisi: 'Bagus', lokasi: 'Ruang Dosen' },
                { unitId: 3, kode: 'INVT-2025-0003/003', kondisi: 'Bagus', lokasi: 'Ruang Dosen' },
            ]
        },
        { 
            id: 4, 
            nama: 'Kursi Kuliah', 
            kodeGroup: 'INVT-2025-0004', 
            kategori: 'Furniture', 
            subKategori: 'Kursi', 
            tanggalMasuk: '2024-07-20', 
            supplier: 'CV Furniture Pro', 
            kepemilikan: 'Institusi',
            keterangan: '',
            units: [
                { unitId: 1, kode: 'INVT-2025-0004/001', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
                { unitId: 2, kode: 'INVT-2025-0004/002', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
                { unitId: 3, kode: 'INVT-2025-0004/003', kondisi: 'Rusak', lokasi: 'Gudang' },
                { unitId: 4, kode: 'INVT-2025-0004/004', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
                { unitId: 5, kode: 'INVT-2025-0004/005', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
                { unitId: 6, kode: 'INVT-2025-0004/006', kondisi: 'Proses Perbaikan', lokasi: 'Gudang' },
                { unitId: 7, kode: 'INVT-2025-0004/007', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
                { unitId: 8, kode: 'INVT-2025-0004/008', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
            ]
        },
        { 
            id: 5, 
            nama: 'Mikroskop Digital', 
            kodeGroup: 'INVT-2025-0005', 
            kategori: 'Alat Lab', 
            subKategori: 'Mikroskop', 
            tanggalMasuk: '2025-03-01', 
            supplier: 'PT Labindo', 
            kepemilikan: 'Hibah',
            keterangan: 'Hibah dari Kemenkes',
            units: [
                { unitId: 1, kode: 'INVT-2025-0005/001', kondisi: 'Bagus', lokasi: 'Lab Keperawatan' },
                { unitId: 2, kode: 'INVT-2025-0005/002', kondisi: 'Bagus', lokasi: 'Lab Keperawatan' },
                { unitId: 3, kode: 'INVT-2025-0005/003', kondisi: 'Bagus', lokasi: 'Lab Keperawatan' },
                { unitId: 4, kode: 'INVT-2025-0005/004', kondisi: 'Bagus', lokasi: 'Lab Keperawatan' },
            ]
        },
        { 
            id: 6, 
            nama: 'AC Daikin 2PK', 
            kodeGroup: 'INVT-2025-0006', 
            kategori: 'Elektronik', 
            subKategori: 'AC', 
            tanggalMasuk: '2023-06-15', 
            supplier: 'PT Cool Teknik', 
            kepemilikan: 'Institusi',
            keterangan: '',
            units: [
                { unitId: 1, kode: 'INVT-2025-0006/001', kondisi: 'Bagus', lokasi: 'Ruang Kelas 101' },
                { unitId: 2, kode: 'INVT-2025-0006/002', kondisi: 'Rusak', lokasi: 'Ruang Kelas 101' },
            ]
        },
    ];
    itemCounter = 7;

    // Sample Assets (unchanged structure)
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
        { id: 1, itemId: 1, itemName: 'Komputer Desktop HP', unitKode: 'INVT-2025-0001/004', type: 'status', date: '2025-03-01', from: 'Bagus', to: 'Proses Perbaikan', description: 'Unit mengalami kerusakan pada power supply' },
        { id: 2, itemId: 2, itemName: 'Proyektor Epson', unitKode: 'INVT-2025-0002/003', type: 'status', date: '2025-02-20', from: 'Bagus', to: 'Rusak', description: 'Lampu proyektor mati' },
        { id: 3, itemId: 4, itemName: 'Kursi Kuliah', unitKode: 'INVT-2025-0004/003', type: 'pindah', date: '2025-02-15', from: 'Ruang Kelas 101', to: 'Gudang', description: 'Dipindahkan karena rusak' },
        { id: 4, itemId: 5, itemName: 'Mikroskop Digital', unitKode: null, type: 'masuk', date: '2025-03-01', from: '-', to: 'Lab Keperawatan', description: 'Hibah dari Kementerian Kesehatan (4 unit)' },
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
    
    const jumlah = parseInt(formData.get('jumlah')) || 1;
    const kodeGroup = document.getElementById('generatedCode').value;
    const lokasiDefault = formData.get('lokasi');
    const kondisiDefault = formData.get('kondisi');
    
    // Generate units array
    const units = [];
    for (let i = 1; i <= jumlah; i++) {
        units.push({
            unitId: i,
            kode: `${kodeGroup}/${String(i).padStart(3, '0')}`,
            kondisi: kondisiDefault,
            lokasi: lokasiDefault
        });
    }

    const newItem = {
        id: itemCounter,
        nama: formData.get('nama'),
        kodeGroup: kodeGroup,
        kategori: formData.get('kategori'),
        subKategori: formData.get('subKategori'),
        tanggalMasuk: formData.get('tanggalMasuk'),
        supplier: formData.get('supplier'),
        kepemilikan: formData.get('kepemilikan'),
        keterangan: formData.get('keterangan'),
        units: units
    };

    if (!newItem.nama || !newItem.kategori || !kondisiDefault || !lokasiDefault || !newItem.tanggalMasuk || !newItem.kepemilikan) {
        showToast('error', 'Error', 'Mohon lengkapi semua field yang wajib diisi');
        return;
    }

    items.push(newItem);
    itemCounter++;

    history.unshift({
        id: history.length + 1, 
        itemId: newItem.id, 
        itemName: newItem.nama, 
        unitKode: null,
        type: 'masuk',
        date: newItem.tanggalMasuk, 
        from: '-', 
        to: lokasiDefault,
        description: `Barang baru masuk (${jumlah} unit)${newItem.supplier ? ' dari supplier ' + newItem.supplier : ''}`
    });

    if (kondisiDefault === 'Rusak') {
        showToast('warning', 'Notifikasi', `${newItem.nama} tercatat dalam kondisi rusak`);
    }

    closeModal('addItemModal');
    form.reset();
    generateItemCode();
    updateDashboard();
    renderAllTables();
    showToast('success', 'Berhasil', `${jumlah} unit ${newItem.nama} berhasil ditambahkan`);
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

    // Update item group data (not units)
    items[itemIndex] = {
        ...oldItem,
        nama: document.getElementById('editNama').value,
        kategori: document.getElementById('editKategori').value,
        subKategori: document.getElementById('editSubKategori').value,
        tanggalMasuk: document.getElementById('editTanggalMasuk').value,
        kepemilikan: document.getElementById('editKepemilikan').value,
        supplier: document.getElementById('editSupplier').value,
        keterangan: document.getElementById('editKeterangan').value
    };

    closeModal('editItemModal');
    
    // Reset form visibility
    document.getElementById('editKondisi').closest('.form-group').style.display = '';
    document.getElementById('editLokasi').closest('.form-group').style.display = '';
    document.getElementById('editJumlah').closest('.form-group').style.display = '';
    
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
function viewItemGroup(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const summary = getStatusSummary(item.units);
    
    // Build units table
    const unitsTableHtml = item.units.map(unit => `
        <tr>
            <td><code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;font-size:11px;">${unit.kode}</code></td>
            <td>${unit.lokasi}</td>
            <td><span class="status-badge ${unit.kondisi.toLowerCase().replace(/ /g,'')}">${unit.kondisi}</span></td>
            <td>
                <div class="action-btns">
                    <button class="action-btn" onclick="showUnitQR('${unit.kode}', '${item.nama}')" title="QR Code">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><path d="M14 14h7v7h-7z"></path></svg>
                    </button>
                    <button class="action-btn" onclick="editUnit(${item.id}, ${unit.unitId})" title="Edit Unit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="action-btn danger" onclick="deleteUnit(${item.id}, ${unit.unitId})" title="Hapus Unit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('viewItemContent').innerHTML = `
        <div style="margin-bottom:24px;">
            <h3 style="margin-bottom:16px;font-size:18px;">${item.nama}</h3>
            <div class="depreciation-info">
                <div class="depreciation-item"><label>Kode Group</label><strong>${item.kodeGroup}</strong></div>
                <div class="depreciation-item"><label>Kategori</label><strong>${item.kategori}${item.subKategori ? ' - ' + item.subKategori : ''}</strong></div>
                <div class="depreciation-item"><label>Total Unit</label><strong>${item.units.length} unit</strong></div>
                <div class="depreciation-item"><label>Kepemilikan</label><strong><span class="ownership-badge ${item.kepemilikan.toLowerCase()}">${item.kepemilikan === 'Institusi' ? 'Milik Institusi' : 'Hibah'}</span></strong></div>
                <div class="depreciation-item"><label>Tanggal Masuk</label><strong>${formatDate(item.tanggalMasuk)}</strong></div>
                <div class="depreciation-item"><label>Supplier</label><strong>${item.supplier || '-'}</strong></div>
            </div>
            
            <div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap;">
                <span class="status-badge bagus">${summary.bagus} Bagus</span>
                <span class="status-badge rusak">${summary.rusak} Rusak</span>
                <span class="status-badge perbaikan">${summary.perbaikan} Perbaikan</span>
                <span class="status-badge habis">${summary.habis} Habis</span>
            </div>
            
            ${item.keterangan ? `<p style="margin-top:16px;color:var(--text-secondary);"><strong>Keterangan:</strong> ${item.keterangan}</p>` : ''}
        </div>
        
        <div class="table-container" style="border:1px solid var(--border);">
            <div class="table-header" style="padding:16px 20px;">
                <div class="table-title">Daftar Unit <span class="table-count">${item.units.length} unit</span></div>
                <button class="btn btn-primary" onclick="addUnitsToGroup(${item.id})" style="padding:8px 16px;font-size:13px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Tambah Unit
                </button>
            </div>
            <table>
                <thead><tr><th>Kode Unit</th><th>Lokasi</th><th>Kondisi</th><th>Aksi</th></tr></thead>
                <tbody>${unitsTableHtml}</tbody>
            </table>
        </div>
    `;

    // Update modal title
    document.querySelector('#viewItemModal .modal-title').textContent = 'Detail Barang';
    
    // Hide print QR button for group view, show bulk print
    const modalFooter = document.querySelector('#viewItemModal .modal-footer');
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal('viewItemModal')">Tutup</button>
        <button class="btn btn-secondary" onclick="printAllQRCodes(${item.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Semua QR
        </button>
    `;

    openModal('viewItemModal');
}

// Show QR code for single unit
function showUnitQR(kode, itemName) {
    const content = document.getElementById('viewItemContent');
    content.innerHTML = `
        <div style="text-align:center;">
            <div class="qr-container" id="qrCodeContainer">
                <div class="qr-code" id="qrCode"></div>
                <div class="qr-label">${kode}</div>
                <div class="qr-sublabel">${itemName}</div>
            </div>
            <button class="btn btn-primary" onclick="printSingleQR()" style="margin-top:20px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                Print QR Code
            </button>
        </div>
    `;

    setTimeout(() => {
        const qrContainer = document.getElementById('qrCode');
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: kode,
            width: 200, height: 200, colorDark: '#1e3a5f', colorLight: '#ffffff'
        });
    }, 100);

    // Update modal footer
    const modalFooter = document.querySelector('#viewItemModal .modal-footer');
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="viewItemGroup(${items.find(i => i.units.some(u => u.kode === kode))?.id})">← Kembali ke Daftar Unit</button>
    `;
}

function printSingleQR() {
    const qrContainer = document.getElementById('qrCodeContainer');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html><head><title>Print QR Code</title>
        <style>body{font-family:Arial,sans-serif;text-align:center;padding:40px;}.qr-label{font-weight:bold;margin-top:20px;font-size:14px;}.qr-sublabel{color:#666;font-size:12px;}</style>
        </head><body>${qrContainer.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function printAllQRCodes(itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    let qrHtml = '';
    item.units.forEach(unit => {
        qrHtml += `
            <div style="display:inline-block;margin:20px;text-align:center;page-break-inside:avoid;">
                <div id="qr-${unit.unitId}" style="padding:10px;border:1px solid #ddd;border-radius:8px;"></div>
                <div style="font-weight:bold;margin-top:10px;font-size:12px;">${unit.kode}</div>
                <div style="color:#666;font-size:11px;">${item.nama}</div>
                <div style="color:#999;font-size:10px;">${unit.lokasi}</div>
            </div>
        `;
    });

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print QR Codes - ${item.nama}</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"><\/script>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                h2 { text-align: center; margin-bottom: 20px; }
                .qr-grid { display: flex; flex-wrap: wrap; justify-content: center; }
                @media print { 
                    .no-print { display: none; }
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            <h2>${item.nama} - QR Codes</h2>
            <div class="qr-grid">${qrHtml}</div>
            <div class="no-print" style="text-align:center;margin-top:20px;">
                <button onclick="window.print()" style="padding:10px 20px;font-size:16px;cursor:pointer;">Print</button>
            </div>
            <script>
                window.onload = function() {
                    ${item.units.map(unit => `
                        new QRCode(document.getElementById('qr-${unit.unitId}'), {
                            text: '${unit.kode}',
                            width: 100, height: 100
                        });
                    `).join('')}
                };
            <\/script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Edit single unit
function editUnit(itemId, unitId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const unit = item.units.find(u => u.unitId === unitId);
    if (!unit) return;

    // Populate location dropdown
    let lokasiOptions = '<option value="">Pilih Lokasi</option>';
    locations.forEach(loc => {
        lokasiOptions += `<option value="${loc.nama}" ${unit.lokasi === loc.nama ? 'selected' : ''}>${loc.nama} - ${loc.gedung}</option>`;
    });

    document.getElementById('viewItemContent').innerHTML = `
        <h3 style="margin-bottom:20px;">Edit Unit: ${unit.kode}</h3>
        <form id="editUnitForm">
            <input type="hidden" id="editUnitItemId" value="${itemId}">
            <input type="hidden" id="editUnitId" value="${unitId}">
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Kode Unit</label>
                    <input type="text" class="form-input readonly" value="${unit.kode}" readonly>
                </div>
                <div class="form-group">
                    <label class="form-label">Nama Barang</label>
                    <input type="text" class="form-input readonly" value="${item.nama}" readonly>
                </div>
                <div class="form-group">
                    <label class="form-label">Kondisi <span>*</span></label>
                    <select class="form-select" id="editUnitKondisi">
                        <option value="Bagus" ${unit.kondisi === 'Bagus' ? 'selected' : ''}>Bagus</option>
                        <option value="Rusak" ${unit.kondisi === 'Rusak' ? 'selected' : ''}>Rusak</option>
                        <option value="Proses Perbaikan" ${unit.kondisi === 'Proses Perbaikan' ? 'selected' : ''}>Proses Perbaikan</option>
                        <option value="Habis" ${unit.kondisi === 'Habis' ? 'selected' : ''}>Habis</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">Lokasi <span>*</span></label>
                    <select class="form-select" id="editUnitLokasi">${lokasiOptions}</select>
                </div>
            </div>
        </form>
    `;

    const modalFooter = document.querySelector('#viewItemModal .modal-footer');
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="viewItemGroup(${itemId})">Batal</button>
        <button class="btn btn-primary" onclick="saveUnitEdit()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            Simpan
        </button>
    `;
}

function saveUnitEdit() {
    const itemId = parseInt(document.getElementById('editUnitItemId').value);
    const unitId = parseInt(document.getElementById('editUnitId').value);
    const newKondisi = document.getElementById('editUnitKondisi').value;
    const newLokasi = document.getElementById('editUnitLokasi').value;

    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const unit = item.units.find(u => u.unitId === unitId);
    if (!unit) return;

    const oldKondisi = unit.kondisi;
    const oldLokasi = unit.lokasi;

    // Update unit
    unit.kondisi = newKondisi;
    unit.lokasi = newLokasi;

    // Add history if changed
    if (oldKondisi !== newKondisi) {
        history.unshift({
            id: history.length + 1,
            itemId: itemId,
            itemName: item.nama,
            unitKode: unit.kode,
            type: 'status',
            date: new Date().toISOString().split('T')[0],
            from: oldKondisi,
            to: newKondisi,
            description: `Status unit ${unit.kode} berubah dari ${oldKondisi} menjadi ${newKondisi}`
        });
    }

    if (oldLokasi !== newLokasi) {
        history.unshift({
            id: history.length + 1,
            itemId: itemId,
            itemName: item.nama,
            unitKode: unit.kode,
            type: 'pindah',
            date: new Date().toISOString().split('T')[0],
            from: oldLokasi,
            to: newLokasi,
            description: `Unit ${unit.kode} dipindahkan dari ${oldLokasi} ke ${newLokasi}`
        });
    }

    updateDashboard();
    renderAllTables();
    viewItemGroup(itemId);
    showToast('success', 'Berhasil', 'Data unit berhasil diperbarui');
}

function deleteUnit(itemId, unitId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    
    if (item.units.length === 1) {
        showToast('error', 'Error', 'Tidak bisa menghapus unit terakhir. Hapus group jika ingin menghapus semua.');
        return;
    }

    if (confirm('Apakah Anda yakin ingin menghapus unit ini?')) {
        item.units = item.units.filter(u => u.unitId !== unitId);
        updateDashboard();
        renderAllTables();
        viewItemGroup(itemId);
        showToast('success', 'Berhasil', 'Unit berhasil dihapus');
    }
}

function deleteItemGroup(id) {
    if (confirm('Apakah Anda yakin ingin menghapus SEMUA unit barang ini?')) {
        items = items.filter(item => item.id !== id);
        closeModal('viewItemModal');
        updateDashboard();
        renderAllTables();
        showToast('success', 'Berhasil', 'Barang berhasil dihapus');
    }
}

function editItemGroup(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    populateEditDropdowns();

    document.getElementById('editItemId').value = item.id;
    document.getElementById('editNama').value = item.nama;
    document.getElementById('editKode').value = item.kodeGroup;
    document.getElementById('editKategori').value = item.kategori;
    updateEditSubCategories(item.kategori);
    setTimeout(() => {
        document.getElementById('editSubKategori').value = item.subKategori || '';
    }, 50);
    document.getElementById('editKondisi').closest('.form-group').style.display = 'none';
    document.getElementById('editLokasi').closest('.form-group').style.display = 'none';
    document.getElementById('editTanggalMasuk').value = item.tanggalMasuk;
    document.getElementById('editKepemilikan').value = item.kepemilikan;
    document.getElementById('editSupplier').value = item.supplier || '';
    document.getElementById('editJumlah').closest('.form-group').style.display = 'none';
    document.getElementById('editKeterangan').value = item.keterangan || '';

    openModal('editItemModal');
}

function addUnitsToGroup(itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Populate location dropdown
    let lokasiOptions = '<option value="">Pilih Lokasi</option>';
    locations.forEach(loc => {
        lokasiOptions += `<option value="${loc.nama}">${loc.nama} - ${loc.gedung}</option>`;
    });

    // Set content for viewItemModal
    document.getElementById('viewItemContent').innerHTML = `
        <h3 style="margin-bottom:20px;">Tambah Unit Baru - ${item.nama}</h3>
        <p style="margin-bottom:20px;color:var(--text-secondary);">Kode Group: <code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;">${item.kodeGroup}</code> | Unit saat ini: ${item.units.length} unit</p>
        <form id="addUnitsForm">
            <input type="hidden" id="addUnitsItemId" value="${itemId}">
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Jumlah Unit Baru <span>*</span></label>
                    <input type="number" class="form-input" id="addUnitsJumlah" value="1" min="1" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Kondisi <span>*</span></label>
                    <select class="form-select" id="addUnitsKondisi" required>
                        <option value="Bagus">Bagus</option>
                        <option value="Rusak">Rusak</option>
                        <option value="Proses Perbaikan">Proses Perbaikan</option>
                        <option value="Habis">Habis</option>
                    </select>
                </div>
                <div class="form-group full">
                    <label class="form-label">Lokasi <span>*</span></label>
                    <select class="form-select" id="addUnitsLokasi" required>${lokasiOptions}</select>
                </div>
            </div>
        </form>
    `;

    // Update modal title
    document.querySelector('#viewItemModal .modal-title').textContent = 'Tambah Unit Baru';

    // Update modal footer
    const modalFooter = document.querySelector('#viewItemModal .modal-footer');
    modalFooter.innerHTML = `
        <button class="btn btn-secondary" onclick="viewItemGroup(${itemId})">Batal</button>
        <button class="btn btn-primary" onclick="saveNewUnits()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Tambah Unit
        </button>
    `;

    // Open the modal
    openModal('viewItemModal');
}

function saveNewUnits() {
    const itemId = parseInt(document.getElementById('addUnitsItemId').value);
    const jumlah = parseInt(document.getElementById('addUnitsJumlah').value) || 1;
    const kondisi = document.getElementById('addUnitsKondisi').value;
    const lokasi = document.getElementById('addUnitsLokasi').value;

    if (!kondisi || !lokasi) {
        showToast('error', 'Error', 'Mohon lengkapi semua field');
        return;
    }

    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Find next unit ID
    const maxUnitId = Math.max(...item.units.map(u => u.unitId), 0);
    
    // Add new units
    for (let i = 1; i <= jumlah; i++) {
        const newUnitId = maxUnitId + i;
        item.units.push({
            unitId: newUnitId,
            kode: `${item.kodeGroup}/${String(newUnitId).padStart(3, '0')}`,
            kondisi: kondisi,
            lokasi: lokasi
        });
    }

    // Add to history
    history.unshift({
        id: history.length + 1,
        itemId: itemId,
        itemName: item.nama,
        unitKode: null,
        type: 'masuk',
        date: new Date().toISOString().split('T')[0],
        from: '-',
        to: lokasi,
        description: `${jumlah} unit baru ditambahkan ke ${item.nama}`
    });

    updateDashboard();
    renderAllTables();
    viewItemGroup(itemId);
    showToast('success', 'Berhasil', `${jumlah} unit baru berhasil ditambahkan`);
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
    // Count total units across all items
    const totalUnits = getTotalUnits();
    document.getElementById('totalBarang').textContent = totalUnits;
    document.getElementById('barangBagus').textContent = getUnitsByCondition('Bagus');
    document.getElementById('barangPerbaikan').textContent = getUnitsByCondition('Proses Perbaikan');
    document.getElementById('barangRusak').textContent = getUnitsByCondition('Rusak');
    document.getElementById('inventarisCount').textContent = totalUnits;

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
    const totalUnits = data.reduce((sum, item) => sum + item.units.length, 0);
    document.getElementById('itemCount').textContent = `${data.length} jenis (${totalUnits} unit)`;
    document.getElementById('totalItems').textContent = totalUnits;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;"><p style="color:var(--text-secondary);">Belum ada data barang</p></td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(item => {
        const summary = getStatusSummary(item.units);
        const statusHtml = [];
        if (summary.bagus > 0) statusHtml.push(`<span class="status-badge bagus">${summary.bagus} Bagus</span>`);
        if (summary.rusak > 0) statusHtml.push(`<span class="status-badge rusak">${summary.rusak} Rusak</span>`);
        if (summary.perbaikan > 0) statusHtml.push(`<span class="status-badge perbaikan">${summary.perbaikan} Perbaikan</span>`);
        if (summary.habis > 0) statusHtml.push(`<span class="status-badge habis">${summary.habis} Habis</span>`);
        
        return `
        <tr>
            <td><div class="item-info"><div class="item-image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div><div class="item-details"><h4>${item.nama}</h4><span>${item.units.length} unit</span></div></div></td>
            <td><code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;font-size:12px;">${item.kodeGroup}</code></td>
            <td>${item.kategori}${item.subKategori ? '<br><small style="color:var(--text-secondary);">' + item.subKategori + '</small>' : ''}</td>
            <td><small style="color:var(--text-secondary);">${[...new Set(item.units.map(u => u.lokasi))].join(', ')}</small></td>
            <td><div style="display:flex;flex-wrap:wrap;gap:4px;">${statusHtml.join('')}</div></td>
            <td><span class="ownership-badge ${item.kepemilikan.toLowerCase()}">${item.kepemilikan === 'Institusi' ? 'Institusi' : 'Hibah'}</span></td>
            <td><div class="action-btns">
                <button class="action-btn" onclick="viewItemGroup(${item.id})" title="Lihat Detail Unit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
                <button class="action-btn" onclick="editItemGroup(${item.id})" title="Edit Group"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></button>
                <button class="action-btn" onclick="addUnitsToGroup(${item.id})" title="Tambah Unit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                <button class="action-btn danger" onclick="deleteItemGroup(${item.id})" title="Hapus Semua"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button>
            </div></td>
        </tr>
    `;}).join('');
}

function renderRecentItems() {
    const recent = items.slice(-5).reverse();
    const totalUnits = recent.reduce((sum, item) => sum + item.units.length, 0);
    document.getElementById('recentCount').textContent = `${recent.length} jenis (${totalUnits} unit)`;
    
    document.getElementById('recentItemsTable').innerHTML = recent.map(item => {
        const summary = getStatusSummary(item.units);
        const statusHtml = [];
        if (summary.bagus > 0) statusHtml.push(`<span class="status-badge bagus">${summary.bagus}</span>`);
        if (summary.rusak > 0) statusHtml.push(`<span class="status-badge rusak">${summary.rusak}</span>`);
        if (summary.perbaikan > 0) statusHtml.push(`<span class="status-badge perbaikan">${summary.perbaikan}</span>`);
        
        return `
        <tr onclick="viewItemGroup(${item.id})" style="cursor:pointer;">
            <td><div class="item-info"><div class="item-image"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg></div><div class="item-details"><h4>${item.nama}</h4><span>${item.units.length} unit</span></div></div></td>
            <td><code style="background:var(--bg-main);padding:4px 8px;border-radius:4px;font-size:12px;">${item.kodeGroup}</code></td>
            <td>${item.kategori}</td>
            <td><small>${[...new Set(item.units.map(u => u.lokasi))].slice(0,2).join(', ')}${[...new Set(item.units.map(u => u.lokasi))].length > 2 ? '...' : ''}</small></td>
            <td><div style="display:flex;gap:4px;">${statusHtml.join('')}</div></td>
            <td><span class="ownership-badge ${item.kepemilikan.toLowerCase()}">${item.kepemilikan === 'Institusi' ? 'Institusi' : 'Hibah'}</span></td>
        </tr>
    `;}).join('');
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
        // Count total units in this category
        let unitCount = 0;
        items.filter(i => i.kategori === cat.nama).forEach(item => {
            unitCount += item.units.length;
        });
        return `<tr>
            <td><strong>${cat.nama}</strong></td>
            <td>${cat.subKategori.length > 0 ? cat.subKategori.join(', ') : '-'}</td>
            <td>${unitCount} unit</td>
            <td><div class="action-btns"><button class="action-btn danger" onclick="deleteKategori(${cat.id})"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button></div></td>
        </tr>`;
    }).join('');
}

function renderLokasiTable() {
    document.getElementById('lokasiCount').textContent = `${locations.length} lokasi`;
    document.getElementById('lokasiTable').innerHTML = locations.map(loc => {
        // Count total units in this location
        let unitCount = 0;
        items.forEach(item => {
            item.units.forEach(unit => {
                if (unit.lokasi === loc.nama) unitCount++;
            });
        });
        return `<tr>
            <td><strong>${loc.nama}</strong></td>
            <td>${loc.gedung}</td>
            <td>${loc.lantai}</td>
            <td>${unitCount} unit</td>
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
                <div class="timeline-title">${labels[h.type]} - ${h.itemName}${h.unitKode ? ` <code style="font-size:11px;background:var(--bg-main);padding:2px 6px;border-radius:4px;">${h.unitKode}</code>` : ''}</div>
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
    
    if (kategori) {
        filtered = filtered.filter(i => i.kategori === kategori);
    }
    if (status) {
        // Filter items that have at least one unit with this status
        filtered = filtered.filter(i => i.units.some(u => u.kondisi === status));
    }
    if (lokasi) {
        // Filter items that have at least one unit in this location
        filtered = filtered.filter(i => i.units.some(u => u.lokasi === lokasi));
    }

    renderItemsTable(filtered);
}

function globalSearch(query) {
    if (!query) { renderItemsTable(); return; }
    const q = query.toLowerCase();
    const filtered = items.filter(i => 
        i.nama.toLowerCase().includes(q) || 
        i.kodeGroup.toLowerCase().includes(q) ||
        i.kategori.toLowerCase().includes(q) ||
        i.units.some(u => u.kode.toLowerCase().includes(q) || u.lokasi.toLowerCase().includes(q))
    );
    renderItemsTable(filtered);
}

function searchByCode() {
    const code = document.getElementById('manualCode').value.trim();
    if (!code) { showToast('warning', 'Perhatian', 'Masukkan kode barang terlebih dahulu'); return; }

    // Search in items (group code or unit code)
    let foundItem = null;
    let foundUnit = null;

    for (const item of items) {
        if (item.kodeGroup.toLowerCase() === code.toLowerCase()) {
            foundItem = item;
            break;
        }
        const unit = item.units.find(u => u.kode.toLowerCase() === code.toLowerCase());
        if (unit) {
            foundItem = item;
            foundUnit = unit;
            break;
        }
    }

    // Search in assets
    const asset = assets.find(a => a.kode.toLowerCase() === code.toLowerCase());

    const resultContainer = document.getElementById('scanResult');
    const resultContent = document.getElementById('scanResultContent');

    if (foundItem && foundUnit) {
        // Found specific unit
        resultContainer.style.display = 'block';
        resultContent.innerHTML = `
            <div class="depreciation-info">
                <div class="depreciation-item"><label>Nama Barang</label><strong>${foundItem.nama}</strong></div>
                <div class="depreciation-item"><label>Kode Unit</label><strong>${foundUnit.kode}</strong></div>
                <div class="depreciation-item"><label>Kategori</label><strong>${foundItem.kategori}</strong></div>
                <div class="depreciation-item"><label>Lokasi</label><strong>${foundUnit.lokasi}</strong></div>
                <div class="depreciation-item"><label>Kondisi</label><strong><span class="status-badge ${foundUnit.kondisi.toLowerCase().replace(/ /g,'')}">${foundUnit.kondisi}</span></strong></div>
                <div class="depreciation-item"><label>Kepemilikan</label><strong><span class="ownership-badge ${foundItem.kepemilikan.toLowerCase()}">${foundItem.kepemilikan === 'Institusi' ? 'Institusi' : 'Hibah'}</span></strong></div>
            </div>
            <div style="margin-top:20px;">
                <button class="btn btn-secondary" onclick="editUnit(${foundItem.id}, ${foundUnit.unitId})">Edit Unit</button>
                <button class="btn btn-primary" onclick="showUnitQR('${foundUnit.kode}', '${foundItem.nama}'); document.getElementById('scanResult').style.display='none';">Lihat QR Code</button>
            </div>
        `;
    } else if (foundItem) {
        // Found group
        resultContainer.style.display = 'block';
        const summary = getStatusSummary(foundItem.units);
        resultContent.innerHTML = `
            <div class="depreciation-info">
                <div class="depreciation-item"><label>Nama Barang</label><strong>${foundItem.nama}</strong></div>
                <div class="depreciation-item"><label>Kode Group</label><strong>${foundItem.kodeGroup}</strong></div>
                <div class="depreciation-item"><label>Kategori</label><strong>${foundItem.kategori}</strong></div>
                <div class="depreciation-item"><label>Total Unit</label><strong>${foundItem.units.length} unit</strong></div>
                <div class="depreciation-item"><label>Status</label><strong>${summary.bagus} Bagus, ${summary.rusak} Rusak, ${summary.perbaikan} Perbaikan</strong></div>
                <div class="depreciation-item"><label>Kepemilikan</label><strong><span class="ownership-badge ${foundItem.kepemilikan.toLowerCase()}">${foundItem.kepemilikan === 'Institusi' ? 'Institusi' : 'Hibah'}</span></strong></div>
            </div>
            <div style="margin-top:20px;"><button class="btn btn-primary" onclick="viewItemGroup(${foundItem.id}); document.getElementById('scanResult').style.display='none';">Lihat Detail Lengkap</button></div>
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
            <div style="margin-top:20px;"><button class="btn btn-primary" onclick="viewAsset(${asset.id}); document.getElementById('scanResult').style.display='none';">Lihat Detail Lengkap</button></div>
        `;
    } else {
        resultContainer.style.display = 'block';
        resultContent.innerHTML = `<div class="empty-state"><h3>Tidak Ditemukan</h3><p>Barang dengan kode "${code}" tidak ditemukan dalam sistem</p></div>`;
    }
}

// ==================== EXPORT FUNCTIONS ====================
function exportToExcel() {
    // Export all units with their details
    const data = [];
    items.forEach(item => {
        item.units.forEach(unit => {
            data.push({
                'Kode Group': item.kodeGroup,
                'Kode Unit': unit.kode,
                'Nama Barang': item.nama,
                'Kategori': item.kategori,
                'Sub-Kategori': item.subKategori || '-',
                'Kondisi': unit.kondisi,
                'Lokasi': unit.lokasi,
                'Tanggal Masuk': item.tanggalMasuk,
                'Supplier': item.supplier || '-',
                'Kepemilikan': item.kepemilikan,
                'Keterangan': item.keterangan || '-'
            });
        });
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventaris');
    XLSX.writeFile(wb, `Inventaris_STIK_${formatDateFile(new Date())}.xlsx`);
    showToast('success', 'Berhasil', 'Data berhasil di-export ke Excel');
}

function exportReport(type) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const totalUnits = getTotalUnits();

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('LAPORAN INVENTARIS BARANG', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('STIK Sint Carolus', 105, 28, { align: 'center' });
    doc.text(`Tanggal: ${formatDate(new Date().toISOString().split('T')[0])}`, 105, 36, { align: 'center' });

    doc.setFontSize(11);
    doc.text(`Total Jenis Barang: ${items.length}`, 14, 50);
    doc.text(`Total Unit: ${totalUnits}`, 14, 58);
    doc.text(`Kondisi Bagus: ${getUnitsByCondition('Bagus')}`, 14, 66);
    doc.text(`Proses Perbaikan: ${getUnitsByCondition('Proses Perbaikan')}`, 14, 74);
    doc.text(`Rusak: ${getUnitsByCondition('Rusak')}`, 14, 82);

    // Table data - one row per item group
    const tableData = items.map(item => {
        const summary = getStatusSummary(item.units);
        return [
            item.kodeGroup, 
            item.nama, 
            item.kategori, 
            item.units.length + ' unit',
            `${summary.bagus}/${summary.rusak}/${summary.perbaikan}`,
            item.kepemilikan
        ];
    });

    doc.autoTable({
        startY: 95,
        head: [['Kode', 'Nama', 'Kategori', 'Jumlah', 'B/R/P', 'Kepemilikan']],
        body: tableData,
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
