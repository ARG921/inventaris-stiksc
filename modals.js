// Modal Templates - Insert into DOM
document.getElementById('modalsContainer').innerHTML = `
    <!-- Add Item Modal -->
    <div class="modal-overlay" id="addItemModal">
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">Tambah Barang Baru</h2>
                <button class="modal-close" onclick="closeModal('addItemModal')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal-body">
                <form id="addItemForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Nama Barang <span>*</span></label>
                            <input type="text" class="form-input" name="nama" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kode Barang</label>
                            <input type="text" class="form-input readonly" name="kode" id="generatedCode" readonly>
                            <small style="color:var(--text-secondary);font-size:12px;">Auto-generate: INVT-2025-####</small>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kategori <span>*</span></label>
                            <select class="form-select" name="kategori" required id="itemKategori"><option value="">Pilih Kategori</option></select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Sub-Kategori</label>
                            <select class="form-select" name="subKategori" id="itemSubKategori"><option value="">Pilih Sub-Kategori</option></select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kondisi <span>*</span></label>
                            <select class="form-select" name="kondisi" required>
                                <option value="">Pilih Kondisi</option>
                                <option value="Bagus">Bagus</option>
                                <option value="Rusak">Rusak</option>
                                <option value="Proses Perbaikan">Proses Perbaikan</option>
                                <option value="Habis">Habis</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Lokasi <span>*</span></label>
                            <select class="form-select" name="lokasi" required id="itemLokasi"><option value="">Pilih Lokasi</option></select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tanggal Masuk <span>*</span></label>
                            <input type="date" class="form-input" name="tanggalMasuk" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kepemilikan <span>*</span></label>
                            <select class="form-select" name="kepemilikan" required>
                                <option value="">Pilih Kepemilikan</option>
                                <option value="Institusi">Milik Institusi/STIK</option>
                                <option value="Hibah">Hibah dari Luar</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Supplier</label>
                            <input type="text" class="form-input" name="supplier">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Jumlah</label>
                            <input type="number" class="form-input" name="jumlah" value="1" min="1">
                        </div>
                        <div class="form-group full">
                            <label class="form-label">Keterangan</label>
                            <textarea class="form-textarea" name="keterangan" rows="3"></textarea>
                        </div>
                        <div class="form-group full">
                            <label class="form-label">Foto Barang</label>
                            <div class="upload-area" onclick="document.getElementById('itemPhoto').click()">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                <h4>Klik untuk upload foto</h4>
                                <p>PNG, JPG max 5MB</p>
                            </div>
                            <input type="file" id="itemPhoto" name="foto" accept="image/*" style="display:none;" onchange="previewImage(this,'photoPreview')">
                            <img id="photoPreview" class="preview-image" style="display:none;">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('addItemModal')">Batal</button>
                <button class="btn btn-primary" onclick="saveItem()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    Simpan Barang
                </button>
            </div>
        </div>
    </div>

    <!-- Add Asset Modal -->
    <div class="modal-overlay" id="addAssetModal">
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">Tambah Aset Baru</h2>
                <button class="modal-close" onclick="closeModal('addAssetModal')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal-body">
                <form id="addAssetForm">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Nama Aset <span>*</span></label>
                            <input type="text" class="form-input" name="nama" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kode Aset</label>
                            <input type="text" class="form-input readonly" name="kode" id="generatedAssetCode" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Jenis Aset <span>*</span></label>
                            <select class="form-select" name="jenisAset" required>
                                <option value="">Pilih Jenis</option>
                                <option value="Tetap">Aset Tetap</option>
                                <option value="Non-Tetap">Aset Non-Tetap</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kategori <span>*</span></label>
                            <select class="form-select" name="kategori" required>
                                <option value="">Pilih Kategori</option>
                                <option value="Peralatan">Peralatan</option>
                                <option value="Kendaraan">Kendaraan</option>
                                <option value="Bangunan">Bangunan</option>
                                <option value="Tanah">Tanah</option>
                                <option value="Perabotan">Perabotan</option>
                                <option value="Elektronik">Elektronik</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nilai Perolehan (Rp) <span>*</span></label>
                            <input type="number" class="form-input" name="nilaiPerolehan" required min="0">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tanggal Pembelian <span>*</span></label>
                            <input type="date" class="form-input" name="tanggalPembelian" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Umur Ekonomis (Tahun) <span>*</span></label>
                            <input type="number" class="form-input" name="umurEkonomis" required min="0" value="5">
                            <small style="color:var(--text-secondary);font-size:12px;">0 untuk tanah (tidak terdepresiasi)</small>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Lokasi</label>
                            <select class="form-select" name="lokasi" id="assetLokasi"><option value="">Pilih Lokasi</option></select>
                        </div>
                        <div class="form-group full">
                            <label class="form-label">Keterangan</label>
                            <textarea class="form-textarea" name="keterangan" rows="3"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('addAssetModal')">Batal</button>
                <button class="btn btn-primary" onclick="saveAsset()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    Simpan Aset
                </button>
            </div>
        </div>
    </div>

    <!-- Add Kategori Modal -->
    <div class="modal-overlay" id="addKategoriModal">
        <div class="modal" style="max-width:500px;">
            <div class="modal-header">
                <h2 class="modal-title">Tambah Kategori</h2>
                <button class="modal-close" onclick="closeModal('addKategoriModal')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal-body">
                <form id="addKategoriForm">
                    <div class="form-group" style="margin-bottom:20px;">
                        <label class="form-label">Nama Kategori <span>*</span></label>
                        <input type="text" class="form-input" name="nama" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Sub-Kategori (pisahkan dengan koma)</label>
                        <input type="text" class="form-input" name="subKategori" placeholder="Contoh: Kursi, Meja, Lemari">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('addKategoriModal')">Batal</button>
                <button class="btn btn-primary" onclick="saveKategori()">Simpan</button>
            </div>
        </div>
    </div>

    <!-- Add Lokasi Modal -->
    <div class="modal-overlay" id="addLokasiModal">
        <div class="modal" style="max-width:500px;">
            <div class="modal-header">
                <h2 class="modal-title">Tambah Lokasi</h2>
                <button class="modal-close" onclick="closeModal('addLokasiModal')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal-body">
                <form id="addLokasiForm">
                    <div class="form-group" style="margin-bottom:20px;">
                        <label class="form-label">Nama Lokasi <span>*</span></label>
                        <input type="text" class="form-input" name="nama" required placeholder="Contoh: Ruang Lab Komputer">
                    </div>
                    <div class="form-group" style="margin-bottom:20px;">
                        <label class="form-label">Gedung</label>
                        <input type="text" class="form-input" name="gedung" placeholder="Contoh: Gedung A">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Lantai</label>
                        <input type="text" class="form-input" name="lantai" placeholder="Contoh: Lantai 2">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('addLokasiModal')">Batal</button>
                <button class="btn btn-primary" onclick="saveLokasi()">Simpan</button>
            </div>
        </div>
    </div>

    <!-- Edit Item Modal -->
    <div class="modal-overlay" id="editItemModal">
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">Edit Barang</h2>
                <button class="modal-close" onclick="closeModal('editItemModal')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal-body">
                <form id="editItemForm">
                    <input type="hidden" name="id" id="editItemId">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Nama Barang <span>*</span></label>
                            <input type="text" class="form-input" name="nama" id="editNama" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kode Barang</label>
                            <input type="text" class="form-input readonly" name="kode" id="editKode" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kategori <span>*</span></label>
                            <select class="form-select" name="kategori" required id="editKategori"><option value="">Pilih Kategori</option></select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Sub-Kategori</label>
                            <select class="form-select" name="subKategori" id="editSubKategori"><option value="">Pilih Sub-Kategori</option></select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kondisi <span>*</span></label>
                            <select class="form-select" name="kondisi" id="editKondisi" required>
                                <option value="">Pilih Kondisi</option>
                                <option value="Bagus">Bagus</option>
                                <option value="Rusak">Rusak</option>
                                <option value="Proses Perbaikan">Proses Perbaikan</option>
                                <option value="Habis">Habis</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Lokasi <span>*</span></label>
                            <select class="form-select" name="lokasi" required id="editLokasi"><option value="">Pilih Lokasi</option></select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tanggal Masuk <span>*</span></label>
                            <input type="date" class="form-input" name="tanggalMasuk" id="editTanggalMasuk" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kepemilikan <span>*</span></label>
                            <select class="form-select" name="kepemilikan" id="editKepemilikan" required>
                                <option value="">Pilih Kepemilikan</option>
                                <option value="Institusi">Milik Institusi/STIK</option>
                                <option value="Hibah">Hibah dari Luar</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Supplier</label>
                            <input type="text" class="form-input" name="supplier" id="editSupplier">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Jumlah</label>
                            <input type="number" class="form-input" name="jumlah" id="editJumlah" value="1" min="1">
                        </div>
                        <div class="form-group full">
                            <label class="form-label">Keterangan</label>
                            <textarea class="form-textarea" name="keterangan" id="editKeterangan" rows="3"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('editItemModal')">Batal</button>
                <button class="btn btn-primary" onclick="updateItem()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    Simpan Perubahan
                </button>
            </div>
        </div>
    </div>

    <!-- Edit Asset Modal -->
    <div class="modal-overlay" id="editAssetModal">
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">Edit Aset</h2>
                <button class="modal-close" onclick="closeModal('editAssetModal')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal-body">
                <form id="editAssetForm">
                    <input type="hidden" name="id" id="editAssetId">
                    <div class="form-grid">
                        <div class="form-group">
                            <label class="form-label">Nama Aset <span>*</span></label>
                            <input type="text" class="form-input" name="nama" id="editAssetNama" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kode Aset</label>
                            <input type="text" class="form-input readonly" name="kode" id="editAssetKode" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Jenis Aset <span>*</span></label>
                            <select class="form-select" name="jenisAset" id="editJenisAset" required>
                                <option value="">Pilih Jenis</option>
                                <option value="Tetap">Aset Tetap</option>
                                <option value="Non-Tetap">Aset Non-Tetap</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Kategori <span>*</span></label>
                            <select class="form-select" name="kategori" id="editAssetKategori" required>
                                <option value="">Pilih Kategori</option>
                                <option value="Peralatan">Peralatan</option>
                                <option value="Kendaraan">Kendaraan</option>
                                <option value="Bangunan">Bangunan</option>
                                <option value="Tanah">Tanah</option>
                                <option value="Perabotan">Perabotan</option>
                                <option value="Elektronik">Elektronik</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Nilai Perolehan (Rp) <span>*</span></label>
                            <input type="number" class="form-input" name="nilaiPerolehan" id="editNilaiPerolehan" required min="0">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Tanggal Pembelian <span>*</span></label>
                            <input type="date" class="form-input" name="tanggalPembelian" id="editTanggalPembelian" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Umur Ekonomis (Tahun) <span>*</span></label>
                            <input type="number" class="form-input" name="umurEkonomis" id="editUmurEkonomis" required min="0" value="5">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Lokasi</label>
                            <select class="form-select" name="lokasi" id="editAssetLokasi"><option value="">Pilih Lokasi</option></select>
                        </div>
                        <div class="form-group full">
                            <label class="form-label">Keterangan</label>
                            <textarea class="form-textarea" name="keterangan" id="editAssetKeterangan" rows="3"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('editAssetModal')">Batal</button>
                <button class="btn btn-primary" onclick="updateAsset()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    Simpan Perubahan
                </button>
            </div>
        </div>
    </div>

    <!-- View Item Modal -->
    <div class="modal-overlay" id="viewItemModal">
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">Detail Barang</h2>
                <button class="modal-close" onclick="closeModal('viewItemModal')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <div class="modal-body" id="viewItemContent"></div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal('viewItemModal')">Tutup</button>
                <button class="btn btn-primary" onclick="printQRCode()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                    Print QR Code
                </button>
            </div>
        </div>
    </div>
`;

// Close modal when clicking outside
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});
