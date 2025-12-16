import { useEffect, useState } from "react";
import { bookingSlotList } from "../Hoc/api";
import { Table } from "antd";
import moment from "moment";

const BookingSlotList = () => {

    const [formstate, setFormstate] = useState({
        data: [],
        loading: false,
        selectedCourt: 1,
        selectedDate: moment().format("YYYY-MM-DD"),
    });

    const [sportsList, setSportList] = useState([{
        name: <>🏏 Cricket</>,
        value: 1,
    },
    {
        name: <>🎾 Pickleball</>,
        value: 2,
    },
    {
        name: <> 🏏 Stitchball</>,
        value: 3,
    },
    {
        name: <>⚽ Football</>,
        value: 4
    }
    ])

    const columns = [
        {
            title: "S.No",
            key: 'S.No',
            render: (_, id) => {
                return id.id;
            }
        },
        {
            title: 'Court Type',
            dataIndex: 'courtType',
            key: 'courtType',
            render: (courtType) => {
                const sport = sportsList.find((sport) => sport.value == courtType);
                return sport ? sport.name : courtType;
            }
        },

        {
            title: 'Slot Timeings',
            key: 'slotTime',
            render: (data) => {

                return data?.slotBookedTime.split(',').map(i => {
                    return <button style={{margin:'6px 6px'}}> 
                        {i}
                    </button>
                });
            }

        },

          {
            title: 'Slot Count ',
            key: 'slotTime',
            render: (data) => {

                return <><button>{data?.slotBookedTime.split(',').length}</button></>
            }

        },
           {
            title: 'Paid Amount',
            key: 'paid amount',
            render: (data) => {
                return data?.paidAmount
            }

        },
           {
            title: 'bal Amount',
            key: 'ball',
            render: (data) => {
                let needToPay = data?.balAmount > 0;
                return <div style={{background:needToPay ? 'red' : 'green', color:'white', padding:'5px', borderRadius:'5px'}}>
                {data?.balAmount > 0 ? data?.balAmount : '0'}
                </div>
            }

        },
        {
            title: 'Name',
            key: 'name',
            render: (data) => {
                return data?.user.name
            }

        },

        {
            title: 'Mobile Number',
            key: 'mobule',
            render: (data) => {
                return data?.user.mobile
            }

        },
        {
            title: "Booked At",
            key: 'Booked At',
            render: (data) => {
                return moment(data?.createdAt).format("DD-MM-YYYY hh:mm A");
            }
        },
        {
            title: "Booked By",
            dataIndex:"bookedBy",
            key: 'bookedBy',
        },

    ];

    const fetchBooking = async () => {
        bookingSlotList({
            date: formstate.selectedDate,
            courtType: formstate.selectedCourt
        }).then((res) => {

            setFormstate((prev) => {
                return {
                    ...prev,
                    data: res.data,
                    loading: false
                }
            })

        }).catch((err) => {
            alert(err.message);
            setFormstate((prev) => {
                return {
                    ...prev,
                    data: [],
                    loading: false
                }
            })

        })
    }

    useEffect(() => {

        if (formstate.selectedCourt && formstate.selectedDate) {
            fetchBooking()
        }

        // Fetch the list of booking slots from the backend API
        // and store them in the component's state
    }, [formstate.selectedCourt, formstate.selectedDate])

    


    return (
        <div>
            <h1>Booking Slot List</h1>

            <div className="section">
                <div className="radio-group">
                    {
                        sportsList.map(i => {
                            return <>
                                <label className="radio-label">
                                    <input type="radio" name="selectedSport" value={i.value} checked={i.value == formstate.selectedCourt} onChange={(e) => {
                                        setFormstate(prev => ({ ...prev, selectedCourt: e.target.value }));
                                    }} /> {i.name}
                                </label>
                            </>
                        })
                    }
                </div>
            </div>


            <h2>Select Date</h2>
            <input
                type="date"
                name="particularDate"
                onChange={(e) => {
                    setFormstate(prev => ({ ...prev, selectedDate: e.target.value }));
                }}
                value={formstate.selectedDate}
            />


            <Table loading={formstate.loading} pagination={false} dataSource={formstate.data} columns={columns} />

        </div>
    );
}
export default BookingSlotList;