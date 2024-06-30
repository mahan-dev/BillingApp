import React, { useEffect, useState } from 'react';
import { stringify, v4 as uuidv4 } from "uuid";
import "../styles/homeStyles.css";
import trashIcon from "../assets/admin_pic/trash.svg";
// importing calender 
import DateObject from "react-date-object";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

// import { Calendar } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";

const Admin_Dashboard = ({ children }) => {
    const [date, setDate] = useState();


    const [value, setValue] = useState();

    const [BillName, setBillName] = useState("آب");
    const [todoList, setTodoList] = useState([]);
    const [price_Number, setPriceNumber] = useState(0);
    const [priceCounter, setPriceCounter] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState("");
    const [unitCounter, setUnitCounter] = useState(1);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editingItem, setEditingItem] = useState({});
    // const [UnitIncreaser, setUnitIncreaser] = useState(nul);
    const getUniqueId = uuidv4();

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("lists")) || [];
        const storedUnitCounter = localStorage.getItem("unitCounter") || 0;
        const dateObject = JSON.parse(localStorage.getItem("currentDate"));
        setDate(dateObject)
        setTodoList(storedList);
        setTotalPrice(sumItems(storedList));
        setUnitCounter(Number(storedUnitCounter));
    }, []);

    const priceHandlerInput = (e) => {
        let saveValue = e.target.value;
        setPriceNumber(Number(saveValue));
        setPriceCounter(Number(saveValue));
    };
    let unitcounter = 0;
    const unitCounterF = () =>{
        unitcounter = todoList.length
    }
    unitCounterF();
    const handleChange = (event) => {
        const saveValues = event.target.value;
        console.log(saveValues);
    };

    const sumItems = (items) => {
        return items.reduce((total, item) => total + item.Price, 0);
    };

    const persianToLatin = (persianNumber) => {
        const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        const latinDigits = "0123456789";
        return persianNumber.replace(/[۰-۹]/g, (w) => latinDigits[persianDigits.indexOf(w)]);
      };
    

    const handleAddedPart = () => {
        const saveValue = document.querySelector('.todo_input').value;
        let priceNumber = Number(price_Number);
        const date = new DateObject({ calendar: persian, locale: persian_fa , digits: "latina"});
            const formattedDate = date.format();
            let convertor  = persianToLatin(formattedDate);
            console.log(convertor)
        if ((saveValue.trim() !== "" && BillName.trim() !== "") && price_Number !== 0) {
            
            const UnitIncreaser = Number(unitCounter + 1);
            const itemObject = {
                input: saveValue,
                select: BillName,
                uId: getUniqueId,
                Price: priceNumber,
                unit: UnitIncreaser,
                dateOfBill: convertor,
            };
            setUnitCounter(UnitIncreaser);
            localStorage.setItem("unitCounter", JSON.stringify(UnitIncreaser))

            savedLocalLists(itemObject);
            setTotalPrice(prevTotal => prevTotal + priceNumber);

            
            setDate(convertor);
            localStorage.setItem("currentDate", JSON.stringify(convertor));
            // localStorage.setItem("currentDate", JSON.stringify(formattedDate));
            console.log(`Current Persian Date: ${formattedDate}`);


        } else {
            setError("توضیحات یا قیمت را خالی نگذارید !");
        }
    };

    const savedLocalLists = (item) => {
        let todo = JSON.parse(localStorage.getItem("lists")) || [];
        todo.push(item);
        localStorage.setItem("lists", JSON.stringify(todo));
        setTodoList(todo);
    };

    const handleSelected = (event) => {
        const selectedOption = event.target.selectedOptions[0];
        const selectedText = selectedOption.textContent;
        setBillName(selectedText);
        console.log('Selected text:', selectedText);
    };

    const removeItem = (id) => {
        console.log(id);
        const removeItem = todoList.filter(item => id !== item.uId);
        localStorage.setItem("lists", JSON.stringify(removeItem));
        
        setTodoList(removeItem);
        setTotalPrice(sumItems(removeItem));
        if (removeItem(id) && localStorage.getItem("lists") === "" || localStorage.getItem("lists") === null  || localStorage.getItem("unitCounter") !== null) {
            localStorage.clear();
            setTodoList([]);
            setTotalPrice(0);
            setUnitCounter(0);

        }
        // let number  = JSON.parse(localStorage.getItem("unitCounter"))
        // localStorage.setItem("unit_Decrease_Count", JSON.stringify(number - 1) )
        // setUnitCounter(unitCounter); 
    };

    const removeItems = () => {
        localStorage.clear();
        setTodoList([]);
        setTotalPrice(0);
        setUnitCounter(0);
    };

    const startEditing = (index) => {
        console.log(index)
        setEditingIndex(index);
        setEditingItem(todoList[index]);
        console.log(todoList[index])
    };

    const handleEditChange = (e, field) => {
        if (isNaN(e.target.value)) {
            setEditingItem({ ...editingItem, [field]: e.target.value });    
        } else if(Number(e.target.value)){

            setEditingItem({ ...editingItem, [field]: Number(e.target.value) });
        }
        // console.log(e.target.value)
        // console.log(editingItem)
    };

    const Onclick = (event)=>{
        console.log(event.target.value)
    }
   
    const saveEdit = () => {
        const updatedList = [...todoList];
        console.log(updatedList)
        updatedList[editingIndex] = editingItem;
        localStorage.setItem("lists", JSON.stringify(updatedList));
        setTodoList(updatedList);
        setEditingIndex(-1);
        setEditingItem({});
        setTotalPrice(sumItems(updatedList));
    };

    return (
        <section className="admin-dashboard py-16">
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>واحد</th>
                        <th>توضیحات</th>
                        <th>قیمت</th>
                        <th>دسته بندی</th>
                        <th>ویرایش</th>
                        <th>پاک کردن</th>
                        <th>تاریخ</th>
                    </tr>
                </thead>
                <tbody>
                    {todoList.map((item, index) => (
                        <tr key={index}>
                            {editingIndex === index ? (
                                <>
                                    <td className='text-w'>واحد {item.unit}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={editingItem.input}
                                            onChange={(e) => handleEditChange(e, 'input')}
                                        />
                                    </td>
                                    <td className=''>
                                        <input
                                            type="number"
                                            value={editingItem.Price}
                                            onChange={(e) => handleEditChange(e, 'Price')}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            value={editingItem.select}
                                            onChange={(e) => handleEditChange(e, 'select')}
                                        >
                                            <option value="آب">آب</option>
                                            <option value="برق">برق</option>
                                            <option value="گاز">گاز</option>
                                            <option value="سایر">سایر</option>
                                        </select>
                                    </td>
                                    <td onClick={saveEdit} className='cursor-pointer' >save</td>
                                    <td onClick={() => removeItem(item.uId)}>
                                        <img src={trashIcon} className='trashIcon' alt="" width={25} />
                                    </td>
                                    
                                </>
                            ) : (
                                <>
                                
                                  
                                        
                                     <td> <label className='unitNumber' htmlFor="">واحد : </label> واحد {item.unit} </td> 
                                        
                                     
                                    <td> <label className='descriptionInput  outline_fixer' htmlFor="">توضیحات : </label> {item.input}</td>
                                    <td> <label className='priceInput outline_fixer' htmlFor=""></label> {`${item.Price} هزارتومان`}</td>
                                    <td> <label className='category outline_fixer' htmlFor="">دسته بندی : </label>{item.select}</td>
                                    <td className='cursor-pointer' onClick={() => startEditing(index)}>ویرایش</td>
                                    <td onClick={() => removeItem(item.uId)}>
                                        <img src={trashIcon} className='trashIcon' alt="" width={25} />
                                    </td>
                                    <td> <label htmlFor='' className='date' >تاریخ : </label> {date} </td>
                                </>
                            )}
                        </tr>
                    ))}
                    <tr>
                        <td>
                            <input className='todo_input text-center outline-none' type="text" onChange={handleChange} placeholder='توضیحات' />
                        </td>
                        <td>
                            <input className='price_Input text-center outline-none' type="number" placeholder="قیمت را وارد کنید" onChange={priceHandlerInput} />
                        </td>
                        <td className='table_data_options'>
                            <label htmlFor="browser">انتخاب کنید :</label>
                            <select style={{ cursor: "pointer" }} id="browser" name="browser" onChange={handleSelected}>
                                <option value="آب">آب</option>
                                <option value="برق">برق</option>
                                <option value="گاز">گاز</option>
                                <option value="سایر">سایر</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" onClick={handleAddedPart} className='editPart'>اضافه کنید</td>
                    </tr>
                    <tr>
                        <td onClick={removeItems} className='editPart'>پاک کنید</td>
                    </tr>
                </tbody>
            </table>

            <div className='errorMessage'>{error}</div>

            <div className='total'>قیمت کل: {totalPrice} هزارتومان</div>
            <div className='total'>تعداد واحد : {unitcounter}</div>
        </section>
    );
};

export default Admin_Dashboard;
