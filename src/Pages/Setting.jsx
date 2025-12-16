import React, { useEffect, useState } from "react";
import { Select, Table, TimePicker, message } from "antd";
import dayjs from "dayjs";
import { configureSotAllDayAPI, configureSotAllDayDeleteAPI, getAllDayConfigAPI, settingList } from "../Hoc/api";
import moment from "moment";

const dayOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
];

const configTypeOptions = [
    { value: "1", label: "Config All Day" },
    { value: "2", label: "Config Particular Day" },
];

const Setting = () => {
    const [formstate, setFormstate] = useState({
        selecteCourt: "1",
        configType: "1",
        holidays: [],
        startTime: null,
        endTime: null,
        isThisDayHoliday: false,
        eachSlotPrice: 0,
        particularDate: Date.now(),
        APIData: {}
    });

    const [addOrUpdate, setAddorUpdate] = useState({
        create: false,
        edit: false,
        delete: false,
        data: null
    })

    const [loading, setLoding] = useState({
        listLoading: false
    })

    const [formstateList, setFormstateList] = useState({
        data: [],
        page: 1,
        limit: 10,
        totalPages: '',
        totalRecords: '',
    })

    const [sportsList] = useState([
        { name: <>🏏 Cricket</>, value: 1 },
        { name: <>🎾 Pickleball</>, value: 2 },
        { name: <>🏏 Stitchball</>, value: 3 },
        { name: <>⚽ Football</>, value: 4 },
    ]);


    const config1Column = [
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
            title: 'Holidays',
            key: 'holidates',
            render: (data) => {
                return String(data?.defaultWeekdayHoliday);
            }
        },
        {
            title: 'Start Time',
            key: 'startTime',
            render: (data) => {

                return moment(data?.everydayStartTime, "HH:mm").format("hh:mm A");
            }

        },
        {
            title: 'End Time',
            key: 'endTime',
            render: (data) => {
                return moment(data?.everydayEndTime, "HH:mm").format("hh:mm A");
            }

        },

        {
            title: "Action",
            key: "action",
            render: (data) => {
                return <>
                    <button onClick={() => {
                        setAddorUpdate(prev => {

                            return {
                                ...prev,
                                edit: true,
                                data: data
                            }
                        })
                    }}>Edit</button>



                </>
            }
        }
    ];

    const config2Column = [
        {
            title: 'Court Type',
            key: 'courtType',
            dataIndex: 'courtType',
            render: (courtType) => {
                const sport = sportsList.find((sport) => sport.value == courtType);
                return sport ? sport.name : courtType;
            }
        },
        {
            title: 'Particular Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => {
                return date ? moment(date).format('DD-MM-YYYY') : '-'
            }
        },
        {
            title: 'Is This Day Holiday',
            dataIndex: 'isHoliday',
            key: 'isHoliday',
            render: (isThisDayHoliday) => isThisDayHoliday ? "Yes" : "No",
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (data) => {
                return data ? moment(data, "HH:mm").format("hh:mm A") : '-';
            }
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
            key: 'endTime',
            render: (data) => {
                return data ? moment(data, "HH:mm").format("hh:mm A") : '-';
            }
        },
        {
            title: "Action",
            key: "action",
            render: (data) => {
                return <>
                    <button onClick={() => {
                        setAddorUpdate(prev => {

                            return {
                                ...prev,
                                edit: true,
                                data: {
                                    id: data.id,
                                    courtType: data.courtType,
                                    particularDate: data.date,
                                    isThisDayHoliday: data.isThisDayHoliday,
                                    startTime: data.startTime,
                                    endTime: data.endTime
                                }
                            }
                        })
                    }}>Edit</button>

                    <button onClick={() => {
                        setAddorUpdate(prev => {

                            return {
                                ...prev,
                                delete: true,
                                data: data
                            }
                        })
                    }}>Delete</button>
                </>
            }
        }
    ];


    const handleFormState = (e) => {
        const { name, value } = e.target;
        setFormstate((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    

    const handleSubmit = async () => {



        const start = moment(formstate.startTime, "HH:mm");
        const end = moment(formstate.endTime, "HH:mm");

        if (!isNaN(start) && !isNaN(end) && start.isSameOrAfter(end)) {
            alert("Start time cannot be greater than End time");
            return;
        }

        console.log(formstate, 'for,m');

        // Build request body
        const body = {
            courtType: formstate.selecteCourt,
            startTime: formstate.startTime ? formstate.startTime : null,
            endTime: formstate.endTime ? formstate.endTime : null,
            holidates: formstate.holidays || [],
            configType: formstate.configType,
            particularDate: formstate.particularDate || null,
            isThisDayHoliday: formstate.isThisDayHoliday || false,
            eachSlotPrice: !isNaN(formstate.eachSlotPrice) ? parseFloat(formstate.eachSlotPrice).toFixed(2) : null
        };

        try {

            const res = await configureSotAllDayAPI(body);
            const data = res;
            let dto = {
                selecteCourt: data.courtType,
                configType: data.configType,
                holidays: data.holidates,
                startTime: data.startTime ? data.startTime : null,
                endTime: data.endTime ? data.endTime : null,
                particularDate: data.particularDate ? moment(data.particularDate).format("YYYY-MM-DD") : null,
                isThisDayHoliday: data.isThisDayHoliday,

            };
            setFormstate((prev) => ({
                ...prev,
                ...dto,
                configType: prev.configType,
                APIData: {
                    ...dto
                }
            }));
            alert("All-day configuration saved");
        } catch (err) {
            console.error("all-day-setting error:", err);
            alert("Failed to save configuration");
        } finally {

            clear()
        }


    };

    const clear = () => {
        setAddorUpdate(prev => {
            return {
                ...prev,
                create: false,
                edit: false,
                data: null,
                delete: false
            }
        })

    }

    const handleCancel = () => {
        clear()
        setFormstate((prev) => ({
            ...prev,
            ...prev.APIData,
        }));
    };

    const handleTimeChange = (field, time) => {
        setFormstate((prev) => {
            const newState = { ...prev, [field]: time };

            // Validation: start time must be before end time
            if (newState.startTime && newState.endTime) {
                const start = moment(newState.startTime, "HH:mm");
                const end = moment(newState.endTime, "HH:mm");
                if (start.isSameOrAfter(end)) {
                    alert("Start time cannot be greater than End time")
                    newState[field] = null;
                }
            }
            console.log(newState, 'new star');


            return newState;
        });
    };


    useEffect(() => {

        if (addOrUpdate.create || addOrUpdate.delete || addOrUpdate.delete) {
            return;
        }
        setLoding((prev) => ({
            ...prev,
            listLoading: true
        }))

        settingList({
            configType: formstate.configType,
            page: formstateList.page,
            limit: formstateList.limit,
        }).then((res) => {

            if (res) {
                setFormstateList((prev) => ({
                    ...prev,
                    data: res.data,
                    totalPages: res.totalPages,
                    totalRecords: res.totalRecords,
                }))


            }
        }).finally(() => {
            setLoding((prev) => ({
                ...prev,
                listLoading: false
            }))
        })

    }, [formstate.configType, addOrUpdate.data])

    console.log(formstate, 'fffa');


    useEffect(() => {
        const fetchUpdateData = async () => {
            if (addOrUpdate.data) {
                await getAllDayConfigAPI({
                    configType: formstate.configType,
                    courtType: addOrUpdate.data?.courtType,
                    particularDate: addOrUpdate.data?.particularDate,
                    id: addOrUpdate.data?.id
                }).then(r => {

                    console.log(r, ' rresponce');

                    const res = r.data;
                    if (formstate.configType == '1') {

                        console.log(moment(res.everydayStartTime, "hh:mm").format("hh:mm"), 'moment(res.everydayStartTime, "hh:mm").format("HH:mm")');
                        console.log(moment(res.everydayEndTime, "hh:mm").format("hh:mm"), 'moment(res.everydayStartTime, "hh:mm").format("HH:mm")');

                        setFormstate(prev => {
                            return {
                                ...prev,
                                startTime: res.everydayStartTime ? moment(res.everydayStartTime, "HH:mm").format("HH:mm") : null,
                                endTime: res.everydayEndTime ? moment(res.everydayEndTime, "HH:mm").format("HH:mm") : null,
                                holidays: res.defaultWeekdayHoliday ? String(res.defaultWeekdayHoliday).split(',') : [],
                                selecteCourt: addOrUpdate.data?.courtType,
                                eachSlotPrice: res.eachSlotPrice,
                            }
                        })
                    }

                    if (formstate.configType == '2') {

                        setFormstate(prev => {
                            return {
                                ...prev,
                                startTime: res.startTime ? moment(res.startTime, "hh:mm").format("hh:mm") : null,
                                endTime: res.endTime ? moment(res.endTime, "hh:mm").format("hh:mm") : null,
                                particularDate: moment(res.date).format("YYYY-MM-DD"),
                                selecteCourt: res.courtType,
                                isThisDayHoliday: res.isHoliday,
                                eachSlotPrice: res.eachSlotPrice,
                            }
                        })

                    }

                })
            }
        }

        fetchUpdateData()


    }, [addOrUpdate.edit,])

    console.log(formstate, 'from state');


    return (
        <div className="section" style={{ padding: 20 }}>

            <div>
                {!addOrUpdate.create && !addOrUpdate.edit && <>
                    <h2>Config Type</h2>
                    <Select
                        style={{ width: 250, marginBottom: 20 }}
                        placeholder="Select Config Type"
                        value={formstate.configType}
                        onChange={(e) => {

                            setFormstate((prev) => ({
                                ...prev,
                                configType: e,
                            }))
                        }

                        }
                        options={configTypeOptions}
                        optionFilterProp="label"
                    /></>
                }
                <button onClick={() => {
                    if (addOrUpdate.create || addOrUpdate.edit) {
                        clear()
                    } else {
                        setAddorUpdate(prev => {
                            return {
                                ...prev,
                                create: true
                            }
                        })
                    }

                }}>
                    {addOrUpdate.create || addOrUpdate.edit ? "Close" : "Create"}
                </button>
            </div>

            {!addOrUpdate.create && !addOrUpdate.edit && <div style={{ border: '1px solid black' }}>
                <Table loading={loading.listLoading} pagination={false} dataSource={formstateList.data} columns={formstate.configType == 1 ? config1Column : config2Column} />
            </div>}




            {(addOrUpdate.create || addOrUpdate.edit) &&
                <>


                    <h2>Select Court</h2>
                    <div className="radio-group" style={{ marginBottom: 20 }}>
                        {sportsList.map((i) => (
                            <label key={i.value} className="radio-label" style={{ marginRight: 15 }}>
                                <input
                                    type="radio"
                                    name="selecteCourt"
                                    onChange={addOrUpdate.edit ? () => {
                                        alert("Cannot change court type while editing")
                                    } : handleFormState}
                                    value={i.value}
                                    checked={formstate.selecteCourt == i.value}
                                />{" "}
                                {i.name}
                            </label>
                        ))}
                    </div>



                    {
                        formstate.configType == 2 && (<div>
                            <h2>Select Date</h2>
                            <input
                                type="date"
                                name="particularDate"
                                onChange={handleFormState}
                                value={formstate.particularDate || ""}
                            />

                        </div>)
                    }

                    {formstate.configType && (
                        <>
                            <h2>Time Configuration</h2>
                            <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
                                <div>
                                    <label>Start Time:</label>
                                    <br />
                                    <TimePicker
                                        format="h A"
                                        use12Hours
                                        minuteStep={60}
                                        value={formstate.startTime ? moment(formstate.startTime, "HH") : null}
                                        onChange={(t) =>
                                            handleTimeChange("startTime", t ? t.format("HH:mm") : null)
                                        }
                                        showNow={false}
                                    />
                                </div>
                                <div>
                                    <label>End Time:</label>
                                    <br />
                                    <TimePicker
                                        format="h A"
                                        use12Hours
                                        minuteStep={60}
                                        value={formstate.endTime ? moment(formstate.endTime, "HH") : null}
                                        onChange={(t) =>
                                            handleTimeChange("endTime", t ? t.format("HH:mm") : null)
                                        }
                                        showNow={false}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {formstate.configType == 1 && (
                        <div>
                            <h2>Select Holiday Days</h2>
                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: 250 }}
                                placeholder="Select days"
                                value={formstate.holidays}
                                onChange={(e) =>
                                    setFormstate((prev) => ({
                                        ...prev,
                                        holidays: e,
                                    }))
                                }
                                options={dayOptions}
                                optionFilterProp="label"
                            />
                        </div>
                    )}


                    {
                        formstate.configType == 2 && (<>
                            <div>
                                <h2>Is This Day Holiday?</h2>
                                <Select
                                    style={{ width: 250 }}
                                    defaultValue={formstate.isThisDayHoliday}
                                    placeholder="Select Option"
                                    value={formstate.isThisDayHoliday}
                                    onChange={(e) =>
                                        setFormstate((prev) => ({
                                            ...prev,
                                            isThisDayHoliday: e,
                                        }))
                                    }
                                    options={[
                                        { value: true, label: "Yes" },
                                        { value: false, label: "No" },
                                    ]}
                                    optionFilterProp="label"
                                />
                            </div>
                        </>)
                    }

                    <div>
                        <h2>Each Slot Price</h2>
                        <input
                            type="number"
                            name="eachSlotPrice"
                            onChange={handleFormState}
                            value={formstate.eachSlotPrice}
                        />

                    </div>

                    <div>
                        <button onClick={handleSubmit}>Submit
                        </button>
                        <button onClick={handleCancel} >
                            cancel
                        </button>
                    </div>
                </>
            }

            {
                addOrUpdate.delete && <div>
                    <h2>Are you sure you want to delete this configuration?</h2>
                    <button onClick={async () => {
                        try {
                            const res = await configureSotAllDayDeleteAPI({
                                id: addOrUpdate.data.id,
                                configType: formstate.configType
                            });
                            alert("Configuration deleted successfully");
                        } catch (err) {
                            console.error("delete-configuration error:", err);
                            alert("Failed to delete configuration");
                        } finally {
                            clear()
                        }
                    }}>Yes, Delete</button>
                    <button onClick={clear}>Cancel</button>
                </div>
            }
        </div>
    );
};

export default Setting;
