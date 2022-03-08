import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import './Detail.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';

export function IconHeart() {
    return <FontAwesomeIcon icon = {faHeart}/>;
}
const Detail = () => {
    //초기값으로 가져오는 object값들은 값이 빈 값이나 undefined 처리가 된다.(배열이나 오브젝트가 값일 경우 읽지 못함)
    const params = useParams();
    const [coffeeDetail, setCoffeeDetail] = useState({
        id: '',
        cofeeDetail: {
            name: '',
            eng_name: '',
            description: '',
            imgUrl: '/images/seulaLee/notImg.png',
            imgAlt: '',
            isLike: false,
            isIce: false,     
            size:"Tall(톨)",
            volume:[],
            kcal:0,
            na:0,
            fat:0,
            sugar:0,
            protain:1,
            caffeine:232,
            alergy: [],
            review: {
                user_name: 'userName',
                user_comment:'userComment' 
            } 
        }
    }
); 
    useEffect(()=>{
        fetch(`/data/${params.id}.json`,{method:'GET'})
        .then(res => res.json())
            .then(data => {
                //console.log(data);
                setCoffeeDetail(data)      
            });
    },[]);
    return(
    <div className="wrap-seula">
        <div className="container-seula">
        <TopNav />
        <article className="coffee-detail">
        <h2 className="hidden">커피 상세정보</h2>
        <h3 className="coffee-section-default">콜드 브루</h3>
        <span className="page-route">홈 &gt; MENU &gt; 음료 &gt; 에스프레소 &gt; 나이트로 바닐라 크림</span>
                <CoffeeInfo data={coffeeDetail}/>
    </article>
               
        </div>
        <Footer/>
    </div>
    );
}
function CoffeeInfo({ data }) {
   
    return (
        <section className="coffee-info-container">
            <h2 className="hidden">커피 이미지 및 정보</h2>
            <div className="coffee-img-wrap">
                <img src={data.imgUrl} alt={data.imgAlt} />
            </div>
            <div className="coffee-info">
                <h3 className="coffee-info-title">
                    <ul className="coffee-info-txt">
                        <li>
                            <p>{data.name}</p>
                        </li>
                        <li> <small>{data["eng_name"] }</small></li>
                    </ul>
                    <span className="coffee-info-like"><IconHeart/></span>
                </h3>
                <div className="coffee-info-desc">{data.description }</div>
                
                <div className="coffee-info-nutri">
                    <div className="coffee-nutri-head">
                        <p>제품 영양 정보</p>
                        <span>{data.size}/{(data.volume === undefined ? 0 : data.volume[0])} ml ({(data.volume === undefined ? 0 : data.volume[1])}fl oz)</span>
                    </div>
                    <div className="coffee-nutri-cnt">
                        <div className="nutri1">
                            <dl>
                                <dt>1회 제공량 (kcal)</dt>
                                <dd>{data.kcal}</dd>
                            </dl>
                            <dl>
                                <dt>포화지방 (g)</dt>
                                <dd>{data.fat}</dd>
                            </dl>
                            <dl>
                                <dt>단백질 (g)</dt>
                                <dd>{data.protain}</dd>
                            </dl>
                        </div>
                        <div className="nutri2">
                            <dl>
                                <dt>나트륨 (mg)</dt>
                                <dd>{data.na}</dd>
                            </dl>
                            <dl>
                                <dt>당류 (g)</dt>
                                <dd>{data.sugar}</dd>
                            </dl>
                            <dl>
                                <dt>카페인 (mg)</dt>
                                <dd>{data.caffeine}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="cooffee-nutri-allergy">
                    {data.alergy}
                    </div>
                </div>
                <div className="coffee-review">
                    <h3 className="review-title">리뷰</h3>
                    <div className="review-cnt">
                        <dl className="review-user">
                            <dt>{(data.review === undefined ? '멋진리뷰어' : data.review['user_name'])}</dt>
                            <dd>{(data.review === undefined ? '정성담은 리뷰' : data.review['user_comment'])}</dd>
                        </dl>
                        <dl className="review-user">
                            <dt>북방의핑크팬더</dt>
                            <dd>오늘도 나이트로 뭐시기를 마시러 갑니다.</dd>
                        </dl>
                        <dl className="review-user">
                            <dt>딸기자일리톨</dt>
                            <dd>진짜 나이트로 바닐라 크림은 전설이다.진짜 나이트로 바닐라 크림은 전설이다.</dd>
                        </dl>
                    </div>
                    <input type="text" className="input-review" placeholder="리뷰를 입력해주세요." />
                </div>
                
            </div>
        </section>);

}

export {CoffeeInfo};
export default Detail;