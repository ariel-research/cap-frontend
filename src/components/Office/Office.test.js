import { render, fireEvent } from "@testing-library/react";
import  Office from "./Office"
import  Navbar_Office  from "./Navbar_Office"
import { DateRangePicker } from'react-dates';

describe("Render correctly",()=>{
  it("Office, Navbar & Datepicker",()=>{
    const { queryByTestId } = render(<Office />);
    const office = queryByTestId("office");
    const nb_office = queryByTestId("nb_office");
    const datepicker = queryByTestId("datepicker");
    expect(office).toBeTruthy();
    expect(nb_office).toBeTruthy();
    expect(datepicker).toBeTruthy();
  });

  // it("Check start date picker",()=>{
  //   const { queryByTestId } = render(<Office />);
  //   const startDateField = queryByTestId("start_date_picker");
  //   console.log(startDateField);
  // });

  it("Check button click",()=>{
    const { queryByTestId } = render(<Office />);
    const btn = queryByTestId("save_button");
    const startDateField = queryByTestId("start_date_field");
    const endDateField = queryByTestId("end_date_field");
    expect(btn).toBeTruthy();
    expect(startDateField).toBeTruthy();
    expect(endDateField).toBeTruthy();
    
    fireEvent.change(startDateField);
    fireEvent.change(endDateField);
    fireEvent.click(btn);
    expect(btn).toBeEnabled();
  });

});

