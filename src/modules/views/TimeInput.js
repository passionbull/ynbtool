import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'center',
    width:'70%' // default
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '35%', // default
  }  
}));
function updateSize() {
  // get window width
  let windowWidth = window.innerWidth;

  // set font size according to the window width
  let maxSize = 1680
  let minSize = 500;
  let minFont = 1.0;
  let maxFont = 1.8;

  let fontSize = (maxFont-minFont)/(maxSize-minSize) *(windowWidth -maxSize) + maxFont;
  // console.log(windowWidth, 'fontsize', fontSize);

  let maxWidth = 50;
  let minWidth = 70;

  let formWidth = (maxWidth-minWidth)/(maxSize-minSize) *(windowWidth -maxSize) + maxWidth;
  // .makeStyles-container-17

  document.querySelectorAll('.makeStyles-container-17').forEach(item =>{
    item.style.width = formWidth+"%";
  });

  document.querySelectorAll('.MuiInputBase-input').forEach(item => {
    if(item.id == 'date-timeinput' || item.id =='time-timeinput')
      item.style.fontSize = fontSize+'rem';
  });

  if(windowWidth>maxSize) {
    document.querySelectorAll('.MuiInputBase-input').forEach(item => {
      if(item.id == 'date-timeinput' || item.id =='time-timeinput')
        item.style.fontSize = maxFont+'rem';
    });
    document.querySelectorAll('.makeStyles-container-17').forEach(item =>{
      item.style.width = maxWidth+"%";
    });
  }
  else if(windowWidth< minSize){
    document.querySelectorAll('.MuiInputBase-input').forEach(item => {
      if(item.id == 'date-timeinput' || item.id =='time-timeinput')
        item.style.fontSize = minFont+'rem';
    });
    document.querySelectorAll('.makeStyles-container-17').forEach(item =>{
      item.style.width = minWidth+"%";
    });
  }
}

window.addEventListener('resize', () => {
  updateSize();
});

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

export default function TimePicker(props) {
  const classes = useStyles();
  const [date, setDate]= React.useState(getToday(props.now));
  const [time, setTime]= React.useState(getTime(props.now));
  React.useEffect(() => {
    console.log('init timepicker');
    setDate(getToday(props.now));
    setTime(getTime(props.now));
    updateSize();
    props.handleUpdate(date+' '+time);
    }, []); // empty array ensures that effect is only run on mount and unmount

  const handleClick = (e) =>{
    // console.log(date+time);
    props.handleUpdate(date+' '+time)
  }

  const handleEnter = (e) =>{
    if(e.key == 'Enter') {
      // console.log(date+time);
      props.handleUpdate(date+' '+time)
    }
  }
  const handleTimeChange = (e) => {
    //Function code goes here
    const timeData = e.target.value;
    console.log('time',timeData);    
    setTime(timeData);
  }

  const handleDateChange = (e) =>{
    const timeData = e.target.value;
    console.log('date',timeData);    
    setDate(timeData);
  }
  
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date-timeinput"
        label="Date"
        type="date"
        defaultValue={date}
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        InputProps={{
            style: {
              fontSize: '1.8rem',
              color: 'white'
            },
            inputProps: {
                style: {
                  textAlign: 'left'
                }
              }            
          }}
        onChange={(e) => handleDateChange(e)}      
        onKeyDown={(e)=> handleEnter(e)}        

      />
      <TextField
      id="time-timeinput"
      label="Time"
      type="time"
      defaultValue={time}
      className={classes.textField}
      InputLabelProps={{
        shrink: true
      }}
      InputProps={{
          style: {
            fontSize: '1.8rem',
            color: 'white'
          },
          inputProps: {
            style: {
              textAlign: 'left'
            }
          }
        }}
      onChange={(e) => handleTimeChange(e)}
      onKeyDown={(e)=> handleEnter(e)}        
      />
      <Button variant="contained" color="primary"
        onClick={e=>handleClick(e)}
      >변환</Button>
    </form>
  );
}