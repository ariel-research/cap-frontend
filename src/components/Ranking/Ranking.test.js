import { render, fireEvent } from "@testing-library/react";
import  Ranking from "./Ranking"
import  Navbar  from "./Navbar"


describe("Render correctly",()=>{
  it("Ranking",()=>{
    const { queryByTestId } = render(<Ranking />);
    const office = queryByTestId("Rank");
    const nb = queryByTestId("RankEdit");
    const nb = queryByTestId("nb");
    expect(Rank).toBeTruthy();
    expect(RankEdit).toBeTruthy();
    expect(nb).toBeTruthy();
  });

});