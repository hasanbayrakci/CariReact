import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CariHareket } from './CariHareket';


const Detail = () => {
    const { id } = useParams();
    const [customerData, setCustomerData] = useState({
                unvan: '',
                telefon: '',
                adres: '',
                vergiDairesi: '',
                vergiNo: ''
    });

    const detailCustomer = async (customerId) => {
        try {
            const response = await fetch(`Customer/Detail/${customerId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Müşteri bilgisi başarıyla alındı');
                const data = await response.json();
                setCustomerData({
                    unvan: data.unvan,
                    telefon: data.telefon,
                    adres: data.adres,
                    vergiDairesi: data.vergiDairesi,
                    vergiNo: data.vergiNo
                });
            } else {
                console.error('Müşteri bilgisi alınırken bir hata oluştu');
            }
        } catch (error) {
            console.error('Bir hata oluştu:', error);
        }
    }


    useEffect(() => {
        detailCustomer(id);
    }, [id]);

    return (
        <div>

            <div class="card">
                <div class="card-header">
                    <h5>{customerData.unvan}</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-4">
                            <div class="card">
                                <div class="card-header">
                                    Firma Bilgileri
                                </div>
                                <div class="card-body">
                                    <ol class="list-group">
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">Telefon</div>
                                                {customerData.telefon}
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">Vergi Dairesi</div>
                                                {customerData.vergiDairesi}
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">Vergi No</div>
                                                {customerData.vergiNo}
                                            </div>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-start">
                                            <div class="ms-2 me-auto">
                                                <div class="fw-bold">Adres</div>
                                                {customerData.adres}
                                            </div>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="col-8">
                            <CariHareket />
                            <hr></hr>
                            <div class="card">
                                <div class="card-header">
                                    Faturalar
                                </div>
                                <div class="card-body">
                                    <p class="card-text">
                                        xdfdfg
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Detail;
