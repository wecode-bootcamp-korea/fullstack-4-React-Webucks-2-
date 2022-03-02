import "./Main.scss";
import TopsNav from "../components/TopsNav/TopsNav";
import Brew from "../components/CoffeCard/CoffeCard";
import coffeeData from "../coffeedata.json"


export default function Main (){
  return(
    <div className="List">
  <TopsNav/>
    <div className="coldbrew">
      콜드 브루 커피 &nbsp;&nbsp;☕️ &nbsp;
      <span className="description"
        >디카페인 에스프레스 샷 추가 가능 (일부 음료 제외)</span >
    </div>
    <section className="coldbrewSection">
        {coffeeData.map((data)=> {
        if(data.isCold){
    return    <Brew key={data.id} coffeeData={data}/>
    }
})}
    </section>

    <div className="brewedCoffee">
      브루드 커피 &nbsp;&nbsp;☕️ &nbsp;
      <span className="description"
        >디카페인 에스프레스 샷 추가 가능 (일부 음료 제외)</span
      >
    </div>
    <section className="brewedSection">
    {coffeeData.map((data)=> {
        if(!data.isCold){
    return    <Brew coffeeData={data}/>
    }
})}
    </section>
    </div>
  )
}
