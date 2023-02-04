

import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    width:'80%',
    justifyContent: 'center',
    display:'flex'

  },
}));


function getTime(now){
    let hour = now.getHours().toString().padStart(2, '0');
    let minute = now.getMinutes().toString().padStart(2, '0');
    let currentTime = `${hour}:${minute}`;
    return currentTime;
}

function getToday(today) {
    // const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}

function getUnixTimestamp(now) {
    var time_s= getToday(now) + ' '+getTime(now);
    var t_ = new Date(time_s);

    var t= t_.getTime() / 1000;
    return Math.floor(t);
}

const TextFieldComponent = (props) => {
  

  const classes = useStyles();
  const [date, setDate]= React.useState(getUnixTimestamp(props.now));

  React.useEffect(() => {
    console.log('init timepicker');
    setDate(getUnixTimestamp(props.now))
    props.handleUpdate(date);
    }, []); // empty array ensures that effect is only run on mount and unmount

  const handleEnter = (e) =>{
    if(e.key == 'Enter') {
        props.handleUpdate(date);
    }
  }

  const handleDateChange = (e) =>{
    const timeData = e.target.value;
    console.log('date',timeData);    
    setDate(timeData);
  }

  return (  
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>  
        <div style={{display: 'flex', alignItems: 'center'}}>  
            <label style={{ fontSize: '1.8rem' }} for="outlined-basic">Timestamp:</label> 
            <TextField
            type="number"
            defaultValue={date}

            InputProps={{
                style: {
                  fontSize: '1.8rem',
                  color: 'white'
                },
              }}
            id="outlined-basic"  
            variant="outlined" 
            onChange={(e) => handleDateChange(e)}      
            onKeyDown={(e)=> handleEnter(e)}        
            /> 
        </div> 
    </form>    
 );  
};  
 export default TextFieldComponent;