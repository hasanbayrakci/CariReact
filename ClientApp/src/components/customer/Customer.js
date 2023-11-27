import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loading: true,
            modal: false,
            modalTitle: '',
            modalContent: null,
            unvan: '',
            telefon: '',
            adres: ''
        };
    }

    componentDidMount() {
        this.getCustomerData();
    }

    renderCustomerTable(customers) {
        return (
            <Table hover responsive striped>
                <thead>
                    <tr>
                        <th colSpan="4"></th>
                        <th><Button color="primary" size="sm" onClick={() => this.createClick()}>Ekle</Button></th>
                    </tr>
                    <tr>
                        <th className="col-1">Id</th>
                        <th className="col-4">Unvan</th>
                        <th className="col-4">Adres</th>
                        <th className="col-3">#</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.unvan}</td>
                            <td>{item.adres}</td>
                            <td>
                                <Button color="primary" size="sm">Görüntüle</Button>{' '}
                                <Button color="warning" size="sm" onClick={() => this.editClick()}>Düzenle</Button>{' '}
                                <Button color="danger" size="sm" onClick={() => this.deleteClick(item.id)}>Sil</Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    render() {

        const { modal, modalTitle, modalContent } = this.state;

        let contents = this.state.loading
            ? <p><em>Yükleniyor...</em></p>
            : this.renderCustomerTable(this.state.customers);

        return (
            <div>
                {contents}
                <Modal isOpen={modal} toggle={() => this.toggle()}>
                    <ModalHeader toggle={() => this.toggle()}>{ modalTitle }</ModalHeader>
                    <ModalBody>
                        { modalContent }
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

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
        this.setState({
            modalTitle: "",
            modalContent: ""
        });
    }

    createClick() {
        this.toggle();
        this.setState({
            modalTitle: "Yeni Kayıt",
            modalContent: this.formContent()
        });
    }

    formContent() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="Unvan">
                            Unvan
                        </Label>
                        <Input
                            name="Unvan"
                            placeholder="Unvan"
                            type="text"
                            onChange={(e) => this.handleChange(e, 'unvan')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Telefon">
                            Telefon
                        </Label>
                        <Input
                            name="Telefon"
                            placeholder="Telefon"
                            type="text"
                            onChange={(e) => this.handleChange(e, 'telefon')}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Adres">
                            Adres
                        </Label>
                        <Input
                            name="Adres"
                            placeholder="Adres"
                            type="text"
                            onChange={(e) => this.handleChange(e, 'adres')}
                        />
                    </FormGroup>
                </Form>
            </div>
        );
    }

    editClick() {
        this.toggle();
        this.setState({
            modalTitle: "Düzenle",
            modalContent: this.formContent()
        });
    }

    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        });
    };

    handleSubmit = async () => {
        const { unvan, telefon, adres } = this.state;

        try {
            const response = await fetch('Customer/Create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ unvan, telefon, adres }),
            });

            if (response.ok) {
                console.log('Veri başarıyla post edildi');
                this.toggle();
                this.setState({ loading: true });
                this.getCustomerData();
            } else {
                console.error('Veri post edilirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    };

    async getCustomerData() {
        const response = await fetch('Customer');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

    deleteClick(id) {
        if (window.confirm("Bu müşteriyi silmek istediğinizden emin misiniz?")) {
            this.deleteCustomer(id);
        }
    }

    async deleteCustomer(id) {
        try {
            const response = await fetch(`Customer/Delete/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Müşteri başarıyla silindi');
                this.setState({ loading: true });
                this.getCustomerData();
            } else {
                console.error('Müşteri silinirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    }

}