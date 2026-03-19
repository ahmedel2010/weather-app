import './App.css';

import { ThemeProvider,createTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "moment/min/locales"
import { useTranslation } from 'react-i18next';


// Matrial Ui components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';





const theme=createTheme({
  typography:{
    fontFamily:["IBM"],
  },
});
let cancleAxios=null;
moment.locale("ar");
function App() {
  const[temp,setTemp]=useState({
    tempNumber:0,
    minTemp:0,
    maxTemp:0,
    Description:"",
    icon:"",
  });
  const[local,setlocal]=useState("ar");
  const direction=local==="ar"?"rtl":"ltr";
  function handlebtnClick(){
    if(local==="ar"){ 
      setlocal("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }else{
      setlocal("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
     }
    const { t, i18n } = useTranslation();
  const[dateandtime,setdateTime]=useState("");
  useEffect(() => {  
    i18n.changeLanguage("ar");
  }, []);
  useEffect(() => {
    setdateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    const timer = setInterval(() => {
    setdateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    console.log("الساعة اتحدثت!"); // عشان تتأكد إنها شغالة في الخلفية
  }, 1000);
axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.0632&lon=31.2469&appid=f6abe6ad406546288ae28486dc3f2ed1',{
  cancleToken:new axios.CancelToken((c)=>{cancleAxios=c})
})
  .then(function (response) {
    const currenttemp=Math.round(response.data.main.temp-272.15); 
    const temp_max=Math.round(response.data.main.temp_max-272.15); 
    const temp_min=Math.round(response.data.main.temp_min-272.15); 
    const description=response.data.weather[0].description;
    const icon=response.data.weather[0].icon;
    setTemp({
      tempNumber:currenttemp,
      minTemp:temp_min,
      maxTemp:temp_max,
      Description:description,
      icon:`https://openweathermap.org/img/wn/${icon}@2x.png`,
    }); 
  })
  .catch(function (error) {
   
    console.log(error);
  })
  return ()=>{
    cancleAxios();
    clearInterval(timer);
  }
    }, [])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
           <Container maxWidth="sm">
            {/*content container */}
            <div style={{ height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
            {/*card*/}
          <div style={{backgroundColor:"rgba(28 52 92 / 36%)",color:"white",padding:"10px",borderRadius:"15px",boxShadow:"0px 11px 1px rgba(0,0,0,0.05)",width:"100%"}}>
            {/*content card*/}
            <div>
               {/*city and time*/}
              <div style={{display:"flex" ,alignItems:"end",justifyContent:"start"}} dir={direction}>
                 <Typography variant="h2" style={{marginRight:"20px",fontWeight:"600"}}>
                 {t("cairo")}
                  </Typography>
                   <Typography variant="h5" style={{marginRight:"20px"}}>
                     {dateandtime}
                     </Typography>

              </div>
                {/*city and time*/}

                <hr/>
                {/*container of degreee + cloud icon */}
                  <div style={{display:"flex",direction:direction,alignItems:"center",justifyContent:"space-around"}}>
                  {/*degree and description*/}
                  <div>
                    {/*temp*/}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} >
                  <Typography variant="h1" style={{}}>
                  {temp.tempNumber}°
                  </Typography>
                 <img src={temp.icon} alt="weather icon" style={{width:"100px",height:"100px"}}/>
                    </div>
                     {/*temp*/}

                  <Typography variant="h6" style={{textTransform:"capitalize",textAlign:"right",marginRight:"20px"}}>
                 {t(temp.Description)}
                  </Typography>

                  {/*Min and max temp */}
                  <div style={{display:"flex",alignItems:"center"}}>
                    <h5>{t("min")}:{temp.minTemp}</h5>
                    <h5 style={{margin:"0px 10px"}}>|</h5>
                    <h5>{t("max")}:{temp.maxTemp}</h5>
                  </div>
                  {/*Min and max temp */}



                  </div>
                    {/*degree and description*/}

                    <CloudIcon style={{fontSize:"200px",color:"white"}}/>

                  </div>
                   {/*container of degreee + cloud icon */}

            </div>
            {/*content card*/}
          </div>
           {/*card*/}
           <div style={{display:"flex",width:"100%",justifyContent:"end",direction:direction,marginTop:"10px"}}>
            <Button style={{color:"white"}} variant="text" onClick={handlebtnClick}>{local==="en"?"Arabic":"انجليزي"}</Button>
            </div>
           </div>
             {/*content container */}
           </Container>
    </ThemeProvider>
    </div>
  );
}

export default App;
