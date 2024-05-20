import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";

export const checkGiver = createContext();

const Admin_Dashboard = ({ children }) => {
    const [value, setValue] = useState();
    const [BillName, setBillName] = useState("آب");
    const [todoList, setTodoList] = useState([]);
    const [price_Number, setPriceNumber] = useState(0);
    const [priceCounter, setPriceCounter] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0); 
    const [error, setError] = useState("");
    const getUniqueId = uuidv4();

    useEffect(() => {
        const storedList = JSON.parse(localStorage.getItem("lists")) || [];
        setTodoList(storedList);
        setTotalPrice(sumItems(storedList));
    }, []);

    const priceHandlerInput = (e) => {
        let saveValue = e.target.value;
        setPriceNumber(Number(saveValue));
        setPriceCounter(Number(saveValue));
    };

    const handleCheckBox = (e) => {
        if (e) {
            setValue(e.target);
        }
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
            const itemObject = {
                input: saveValue,
                select: BillName,
                uId: getUniqueId,
                Price: priceNumber,
            };

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

    return (
        <section className="admin-dashboard py-16">
            {console.log(totalPrice)}
            <table className="responsive-table">
                <thead>
                    <tr>
                        <th>واحد</th>
                        <th>توضیحات</th>
                        <th>قیمت</th>
                        <th>دسته بندی</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {todoList.map((item, index) => (
                        <tr key={index}>
                            {console.log(index+1)}
                            <td>واحد {index + 1}</td>
                            <td> {item.input} </td>
                            <td>{`${item.Price} هزارتومان`}  </td>
                            <td>{item.select}</td>
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
                        <td colSpan="3" onClick={handleAddedPart} className='cursor-pointer'>+ برای اضافه کردن</td>
                    </tr>
                </tbody>
            </table>
           
                        <div>{error}</div>
                 
            <checkGiver.Provider value={{ checked: value ? value.checked : false }}>
                {children}
            </checkGiver.Provider>
            <div className='total'>قیمت کل: {totalPrice} هزارتومان</div>
        </section>
    );
};

export default Admin_Dashboard;
