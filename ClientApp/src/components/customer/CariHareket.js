import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export class CariHareket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caris: [],
            loading: true,
            modal: false,
            modalTitle: '',
            islemTuru: '',
            tutar: '',
            formUrl: ''
        };

    }

    componentDidMount() {
        this.getCariHareketData();
    }

    render() {
        const { islemTuru, tutar } = this.state;

        let contents = this.state.loading
            ? <p><em>Yükleniyor...</em></p>
            : this.renderCariHareketTable(this.state.caris);

        return (
            <div>
                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-10">Cari Hareket</div>
                            <div className="col-2 text-end">
                                <Button color="primary" size="sm" onClick={() => this.createClick()}>Ekle</Button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text">
                            {contents}
                        </p>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
                    <ModalHeader toggle={() => this.toggle()}>{this.state.modalTitle}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="islemTuru">
                                    İşlem Türü
                                </Label>
                                <Input
                                    name="islemTuru"
                                    placeholder="İşlem Türü"
                                    type="number"
                                    value={islemTuru}
                                    onChange={(e) => this.handleChange(e, 'islemTuru')}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Tutar">
                                    Tutar
                                </Label>
                                <Input
                                    name="Tutar"
                                    placeholder="Tutar"
                                    type="number"
                                    step="any"
                                    value={tutar}
                                    onChange={(e) => this.handleChange(e, 'tutar')}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.toggle()}>
                            İptal
                        </Button>{' '}
                        <Button color="primary" onClick={() => this.handleSubmit()}>
                            Kaydet
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    async getCariHareketData() {
        const response = await fetch('CariHareket');
        const data = await response.json();
        this.setState({ caris: data, loading: false });
    }

    renderCariHareketTable(caris) {
        return (
            <Table hover responsive striped>
                <thead>
                    <tr>
                        <th className="col-1">Id</th>
                        <th className="col-3">Unvan</th>
                        <th className="col-2">İşlem Türü</th>
                        <th className="col-2">Tutar</th>
                        <th className="col-2">Tarih</th>
                        <th className="col-2">#</th>
                    </tr>
                </thead>
                <tbody>
                    {caris.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.unvan}</td>
                            <td>{item.islemTuru}</td>
                            <td>{item.tutar}</td>
                            <td>{item.tarih}</td>
                            <td>
                                <Button color="warning" size="sm">Düzenle</Button>{' '}
                                <Button color="danger" size="sm">Sil</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.setState({
            modalTitle: ""
        });
    }

    toggleAndSetModal(title) {
        this.toggle();
        this.setState({
            modalTitle: title
        });
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        });
    };

    handleSubmit = async () => {
        const { islemTuru, tutar, formUrl } = this.state;

        try {
            const response = await fetch(formUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ islemTuru, tutar }),
            });

            if (response.ok) {
                console.log('Veri başarıyla post edildi');
                this.toggle();
                this.setState({ loading: true });
                this.getCariHareketData();
            } else {
                console.error('Veri post edilirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    createClick() {
        this.setState({
            islemTuru: '',
            tutar: '',
            formUrl: 'CariHareket/Create'
        }, () => {
            this.toggleAndSetModal("Yeni Kayıt");
        });
    }

}
