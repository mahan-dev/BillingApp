import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import "../styles/homeStyles.css";
import trashIcon from "../assets/admin_pic/trash.svg";


const Admin_Dashboard = ({ children }) => {
    const [value, setValue] = useState();
    const [BillName, setBillName] = useState("آب");
    const [todoList, setTodoList] = useState([]);
    const [price_Number, setPriceNumber] = useState(0);
    const [priceCounter, setPriceCounter] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState("");
    const getUniqueId = uuidv4();
    const [unitCounter, setUnitCounter] = useState(0);


    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("lists")) || [];
        setTodoList(storedList);
        setTotalPrice(sumItems(storedList));
        setUnitCounter(unitCounter)
    }, []);

    const priceHandlerInput = (e) => {
        let saveValue = e.target.value;
        setPriceNumber(Number(saveValue));
        setPriceCounter(Number(saveValue));
    };


    const handleChange = (event) => {
        const saveValues = event.target.value;
        console.log(saveValues);
    };

    const sumItems = (items) => {
        return items.reduce((total, item) => total + item.Price, 0);
    };

    const handleAddedPart = () => {
        const saveValue = document.querySelector('.todo_input').value;
        let priceNumber = Number(price_Number);
        if ((saveValue.trim() !== "" && BillName.trim() !== "") && price_Number !== 0) {
            const UnitIncreaser = unitCounter + 1;
            const itemObject = {
                input: saveValue,
                select: BillName,
                uId: getUniqueId,
                Price: priceNumber,
                unit: UnitIncreaser,
            };
            setUnitCounter(UnitIncreaser);

            savedLocalLists(itemObject);
            setTotalPrice(prevTotal => prevTotal + priceNumber);
        } else {
            setError("توضیحات یا قیمت را خالی نگذارید !")
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
        console.log(id)
        const removeItem = todoList.filter(item => id !== item.uId)
        localStorage.setItem("lists", JSON.stringify(removeItem));
        setTodoList(removeItem)
        setTotalPrice(sumItems(removeItem))
    }


    const removeItems = () => {

        localStorage.clear();
        setTodoList([]);
        setTotalPrice(0);
        setUnitCounter(0);
        // savedLocalLists(removeItems)

    }

    return (
        <section className="admin-dashboard py-16">
            {/* {console.log(totalPrice)} */}
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>واحد</th>
                        <th>توضیحات</th>
                        <th>قیمت</th>
                        <th>دسته بندی</th>
                        <th>پاک کردن</th>
                    </tr>
                </thead>
                <tbody>

                    {todoList.map((item, index) => (
                        <tr key={index} >
                            {/* {console.log(index + 1)} */}
                            <td>واحد {item.unit}</td>
                            <td> {item.input} </td>
                            <td>{`${item.Price} هزارتومان`}  </td>
                            <td>{item.select}</td>
                            <td onClick={() => removeItem(item.uId)}>  <img src={trashIcon} className='trashIcon' alt=""  width={25}/>  </td>
                        </tr>
                    ))}


                    <tr>
                        <td>
                            <input className='todo_input text-center' type="text" onChange={handleChange} placeholder='توضیحات' />
                        </td>
                        <td>
                            <input className='price_Input text-center' type="number" placeholder="قیمت را وارد کنید" onChange={priceHandlerInput} />

                        </td>
                        <td>
                            <label htmlFor="browser">انتخاب کنید :</label>
                            <select style={{ cursor: "pointer" }} id="browser" name="browser" onChange={handleSelected}>
                                <option value="آب">آب</option>
                                <option value="برق">برق</option>
                                <option value="Safari">گاز</option>
                                <option value="Edge">سایر</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3" onClick={handleAddedPart} className='cursor-pointer'>اضافه کنید</td>

                    </tr>
                        <tr>
                    <td onClick={removeItems} className='cursor-pointer'>پاک کنید</td>

                        </tr>
                </tbody>
            </table>

            <div>{error}</div>

            <div className='total'>قیمت کل: {totalPrice} هزارتومان</div>
        </section>
    );
};

export default Admin_Dashboard;
