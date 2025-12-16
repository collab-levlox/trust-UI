import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { slotsListAPI } from "../Hoc/api";

const AvailSlot = ({ rerender = false, date = null, selectedSport = "", callBack = () => {} }) => {


    const [loading, setLoading] = useState(false);


    const [formstate, setFormstate] = useState({
        slotFromTime: "",
        slotToTime: "",
        bookedSlot: [],
        selectedSlot: [],
        isHoliday: false,
        eachSlotPrice: 0,
        totalPrice: 0
    })



    const onchangeSlot = (e, booked) => {
        if (booked) {
            return
        }

        callBack({
            type:"click-slot",
            data:e
        });

        if (formstate.selectedSlot.includes(e)) {
            let list = formstate.selectedSlot.filter((item) => item !== e);
            setFormstate(prev => {
                return {
                    ...prev,
                    selectedSlot: list
                }
            })

        } else {
            let list = [...formstate.selectedSlot, e]
            setFormstate(prev => {
                return {
                    ...prev,
                    selectedSlot: list
                }
            })

        }
    }
    const slotListgenerate = (start, end, date = moment().format("YYYY-MM-DD")) => {
        const startMoment = moment(`${date} ${start}`, "YYYY-MM-DD hh:mm A");
        const endMoment = moment(`${date} ${end}`, "YYYY-MM-DD hh:mm A");

        const slots = [];

        while (startMoment.isBefore(endMoment)) {
            slots.push(startMoment.format("hh:mm A"));
            startMoment.add(1, "hours");
        }

        return slots;
    };



    const slotList = useMemo(() => {


        return <ul>
            {
                slotListgenerate(formstate.slotFromTime, formstate.slotToTime).map((i, index) => {
                    let booked = formstate.bookedSlot.includes(i)
                    let selected =formstate.selectedSlot.includes(i)
                    return <li key={index} onClick={() => {
                        onchangeSlot(i, booked)
                    }} style={{
                        border: '1px solid black',
                    }} className={`${booked ? 'booked' : ""} ${selected ? 'selected' : ''}`}>
                        {i} {booked ? 'Booked' : ''}    {selected ? 'Selected' : ''}
                    </li>
                })
            }
        </ul>
    }, [formstate.selectedSlot, formstate.slotFromTime, formstate.bookedSlot])

    

    const checkSlotApi = async () => {

        try {
            setLoading(true);
            const data = await slotsListAPI({
                courtType: selectedSport,
                date: moment(date).format("YYYY-MM-DD"),
            })


            setFormstate(prev => ({
                ...prev,
                slotFromTime: data.data.startTime,
                slotToTime: data.data.endTime,
                eachSlotPrice: data.data.eachSlotPrice,
                bookedSlot: data.data.bookedSlot,
                isHoliday: data.data.isHoliday
            }));
            setLoading(false);
        } catch (error) {
            alert(error.message);
            setLoading(false);
        }
    }


    const totalAmount = useMemo(() => {
        return formstate.selectedSlot.length * formstate.eachSlotPrice
    }, [formstate.selectedSlot])
    useEffect(() => {
        if (date) {
            setFormstate((prev ) => {
                return {
                    ...prev,
                    selectedSlot:[],
                    
                }
            })
            checkSlotApi();
        }
    }, [date, rerender])


    if (!date) {
        return <> date is not selected</>
    }


    if (loading) {
        return <div>
            <p>Loading...</p>
        </div>
    }

    if (formstate.isHoliday) {
        return <div>
            <p>here we are not avilable to you  sorry !!!!</p>
        </div>
    }

    return <div>
        {formstate.eachSlotPrice && <p>Each Slot Price - {formstate.eachSlotPrice}</p>}
        {
            formstate.selectedSlot.length != 0 && <p>Total Price - {totalAmount}</p>
        }
        {
            slotList
        }
    </div>
}


export default AvailSlot;