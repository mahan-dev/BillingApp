import React, { useEffect, useState } from 'react';

// FormPage Component
const FormPage = () => {
  const [grabData, setGrabData] = useState([]);

  // Retrieve data from local storage when the component mounts
  useEffect(() => {
    const grabber = localStorage.getItem("lists");
    if (grabber) {
      try {
        const setLocalLists = JSON.parse(grabber);
        setGrabData(setLocalLists);
      } catch (error) {
        console.log("Error parsing local storage data: ", error);
      }
    }
  }, []);

  return (
    <section className="container">
      <header className='header'>
        قبضتو
      </header>
      <h2 className="title">گزارشات</h2>
      <form>
        <div className="table-container">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>واحد</th>
                <th>توضیحات</th>
                <th>قبض</th>
                <th>قیمت</th>
                <th>شناسه</th>
              </tr>
            </thead>
            <tbody>
              {grabData.map((item, index) => (
                <tr key={index}>
                  <td>واحد {item.unit}</td>
                  <td>{item.input}</td>
                  <td>{item.select}</td>
                  <td>{item.Price} هزارتومان</td>
                  <td>{item.uId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </section>
  );
};

export default FormPage;
