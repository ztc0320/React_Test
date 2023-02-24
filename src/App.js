import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [subject, setSubject] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, setLike] = useState([0,0,0]);

  let [detail, setDetail] = useState(false);
  let [title, setTitle] = useState(0);

  let [write, setWrite] = useState('');

  let today = new Date();
  today = today.toLocaleString();
  let [date, setDate] = useState(["1","2","3"]);


  return (
    <div className="App">
      <div className='black-nav'> 
        <h4>ReactBlog</h4>
      </div>
      <div className='btn-box'>
          <button onClick={() =>  {
            var copy1 = [...subject];
            copy1 = copy1.sort();
            setSubject(copy1);
          } }>가나다순 정렬</button>
      </div>
      <div className='list-box'>
        {
          subject.map(function(sj,i){
            
            return (
              <div className='list' key={i} onClick={() => {setDetail(!detail); setTitle(i)} }>
                <h4>{sj} <span onClick={
                  (e) => {
                    // 버블링 막기 위함
                    e.stopPropagation();
                   let copy = [...like];
                   copy[i] = copy[i] + 1;
                   setLike(copy);
                  }
                   }>😀</span> {like[i]}</h4>          
                <p>{date[i]}</p>
                <button type='button' onClick={(e) => {
                  let copy = [...subject];
                  copy.splice(i, 1);
                  setSubject(copy);
                  let copyLike = [...like];
                  copyLike.splice(i,1);
                  setLike(copyLike);
                  e.stopPropagation();
                   }}>삭제</button>
              </div>
            )
          })
        }

        <input type="text" onChange={(e) => {
          setWrite(e.target.value);
        }}/>
        <button type='button' onClick={(e) => {
          write = write.trim();
          if(write != '') {
            let copy = [...subject];
            copy.unshift(write);
            setSubject(copy);
            let copyLike = [...like];
            copyLike.unshift(0);
            setLike(copyLike);
            let copyDate = [...date];
            copyDate.unshift(today);
            setDate(copyDate);
          }else {
            console.log("제목을 입력해주세요.");
          }
          }}>Add</button>
        {
          // html 작성 공간이라 if / for 사용 x 
          detail == true ? <Detail color={'yellow'} 
                          subject={subject} 
                          modify={() => {
                            let copy = [...subject];
                            copy[0] = "여자코틏추천";
                            setSubject(copy);
                          }} 
                          title={title}
                          date={date}
                          /> : null
        }

      </div>
    </div>
     
  );
  


}

function Detail (props){
  return (
    <div className='detail-modal' style={{background: props.color}}>
        <h4>{props.subject[props.title]}</h4>
        <p>{props.date[props.title]}</p>
        <p>내용</p>
        <button onClick={props.modify}>글 수정</button>
    </div>
    
  );
}



export default App;
