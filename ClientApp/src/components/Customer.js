import React, { Component } from 'react';

export class Customer extends Component {
    static displayName = Customer.name;

    constructor(props) {
        super(props);
        this.state = { customers: [], loading: true };
    }

    componentDidMount() {
        this.getCustomerData();
    }

    static renderCustomerTable(customers) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Unvan</th>
                        <th>Adres</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(item =>
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.unvan}</td>
                            <td>{item.adres}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {

        let contents = this.state.loading
            ? <p><em>Yükleniyor...</em></p>
            : Customer.renderCustomerTable(this.state.customers);

        return (
            <div>{ contents }</div>
        )
    }

    async getCustomerData() {
        const response = await fetch('Customer');
        const data = await response.json();
        this.setState({ customers: data, loading: false });
    }

}