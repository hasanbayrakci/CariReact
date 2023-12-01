import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const CariHareket = ({ customerId }) => {
    const [caris, setCari] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [islemTuru, setIslemTuru] = useState('');
    const [tutar, setTutar] = useState('');
    const [formUrl, setFormUrl] = useState('');
    const [bakiye, setBakiye] = useState(0);

    useEffect(() => {
        getCariHareketData();
        getCariBakiye()
    }, [customerId]);

    const getCariHareketData = async () => {
        try {
            const response = await fetch('CariHareket/GetHareket/' + customerId);
            const data = await response.json();
            setCari(data);
            setLoading(false);
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    const detailCariHareket = async (id) => {
        try {
            const response = await fetch('CariHareket/Detail/' + id);
            const data = await response.json();
            setIslemTuru(data.islemTuru);
            setTutar(data.tutar);
            setLoading(false);
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    const editClick = (id) => {
        detailCariHareket(id);
        setFormUrl('CariHareket/Edit/' + id);
        toggleAndSetModal('Düzenle');
    };

    const deleteCariHareket = async(id) => {
        try {
            const response = await fetch('CariHareket/Delete/' + id, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Cari hareket başarıyla silindi');
                setLoading(true);
                getCariHareketData();
                getCariBakiye();
            } else {
                console.error('Cari hareket silinirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    }

    const deleteClick = (id) => {
        if (window.confirm("Bu hareketi silmek istediğinizden emin misiniz?")) {
            deleteCariHareket(id);
        }
    }

    const getCariBakiye = async () => {
        try {
            const response = await fetch('CariHareket/GetCariBakiye/' + customerId,);
            const data = await response.json();
            setBakiye(data)
            setLoading(false);
        } catch (error) {
            console.error('Veri çekme hatası:', error);
        }
    };

    const renderCariHareketTable = (caris) => {
        return (
            <Table hover responsive striped>
                <thead>
                    <tr>
                        <th className="col-1">Id</th>
                        <th className="col-3">İşlem Türü</th>
                        <th className="col-2">Tutar</th>
                        <th className="col-3">Tarih</th>
                        <th className="col-3">#</th>
                    </tr>
                </thead>
                <tbody>
                    {caris.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.islemTuru}</td>
                            <td>{item.tutar}</td>
                            <td>{item.tarih}</td>
                            <td>
                                <Button color="warning" size="sm" onClick={() => editClick(item.id)}>Düzenle</Button>{' '}
                                <Button color="danger" size="sm" onClick={() => deleteClick(item.id)}>Sil</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    };

    const toggle = () => {
        setModal(!modal);
        setModalTitle('');
    };

    const toggleAndSetModal = (title) => {
        toggle();
        setModalTitle(title);
    };

    const handleChange = (e, key) => {
        if (key === 'islemTuru') {
            setIslemTuru(e.target.value);
        } else if (key === 'tutar') {
            setTutar(e.target.value);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(formUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId, islemTuru, tutar }),
            });

            if (response.ok) {
                console.log('Veri başarıyla gönderildi');
                toggle();
                setLoading(true);
                getCariHareketData();
                getCariBakiye();
            } else {
                console.error('Veri gönderme hatası');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    const createClick = () => {
        setIslemTuru('');
        setTutar('');
        setFormUrl('CariHareket/Create/' + customerId);
        toggleAndSetModal('Yeni Kayıt');
    };

    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-10">Cari Hareket</div>
                        <div className="col-2 text-end">
                            <Button color="primary" size="sm" onClick={createClick}>Ekle</Button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {loading ? <em>Yükleniyor...</em> : renderCariHareketTable(caris)}
                    </p>
                </div>
                <div className="card-footer text-end">
                    <h5>Bakiye: <span class="badge bg-primary">{ bakiye } TL</span></h5>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="islemTuru">İşlem Türü</Label>
                            <Input
                                name="islemTuru"
                                placeholder="İşlem Türü"
                                type="number"
                                value={islemTuru}
                                onChange={(e) => handleChange(e, 'islemTuru')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Tutar">Tutar</Label>
                            <Input
                                name="Tutar"
                                placeholder="Tutar"
                                type="number"
                                step="any"
                                value={tutar}
                                onChange={(e) => handleChange(e, 'tutar')}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>İptal</Button>{' '}
                    <Button color="primary" onClick={handleSubmit}>Kaydet</Button>
                </ModalFooter>
            </Modal>
        </div>
    );



};

export default CariHareket;
